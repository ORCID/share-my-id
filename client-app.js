var 
  // load config from file
  bodyParser = require('body-parser'),
  config = require('./helpers/config'),
  createServer = require("auto-sni"),
  express = require('express'),
  fs = require('fs'),
  httpLogging = require('./helpers/http-logging'),
  querystring = require("querystring"),
  request = require('request'),
  session = require('express-session')
  GoogleSheet = require('./local_modules/google-sheets.js').GoogleSheet;

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

var sheet = new GoogleSheet();

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


app.get('/', function(req, res) { // Index page 
  req.session.share_info = true;
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
        orcidLogger.log(date, token.name, token.orcid, req.session.share_info);
        req.session.orcid_id = token.orcid;
        sheet.append([new Date(), token.orcid, token.name, req.session.share_info?'TRUE':'FALSE'])
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
