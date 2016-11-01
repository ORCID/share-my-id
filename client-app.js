var express = require('express'), 
  // load config from file
  config = require('./helpers/config'),
  httpLogging = require('./helpers/http-logging'),
  querystring = require("querystring"),
  fs = require('fs'),
  https = require('https'),
  session = require('express-session'),
  request = require('request');

var ssl_options = {
  key: fs.readFileSync('./helpers/sample_server.key'),
  cert: fs.readFileSync('./helpers/sample_server.cert'),
};

// Init express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({  
    secret: "notagoodsecretnoreallydontusethisone",  
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, secure: true},  
}));
secureServer = https.createServer(ssl_options, app);
secureServer.listen(config.PORT, config.SERVER_IP, function () { // Start express
  console.log('server started on ' + config.PORT);
});

app.get('/', function(req, res) { // Index page 
  // link we send user to authorize our requested scopes
  var auth_link = config.AUTHORIZE_URI + '?'
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
  res.render('pages/index', {'authorization_uri': auth_link});
});

app.get('/orcid-id.json', function(req, res) {
  res.json({'orcid_id': req.session.orcid_id});
});

app.get('/redirect-uri', function(req, res) { // Redeem code URL
  if (req.query.error == 'access_denied') {
    var auth_link = config.AUTHORIZE_URI + '?'
   + querystring.stringify({
    'redirect_uri': config.REDIRECT_URI,
    'scope': '/authenticate',
    'response_type':'code',
    'client_id': config.CLIENT_ID
  });
    // User denied access
    res.render('pages/access_denied', {'authorization_uri': auth_link });      
  } else {
    // exchange code

    // function to render page after making request
    var exchangingCallback = function(error, response, body) {
    if (error == null) { // No errors! we have a token :-)
      var auth_link = config.AUTHORIZE_URI + '?'
   + querystring.stringify({
    'redirect_uri': config.REDIRECT_URI,
    'scope': '/authenticate',
    'response_type':'code',
    'client_id': config.CLIENT_ID
  });
      var tokenJson = JSON.parse(body);
      console.log(tokenJson);
      req.session.orcid_id = tokenJson.orcid;
      res.render('pages/success', { 'body': JSON.parse(body), 'authorization_uri': auth_link});
    } else // handle error
      res.render('pages/error', { 'error': error });
    };

    // config for exchanging code for token 
    var exchangingReq = {
      url: config.TOKEN_EXCHANGE_URI,
      method: 'post',
      body: querystring.stringify({
        'code': req.query.code,
        'client_id': config.CLIENT_ID,
        'client_secret': config.PUBPALS_CLIENT_SECRET,
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
