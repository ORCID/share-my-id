var
  // load config from file
  bodyParser = require('body-parser'),
  config = require('./local_modules/config'),
  express = require('express'),
  fs = require('fs'),
  helmet = require('helmet'),
  SmidManger = require('./local_modules/smid-manager.js').SmidManger,
  OcridOAuthUtil = require('./local_modules/orcid-oauth-util.js').OcridOAuthUtil;

var smidManger = new SmidManger(config.MONGO_CONNECTION_STRING);
var ooau = new OcridOAuthUtil(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.ORCID_URL);

// Init express
var app = express();
var path = require('path');
var distDir = __dirname + "/dist/";
var index_file = distDir + "index.html"
var PAGE_404 = distDir + "assets/404.html"
var PAGE_500 = distDir + "assets/500.html"
app.use(express.static(distDir));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(helmet());
app.set('json spaces', 2);
app.set('json replacer', null);

app.listen(config.PORT_HTTP, function() {
  console.log('listening on port: ' + config.PORT_HTTP)
})

// Custom console for orcid logging
var orcidOutput = fs.createWriteStream('./orcidout.log');
var orcidErrorOutput = fs.createWriteStream('./orciderr.log');
var orcidLogger = new console.Console(orcidOutput, orcidErrorOutput);

//Endpoints
var CONFIG = '/config';
var CREATE_SMID_AUTHORIZE = '/create-smid-authorize';
var CONFIG = '/config';
var CREATE_SMID_URI = '/create-smid-redirect';
var COLLECTION_DETAILS = '/:publicKey/details';
var COLLECTION_DETAILS_DOWNLOAD = '/:publicKey/details/download';
var COLLECTION_DETAILS_FORM = '/:publicKey/details/:publicKey/edit/:privateKey/details/form';
var ADD_ID_AUTHORIZE = '/add-id-authorize/:publicKey';
var ADD_ID_REDIRECT = '/add-id-redirect';
var ADD_ID_SUCCESS = '/:publicKey/orcid/:orcid';
var ADD_ID_ERROR = '/:publicKey/add-id-error';
var COLLECTION_EDIT = '/:publicKey/edit/:privateKey';
var COLLECTION_SHARE = '/:publicKey';

function rmTab(str) {
  if (str !== undefined && str != null)
    return str.replace(/\t/g, '');
  return str;
}

function dateToStr(date) {
  return date.toISOString();
}

function smidToTxt(doc) {
  if (doc === undefined || doc == null) return null;
  var csv = `${rmTab(doc.form.title)}\n`;
  csv += 'dateRecorded             \towner orcid        \towner fullOrcidId                            \towner name\n';
  csv += `${dateToStr(doc.owner.dateRecorded)}\t${doc.owner.orcid}\t${doc.owner.fullOrcidId}\t${rmTab(doc.owner.name)}\n`;
  csv += "\n";
  csv += "Share my iD results\n";
  csv += 'dateRecorded             \torcid              \tfullOrcidId                                   \tname\n';
  doc.authenticated_orcids.forEach(function(row) {
    csv += `${dateToStr(row.dateRecorded)}\t${row.orcid}\t${row.fullOrcidId}\t${rmTab(row.name)}\n`;
  })
  return csv;
}

app.get(CONFIG, function(req, res) {
  return res.status(200).json({
    'ORCID_URL': config.ORCID_URL
  });
});

//Create smid oauth sign into ORCID
app.get(CREATE_SMID_AUTHORIZE, function(req, res) {
  var create_smid_authorization_uri = ooau.getAuthUrl(config.HOST + CREATE_SMID_URI);
  res.redirect(create_smid_authorization_uri);
});

app.get(CONFIG, function(req, res) {
  return res.status(200).json({
    'ORCID_URL': config.ORCID_URL
  });
});

//Create new id collection
app.get(CREATE_SMID_URI, function(req, res) { // Redeem code URL
  var state = req.query.state;
  if (req.query.error == 'access_denied') {
    // User denied access
    console.log("error: " + req.query.error);
    res.json(req.query);
  } else if (req.query.code === undefined) {
    res.json(req.query);
  } else {
    // exchange code
    // function to render page after making request
    var exchangingCallback = function(err, token) {
      if (err != null)
        res.sendFile(PAGE_500);
      else { // No errors! we have a token :-)
        var date = new Date();
        //Log ORCID info to file
        orcidLogger.log(date, token.name, token.orcid, req.query.state);
        console.log("creating smid for " + token.orcid);
        var orcidRecord = smidManger.createOrcidRecord(token.orcid, ooau.fullOrcid(token.orcid), token.name);
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
app.get(COLLECTION_DETAILS, function(req, res) {
  smidManger.getDetails(req.params.publicKey, function(err, doc) {
    if (err)
      res.send(err)
    else if (doc === undefined || doc == null)
      res.sendFile(PAGE_404);
    else
      res.status(200).json(doc);
  });
});


//Get collection details
app.get(COLLECTION_DETAILS_DOWNLOAD, function(req, res) {
  smidManger.getDetails(req.params.publicKey, function(err, doc) {
    if (err)
      res.send(err)
    else if (doc === undefined || doc == null)
      res.sendFile(PAGE_404);
    else {
      try {
        var txt = smidToTxt(doc);
        res.set({
          "Content-Disposition": `attachment; filename="${doc.form.title}_tab_separated.txt"`
        });
        res.status(200).send(txt);
      } catch (e) {
        res.sendFile(PAGE_500);
      }
    }
  });
});

//Update collection details form fields
app.put(COLLECTION_DETAILS_FORM, function(req, res) {
  var form = req.body;
  smidManger.updateForm(req.params.privateKey, form, function(err, doc) {
    if (err) res.send(err)
    else {
      res.status(200).json(doc);
    }
  });
});

//Add iD oauth sign into ORCID
app.get(ADD_ID_AUTHORIZE, function(req, res) {
  var add_id_authorization_uri = ooau.getAuthUrl(config.HOST + ADD_ID_REDIRECT, req.params.publicKey);
  res.redirect(add_id_authorization_uri);
});

//Add id to collection
app.get(ADD_ID_REDIRECT, function(req, res) { // Redeem code URL
  var state = req.query.state;
  if (req.query.error == 'access_denied') {
    // User denied access
    console.log("error: " + req.query.error);
    res.redirect( /* make ADD_ID_ERROR url */ '/' + state + "/add-id-error");
  } else {
    // exchange code
    // function to render page after making request
    var exchangingCallback = function(error, token) {
      if (error != null)
        res.sendFile(PAGE_500);
      else { // No errors! we have a token :-)
        var date = new Date();
        //Log ORCID info to file
        orcidLogger.log(date, token.name, token.orcid, req.query.state);
        //state maps to smid public key
        console.log("Got user id: " + token.orcid);
        var orcidRecord = smidManger.createOrcidRecord(token.orcid, ooau.fullOrcid(token.orcid), token.name);
        smidManger.addOrcidRecord(orcidRecord, req.query.state, function(err, doc) {
          if (err) res.send(err)
          else {
            //res.redirect('/' + req.query.state);
            res.redirect( /* make ADD_ID_SUCCESS url */ '/' + state + '/orcid/' + token.orcid);
          }
        });
      }
    };
    ooau.exchangeCode(req.query.code, exchangingCallback);
  }
});

app.get([COLLECTION_EDIT], function(req, res) { // Index page
  smidManger.smidExist(req.params.publicKey, req.params.privateKey, function(err, bool) {
    if (bool == true)
      res.status(200).sendFile(index_file);
    else
      res.sendFile(PAGE_404);
  });
});

app.get([COLLECTION_SHARE, ADD_ID_SUCCESS, ADD_ID_ERROR], function(req, res) { // Index page
  smidManger.detailsExist(req.params.publicKey, function(err, bool) {
    if (bool == true)
      res.status(200).sendFile(index_file);
    else
      res.sendFile(PAGE_404);
  });
});

app.get('/', function(req, res) { // Index page
  res.status(200).sendFile(index_file);
});