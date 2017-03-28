var 
  // load config from file
  bodyParser = require('body-parser'),
  config = require('./helpers/config'),
  createServer = require("auto-sni"),
  express = require('express'),
  fs = require('fs'),
  httpLogging = require('./helpers/http-logging'),
  session = require('express-session'),
  SmidManger = require('./local_modules/smid-manager.js').SmidManger,
  OcridOAuthUtil = require('./local_modules/orcid-oauth-util.js').OcridOAuthUtil;

/*
   for development goto mongo console
    use smid;
    db.createUser({
      user: "smid_user",
      pwd: "devpassword",
          roles: ["readWrite"]
    });
*/

var smidManger = new SmidManger('smid_user:devpassword@127.0.0.1:27017/smid',['smids']);
var ooau = new OcridOAuthUtil(
  config.CLIENT_ID, 
  config.CLIENT_SECRET, 
  config.ORCID_URL + '/oauth/authorize',
  config.ORCID_URL + '/oauth/token' );

/*
// quick and dirty test
smidManger.createSmid('0000-0000-0000-0000','test name', function(err, doc) {
   console.log(doc);
   smidManger.updateForm(doc.private_key, {title: 'test update title', description: 'test update description'}, function(err,doc) {
      console.log(doc);
   });
   smidManger.addOrcidName(doc.public_key, {orcid: '0000-0000-0000-0001', name: 'test1'}, function(err,doc) {
      console.log(doc);
   });
   smidManger.addOrcidName(doc.public_key, {orcid: '0000-0000-0000-0002', name: 'test2'}, function(err,doc) {
      console.log(doc);
   });
   smidManger.addOrcidName(doc.public_key, {orcid: '0000-0000-0000-0001', name: 'test1'}, function(err,doc) {
      console.log(doc);
   });
});
*/

// Init express
var app = express();
var path = require('path');
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({  
    secret: "notagoodsecretnoreallydontusethisone",  
    resave: false,
    saveUninitialized: true,
    cookie: { 
      httpOnly: true, 
      secure: (config.FORCE_SSL === 'true')
    },
}));
app.set('json spaces', 2);
app.set('json replacer', null);


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
var CREATE_SMID_URI = '/create-smid-redirect';
var ADD_ID_REDIRECT = '/add-id-redirect';

//Create smid oauth 
app.get('/create-smid-authorize', function(req,res) {
  create_smid_authorization_uri = ooau.getAuthUrl(config.HOST + CREATE_SMID_URI);
  res.redirect(create_smid_authorization_uri);
});

//Add iD oauth
app.get('/add-id-authorize', function(req,res) {
  add_id_authorization_uri = ooau.getAuthUrl(config.HOST + ADD_ID_REDIRECT, req.params.publicKey);
  res.redirect(create_smid_authorization_uri);
});

app.get('/:publicKey/details', function(req,res) {
  smidManger.getDetails(req.params.publicKey, function(err, doc) {
    if (err) res.send(err)
    else {
      res.status(200).json(doc);
    }
  });
});

app.put('/:publicKey/details/:publicKey/edit/:privateKey/details/form', function(req,res) {
  var form = req.body;
  smidManger.updateForm(req.params.publicKey, form, function(err, doc) {
    if (err) res.send(err)
    else {
      res.status(200).json(doc);
    }
  });
});


app.get('/orcid-id.json', function(req, res) {
  res.json({'orcid_id': req.session.orcid_id});
});

app.get(CREATE_SMID_URI, function(req, res) { // Redeem code URL
  var state = req.query.state; 
  if (req.query.error == 'access_denied') {
    // User denied access
    console.log("error: " + req.query.error);
    res.json(req.query); 
  } else {
    // exchange code
    // function to render page after making request
    var exchangingCallback = function(error, response, body) {
      if (error == null) { // No errors! we have a token :-)
        var token = JSON.parse(body);
        console.log(token);
        var date = new Date();
        //Log ORCID info to file
        orcidLogger.log(date, token.name, token.orcid, req.query.state);
        console.log("creating smid for" + token.orcid);
        smidManger.createSmid(token.orcid,token.name, function(err, doc) {
          if (err) res.send(err) 
          else {
            res.status(200).json(doc);
          } 
        }); 
      }
    };
    ooau.exchangeCode(req.query.code,exchangingCallback);
  }

});

app.get(ADD_ID_REDIRECT, function(req, res) { // Redeem code URL
  var state = req.query.state; 
  if (req.query.error == 'access_denied') {
    // User denied access
    console.log("error: " + req.query.error);
    res.json(req.query);       
  } else {
    // exchange code
    // function to render page after making request
    var exchangingCallback = function(error, response, body) {
      if (error == null) { // No errors! we have a token :-)
        var token = JSON.parse(body);
        console.log(token);
        var date = new Date();
        //Log ORCID info to file
        orcidLogger.log(date, token.name, token.orcid, req.query.state);
        req.session.orcid_id = token.orcid;
        //state maps to smid public key
        console.log("Got user id: " + token.orcid);
        smidManger.addOrcidName(req.query.state, {orcid: token.orcid, name: token.name}, function(err,doc) {
          if (err) res.send(err) 
          else {
            res.status(200).json(doc);
          } 
        });
      }
    };
    ooau.exchangeCode(req.query.code,exchangingCallback);
  }
});

app.get(['/:publicKey/edit/:privateKey','/:publicKey','/'], function(req, res) { // Index page 
  // reset any session on reload of '/'
  req.session.regenerate(function(err) {
      // nothing to do
  });
  res.send(distDir);
  /*res.render(path.join(__dirname+'/../public/share-id-ng/dist','indexNg.ejs'), {
    'create_smid_authorization_uri': ooau.getAuthUrl(config.HOST + CREATE_SMID_URI),
    'add_id_authorization_uri': ooau.getAuthUrl(config.HOST + ADD_ID_REDIRECT, req.params.publicKey),
    'edit_smid_link': config.HOST + '/' + req.params.publicKey + '/edit/' + req.params.privateKey,
    'share_smid_link': config.HOST + '/' + req.params.publicKey,
    'put_form_link': config.HOST + '/' + req.params.publicKey + '/edit/' + req.params.privateKey + '/details/form',
    'details_json_link': config.HOST + '/' + req.params.publicKey + '/details/',
    'orcid_url': config.ORCID_URL
  });*/
});