var 
  // load config from file
  bodyParser = require('body-parser'),
  googleSpreadsheet = require('google-spreadsheet'), 
  config = require('./helpers/config'),
  createServer = require("auto-sni"),
  express = require('express'),
  fs = require('fs'),
  httpLogging = require('./helpers/http-logging'),
  querystring = require("querystring"),
  request = require('request'),
  session = require('express-session');

// Init express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({  
    secret: "notagoodsecretnoreallydontusethisone",  
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, secure: (config.FORCE_SSL === 'true')},
}));

secureServer = createServer({
  email: config.LETSENCRYPT_ISSUES_EMAIL, // Emailed when certificates expire.
  agreeTos: true, // Required for letsencrypt.
  debug: (config.AUTO_SNI_DEBUG === 'true'), // Add console messages and uses staging LetsEncrypt server. (Disable in production)
  domains: config.DOMAINS.split(','), // List of accepted domain names. (You can use nested arrays to register bundles with LE).
  forceSSL: (config.FORCE_SSL === 'true'), // Make this false to disable auto http->https redirects (default true).
  redirectCode: 301, // If forceSSL is true, decide if redirect should be 301 (permanent) or 302 (temporary). Defaults to 302
  ports: {
    http: parseInt(config.PORT_HTTP), // Optionally override the default http port.
    https: parseInt(config.PORT_HTTPS) // Optionally override the default https port.
  }
}, app);
secureServer.listen(config.PORT_HTTPS, config.SERVER_IP, function () { // Start express
  console.log('server started on ' + config.PORT_HTTPS);
});

// Custom console for orcid logging
var orcidOutput = fs.createWriteStream('./orcidout.log');
var orcidErrorOutput = fs.createWriteStream('./orciderr.log');
var orcidLogger = new console.Console(orcidOutput, orcidErrorOutput);

// Google sheets via google-spreadsheet
var doc = new googleSpreadsheet(config.GOOGLE_DOC_KEY, 'private');
var creds = require(config.GOOGLE_SERVICE_ACCOUNT_KEY);
function write_with_google_spreadsheet(token, share_info) {
  //Auth with google sheets
  doc.useServiceAccountAuth(creds, function() {
    doc.getInfo(function(err, info) {
      if (err) {
        console.log("ACK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(err);
      } else {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        var sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        sheet.addRow({"date" : new Date(), "name" : token.name, "orcid" : token.orcid, "share info" : share_info},
          function callback(err) {
            if (err) console.log(err);
            else console.log("success adding row");
        });
      }
    });
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Other Google sheets...
// copied from https://developers.google.com/sheets/quickstart/nodejs
// we'll need to refactor and clean up

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_DIR = 'credentials/';
var TOKEN_PATH = 'credentials/sheets_token.json';

// Load client secrets from a local file.
fs.readFile('credentials/client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '14ZkoBaZ2ln8LvilLCsIPVYITVFbHSYuMctArPnbS-rk',
    range: 'Sheet1!A1:D4',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      console.log('rows:');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log('%s, %s', row[0], row[3]);
      }
    }
  });
} 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding to the above example with what we need 

function write_with_google_googleapis(arr) { 
  fs.readFile('credentials/client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Sheets API.
    authorize(JSON.parse(content), function(auth) {append(auth,arr)});
  });
}


// adding append funtion
function append(auth, arr) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '14ZkoBaZ2ln8LvilLCsIPVYITVFbHSYuMctArPnbS-rk',
    range: 'Sheet1',
    valueInputOption: 'USER_ENTERED',
    resource: { 
        "range": "Sheet1",
        majorDimension: "ROWS",
        "values":
           [arr]
    },
  },
   function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('append response: ' + JSON.stringify(response));
  });
} 








app.get('/', function(req, res) { // Index page 
  req.session.share_info = true;
  // link we send user to authorize our requested scopes
  var auth_link =  config.ORCID_URL + '/oauth/authorize' + '?'
   + querystring.stringify({
    'redirect_uri': config.REDIRECT_URI,
    'scope': '/authenticate /activities/update',
    'response_type':'code',
    'client_id': config.CLIENT_ID
  });
  // reset any session on reload of '/'
  req.session.regenerate(function(err) {
      // nothing to do
  });
  res.render('pages/index', {'authorization_uri': auth_link, 'orcid_url': config.ORCID_URL});
});

app.post('/share-info', function(req, res) {
  req.session.share_info = req.body.share_info;
  console.log("Share info checked: " + req.session.share_info);
  req.session.save(function(err) {
  // session saved - nothing else to do
  });
});

app.get('/orcid-id.json', function(req, res) {
  res.json({'orcid_id': req.session.orcid_id});
});

app.get('/redirect-uri', function(req, res) { // Redeem code URL
  if (req.query.error == 'access_denied') {
    // User denied access
    var auth_link = config.ORCID_URL + '/oauth/authorize' + '?'
   + querystring.stringify({
      'redirect_uri': config.REDIRECT_URI,
      'scope': '/authenticate',
      'response_type':'code',
      'client_id': config.CLIENT_ID
    });
    
    res.render('pages/access_denied', {'authorization_uri': auth_link,'orcid_url': config.ORCID_URL });      
  } else {
    // exchange code
    // function to render page after making request
    var exchangingCallback = function(error, response, body) {
      if (error == null) { // No errors! we have a token :-)
        var token = JSON.parse(body);
        console.log(token);
        var date = new Date();
        //Log ORCID info to file
        orcidLogger.log(date, token.name, token.orcid, req.session.share_info);
        req.session.orcid_id = token.orcid;
        write_with_google_googleapis([new Date(), token.orcid, token.name, req.session.share_info?'TRUE':'FALSE'])
        //write_with_google_spreadsheet(token,req.session.share_info);
        res.render('pages/success', { 'body': JSON.parse(body), 'authorization_uri': auth_link, 'orcid_url': config.ORCID_URL});
        
      } else // handle error
        res.render('pages/error', { 'error': error, 'orcid_url': config.ORCID_URL });
    };

    // config for exchanging code for token 
    var exchangingReq = {
      url: config.ORCID_URL + '/oauth/token',
      method: 'post',
      body: querystring.stringify({
        'code': req.query.code,
        'client_id': config.CLIENT_ID,
        'client_secret': config.CLIENT_SECRET,
        'grant_type': 'authorization_code',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }
  
    //making request exchanging code for token
    request(exchangingReq, exchangingCallback);
  }
});
