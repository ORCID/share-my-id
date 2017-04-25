var
  // load config from file
  bodyParser = require('body-parser'),
  config = require('./local_modules/config'),
  express = require('express'),
  fs = require('fs'),
  helmet = require('helmet'),
  Mailgun = require('mailgun-js');
  SmidManger = require('./local_modules/smid-manager.js').SmidManger,
  OcridOAuthUtil = require('./local_modules/orcid-oauth-util.js').OcridOAuthUtil;

var smidManger = new SmidManger(config.MONGO_CONNECTION_STRING);
var mailgunPriv = Mailgun({apiKey: config.MAILGUN_PRIV_API_KEY, domain: config.MAILGUN_DOMAIN}); 
var mailgunPub = Mailgun({apiKey: config.MAILGUN_PUB_API_KEY, domain: config.MAILGUN_DOMAIN}); 

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
//app.use(helmet());
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
var CREATE_SMID_EMAIL = '/create-smid-email';
var CONFIG = '/config';
var CREATE_SMID_URI = '/create-smid-redirect';
var COLLECTION_DETAILS = '/:publicKey/details';
var COLLECTION_DETAILS_DOWNLOAD = '/:publicKey/details/download';
var COLLECTION_DETAILS_FORM = '/:publicKey/details/:privateKey/details/form';
var EMAIL_SMID = '/email-smid';
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
  csv += `Created by ${doc.owner.name} (${doc.owner.fullOrcidId})\n`;
  csv += `\n`;
  csv += `Collected iDs as of ${dateToStr(new Date())}\n`;
  csv += `Date Collected            \tORCID              \tFull ORCID iD                               \tCollected Name\n`;
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
        smidManger.addOwnerOrcidRecord(orcidRecord, req.query.state, function(err, doc) {
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
  var data = req.body;
  smidManger.updateForm(req.params.privateKey, data.form, function(err, doc) {
    if (err) res.status(400).json({'error':err})
    else {
      res.status(200).json(doc);
    }
  });
});

// create and email smid
app.post(EMAIL_SMID, function(req, res) {
  var data = req.body;
  mailgunPub.validate(data.email, function (error, body) {
    if(body && body.is_valid) {
      console.log("email is valid");
      smidManger.createSmid(function(err, doc) {  
        var mailData = {
          from: 'No Reply <noreply@share-my-id.orcid.org>',
          to: data.email,
          subject: 'Share My iD links',
          text: `Thanks for creating an ORCID iD collection.\n`
          + `\n`
          + `\n`
          + `Administration Link\n`
          + `Use this link to edit collection details: \n`
          + `${config.HOST}/${doc.public_key}/edit/${doc.private_key}\n`
          + `\n`
          + `\n`
          + `Share Link\n`
          + `Share this link with anyone whose iD you want to collect, and visit this link to view/download iDs you have collected:`
          + `${config.HOST}/${doc.public_key}`
          + `\n`
          + `\n`
          + `For more information, see our KnowledgeBase at ${config.SUPPORT_URL} and in case of problems, please contact our Community Team at support@orcid.org.`
          + `\n`
          + `\n`
          + `Thanks,\n`
          + `The ORCID Team`
        };
        console.log("Email to: " + data.to);
        console.log("Email to: " + data.subject);
        console.log("Email body: " + mailData.text);
        var create_smid_authorization_uri = ooau.getAuthUrl(config.HOST + CREATE_SMID_URI, doc.private_key);
        mailgunPriv.messages().send(mailData, function (error, body) {
          if (error != null) {
            console.log("mailgun error:");
            console.log(error);
            if (body != null && body.message != null && body.message.includes("Great job"))
              res.status(200).json({'email': data.email, 'redirect': create_smid_authorization_uri }); // using test credentials
              
            else
              res.status(400).json({'error':error, 'body': body});
          } else {
            console.log("mailgun body:");
            console.log(body);
            res.status(200).json({'email': data.email, 'redirect': create_smid_authorization_uri });
          }
        });
      });
    } else {
      res.status(400).json({'error':"Email failed to pass validation", 'body': body});
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
            res.redirect( /* make ADD_ID_SUCCESS url */ '/' + state + '/orcid/' + encodeURIComponent(config.ORCID_URL) + '%2F' + token.orcid); 
          }
        });
      }
    };
    ooau.exchangeCode(req.query.code, exchangingCallback);
  }
});

app.get([COLLECTION_EDIT], function(req, res) { // Index page
  smidManger.exist(req.params.publicKey, req.params.privateKey, function(err, boolA) {
    if (boolA == true) {
      smidManger.hasOwner(req.params.publicKey, req.params.privateKey, function(err, boolB) {
        if (boolB == true) {
          res.status(200).sendFile(index_file);
        } else {
          res.redirect(ooau.getAuthUrl(config.HOST + CREATE_SMID_URI, req.params.privateKey));
        }
      });
    } else {
      res.sendFile(PAGE_404);
    }
  });
});

app.get([CREATE_SMID_EMAIL, '/'], function(req, res) { // Index page
  res.status(200).sendFile(index_file);
});

app.get([COLLECTION_SHARE, ADD_ID_SUCCESS, ADD_ID_ERROR], function(req, res) { // Index page
  smidManger.detailsExist(req.params.publicKey, function(err, bool) {
    if (bool == true)
      res.status(200).sendFile(index_file);
    else
      res.sendFile(PAGE_404);
  });
});
