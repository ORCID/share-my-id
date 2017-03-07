var fs = require('fs'),
readline = require('readline'),
googleAuth = require('google-auth-library'),
google = require('googleapis');

var OrcidGoogleSheet = function () {
   this.oauth2Client = null;
};

var TOKEN_DIR = 'credentials/';

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];


OrcidGoogleSheet.prototype.tokenPath =function(spreadsheetId) {
  return TOKEN_DIR + 'sheets_token_'+spreadsheetId +'.json';
}

OrcidGoogleSheet.prototype.generateGAuthUrl =function(spreadsheetId) {
   return this.getGOauth2Client().generateAuthUrl({
              access_type: 'offline',
              scope: SCOPES,
              prompt: 'consent',
              state: spreadsheetId
            });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
OrcidGoogleSheet.prototype.storeToken = function (token, spreadsheetId) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFileSync(this.tokenPath(spreadsheetId), JSON.stringify(token));
  console.log("written  google sheet token" + this.tokenPath(spreadsheetId));
}

OrcidGoogleSheet.prototype.getToken = function (spreadsheetId) {
  try {
     var tokenStr = fs.readFileSync(this.tokenPath(spreadsheetId));
  } catch (eer) {
    //do nothing
  }
  return tokenStr ? JSON.parse(tokenStr) : null;
}


OrcidGoogleSheet.prototype.getGOauth2Client= function() { 
  if (this.oauth2Client == null) {
    var credentials = JSON.parse(fs.readFileSync('credentials/client_secret.json'));
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    var redirectUrl = null;
    for (var i in credentials.web.redirect_uris)  
      if (credentials.web.redirect_uris[i].startsWith(config.HOST))
        redirectUrl = credentials.web.redirect_uris[i];
    var auth = new googleAuth();
    this.oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
   }  
  return this.oauth2Client;
}


OrcidGoogleSheet.prototype.listFirstRow = function (auth, spreadsheetId) {
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

OrcidGoogleSheet.prototype.write_with_google_googleapis = function(arr, spreadsheetId) { 
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  var ogSheet = this;
  this.authorize(spreadsheetId, function(auth) { 
    ogSheet.append(auth, arr, spreadsheetId);
  });
}

// adding append funtion
OrcidGoogleSheet.prototype.append = function(auth, arr, spreadsheetId) {
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


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} spreadsheetId spreedsheet we are working with.
 * @param {function} callback The callback to call with the authorized client.
 */
OrcidGoogleSheet.prototype.authorize = function(spreadsheetId, callback) {
  var oauth2Client = this.getGOauth2Client();
  // Check if we have previously stored a token.
  console.log("spreedsheet " + spreadsheetId);
  var credentials = this.getToken(spreadsheetId);
  if (credentials == null) 
      console.log("Spreedsheet has no token please visit /" + spreadsheetId + '/has_token.json')
  else {
      oauth2Client.credentials = credentials;
      callback(oauth2Client, spreadsheetId);
   }
}

exports.OrcidGoogleSheet = OrcidGoogleSheet;