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



function getGOauth2Client() { 
  var credentials = JSON.parse(fs.readFileSync('credentials/client_secret.json'));
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = null;
  for (var i in credentials.web.redirect_uris)  
    if (credentials.web.redirect_uris[i].startsWith(config.HOST))
        redirectUrl = credentials.web.redirect_uris[i];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  return oauth2Client;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} spreadsheetId spreedsheet we are working with.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(spreadsheetId, callback) {
  var oauth2Client = getGOauth2Client();
  // Check if we have previously stored a token.
  fs.readFile(tokenPath(spreadsheetId), function(err, token) {
    if (err) {
      console.log(tokenPath(spreadsheetId));
      console.log("Default spreedsheet has no token please visit /" + spreadsheetId + '/has_token.json')
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, spreadsheetId);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {spreadsheetId} 
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, spreadsheetId, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state: spreadsheetId
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
      storeToken(token, spreadsheetId);
      callback(oauth2Client);
    });
  });
}

function tokenPath(spreadsheetId) {
  return TOKEN_DIR +  'sheets_token_'+spreadsheetId +'.json';
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token, spreadsheetId) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(tokenPath(spreadsheetId), JSON.stringify(token));
  console.log(tokenPath(spreadsheetId));
}


function listFirstRow(auth, spreadsheetId) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: spreadsheetId,
    range: 'Sheet1!A1:D4',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows == undefined)
      write_with_google_googleapis(['Date', 'ORCID iD', 'Name',], spreadsheetId);
    else if (rows.length == 0) 
      console.log('No data found.');
    else 
      console.log('First row %s, %s, %s, %s', rows[0][0], rows[0][1], rows[0][2], rows[0][3]);
  });
} 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding to the above example with what we need 

function write_with_google_googleapis(arr, spreadsheetId) { 
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(spreadsheetId, function(auth) { 
    append(auth, arr, spreadsheetId);
  });
}

// adding append funtion
function append(auth, arr, spreadsheetId) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: spreadsheetId,
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

app.get(['/'], function(req, res) { // Index page 
  req.session.GOOGLE_DOC_KEY = req.query.spreadsheetId ? req.query.spreadsheetId : config.GOOGLE_DOC_KEY;
  // link we send user to authorize our requested scopes
  var auth_link =  config.ORCID_URL + '/oauth/authorize' + '?'
   + querystring.stringify({
    'redirect_uri': config.REDIRECT_URI,
    'scope': '/authenticate /activities/update',
    'response_type':'code',
    'client_id': config.CLIENT_ID,
    'show_login': 'true',
  });
  // reset any session on reload of '/'
  req.session.regenerate(function(err) {
      // nothing to do
  });
  res.render('pages/index', {'authorization_uri': auth_link, 'orcid_url': config.ORCID_URL});
});

app.post('/share-info', function(req, res) {
  req.session.save(function(err) {
  // session saved - nothing else to do
  });
});

app.get('/orcid-id.json', function(req, res) {
  res.json({'orcid_id': req.session.orcid_id});
});

app.get('/google_oauth_redirect_uri', function(req, res) {
  console.log("here");
  oauth2Client = getGOauth2Client();
  oauth2Client.getToken(req.query.code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    var spreadsheetId = req.query.state;
    storeToken(token, spreadsheetId);
    authorize(spreadsheetId, listFirstRow);
    res.redirect("/token_has_been_stored");
  });
});

app.get('/:spreadsheetId/has_token.json', function(req, res) {
  // Load client secrets from a local file.
  fs.readFile(tokenPath(req.param.spreadsheetId), function processClientSecrets(err, content) {
    if (err)
        res.json({ name: req.params.spreadsheetId, 
          has_token : false,
          authorization_uri: 
            getGOauth2Client().generateAuthUrl({
              access_type: 'offline',
              scope: SCOPES,
              state: req.params.spreadsheetId
            })
          });      
    else
      res.json({ name: req.params.spreadsheetId, has_token : true});
  });
});


app.get('/redirect-uri', function(req, res) { // Redeem code URL
  if (req.query.error == 'access_denied') {
    // User denied access
    var auth_link = config.ORCID_URL + '/oauth/authorize' + '?'
   + querystring.stringify({
      'redirect_uri': config.REDIRECT_URI,
      'scope': '/authenticate',
      'response_type':'code',
      'client_id': config.CLIENT_ID,
      'show_login': 'true',
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
        orcidLogger.log(date, token.name, token.orcid, req.session.GOOGLE_DOC_KEY);
        req.session.orcid_id = token.orcid;
        // token state is mapped to spreedsheet we want to save in
        write_with_google_googleapis([new Date(), token.orcid, token.name], req.session.GOOGLE_DOC_KEY);
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
