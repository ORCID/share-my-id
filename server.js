var 
  // load config from file
  bodyParser = require('body-parser'),
  config = require('./local_modules/config'),
  express = require('express'),
  fs = require('fs'),
  SmidManger = require('./local_modules/smid-manager.js').SmidManger,
  OcridOAuthUtil = require('./local_modules/orcid-oauth-util.js').OcridOAuthUtil;

var smidManger = new SmidManger(config.MONGO_CONNECTION_STRING);
var ooau = new OcridOAuthUtil(
  config.CLIENT_ID, 
  config.CLIENT_SECRET, 
  config.ORCID_URL);

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
var index_file =  distDir + "index.html"
app.use(express.static(distDir));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('json spaces', 2);
app.set('json replacer', null);

app.listen(config.PORT_HTTP, function () {
  console.log('listening on port: ' + config.PORT_HTTP)
})


// Custom console for orcid logging
var orcidOutput = fs.createWriteStream('./orcidout.log');
var orcidErrorOutput = fs.createWriteStream('./orciderr.log');
var orcidLogger = new console.Console(orcidOutput, orcidErrorOutput);

//Endpoints
var CREATE_SMID_AUTHORIZE = '/create-smid-authorize';
var CONFIG = '/config';
var CREATE_SMID_URI = '/create-smid-redirect';
var COLLECTION_DETAILS = '/:publicKey/details';
var COLLECTION_DETAILS_FORM = '/:publicKey/details/:publicKey/edit/:privateKey/details/form';
var ADD_ID_AUTHORIZE = '/add-id-authorize/:publicKey';
var ADD_ID_REDIRECT = '/add-id-redirect';
var COLLECTION_EDIT = '/:publicKey/edit/:privateKey';
var COLLECTION_SHARE = '/:publicKey';

//Create smid oauth sign into ORCID
app.get(CREATE_SMID_AUTHORIZE, function(req,res) {
  create_smid_authorization_uri = ooau.getAuthUrl(config.HOST + CREATE_SMID_URI);
  res.redirect(create_smid_authorization_uri);
});

app.get(CONFIG, function(req, res) { 
   return res.status(200).json({'ORCID_URL': config.ORCID_URL});
});

//Create new id collection
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
        console.log("creating smid for " + token.orcid);
        var orcidRecord = smidManger.createOrcidRecord(token.orcid,ooau.fullOrcid(token.orcid),token.name);
        smidManger.createSmid(orcidRecord, function(err, doc) {
          if (err) res.send(err) 
          else {
            var collection = JSON.parse(JSON.stringify(doc, null, 2));
            var private_key = collection.private_key;
            var public_key = collection.public_key;
            res.redirect('/' + public_key + '/edit/' + private_key);
          } 
        }); 
      }
    };
    ooau.exchangeCode(req.query.code, exchangingCallback);
  }

});

//Get collection details
app.get(COLLECTION_DETAILS, function(req,res) {
  smidManger.getDetails(req.params.publicKey, function(err, doc) {
    if (err) res.send(err)
    else {
      res.status(200).json(doc);
    }
  });
});

//Update collection details form fields
app.put(COLLECTION_DETAILS_FORM, function(req,res) {
  var form = req.body;
  smidManger.updateForm(req.params.privateKey, form, function(err, doc) {
    if (err) res.send(err)
    else {
      res.status(200).json(doc);
    }
  });
});

//Add iD oauth sign into ORCID
app.get(ADD_ID_AUTHORIZE, function(req,res) {
  add_id_authorization_uri = ooau.getAuthUrl(config.HOST + ADD_ID_REDIRECT, req.params.publicKey);
  res.redirect(add_id_authorization_uri);
});

//Add id to collection
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
        //state maps to smid public key
        console.log("Got user id: " + token.orcid);
        var orcidRecord = smidManger.createOrcidRecord(token.orcid,ooau.fullOrcid(token.orcid),token.name);
        smidManger.addOrcidRecord(orcidRecord, req.query.state, function(err,doc) {
          if (err) res.send(err) 
          else {
            res.redirect('/' + req.query.state);
          } 
        });
      }
    };
    ooau.exchangeCode(req.query.code,exchangingCallback);
  }
});

app.get([COLLECTION_EDIT, COLLECTION_SHARE,'/'], function(req, res) { // Index page 
  res.status(200).sendFile(index_file);
});