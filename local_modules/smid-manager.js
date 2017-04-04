var mongojs = require('mongojs'),
Ajv = require('ajv'),
randomstring = require("randomstring");

var ajv = new Ajv();

var OrcidRecordSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Orcid Record",
    "description": "Records Name and ORCID iD",
    "type": "object",
    "properties": {
        "orcid": {
            "description": "ORCID iD",
            "type": "string"
        },
        "fullOrcidId": {
            "description": "Full url ORCID iD",
            "type": "string"
        },
        "name": {
            "description": "ORCID users pulbic name",
            "type": "string"
        },
        "dateRecorded": {
            "description": "ORCID iD",
            "type": "object",
            "format": "date-time"
        },
        "version": {
            "description": "version of type of this record, useful for later migrations",
            "type": "number"
        }

    },
    "required": ["orcid", "fullOrcidId", "name", "dateRecorded", "version"],
    "additionalProperties": false
};

var FormSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "SMID Form",
    "description": "SMID Form",
    "type": "object",
    "properties": {
        "description": {
            "description": "description",
            "type": "string"
        },
        "title": {
            "description": "title",
            "type": "string"
        }
    },
    "required": ["title"],
    "additionalProperties": false
};



var SmidManger = function (connectionStr) {
    this._db = mongojs(connectionStr);
    this._smidCol = this._db.collection('smids');
    console.log("listing all docs")
//    this._smidCol.find(function (err, docs) {
//      docs.forEach(function (doc) {
//        console.log(JSON.stringify(doc, 4));
//      });
//    });
    this._smidCol.createIndex({public_key:1}, {unique: true});
    this._smidCol.createIndex({private_key:1}, {unique: true});
};

/*
 *  callback(err, [new smid object])
 */

SmidManger.prototype.createSmid = function(orcidRecord, callback) {
  this.validateOrcidRecord(orcidRecord);
  var smidManger = this;
  var pubKey = randomstring.generate(8);
  var privKey = randomstring.generate()
  
  // make sure pubKey doesn't exist in the db
  this._smidCol.findOne({public_key: pubKey}, function(err, doc) {
    if (doc !== null) {
      console.log("public_key collision " + pubKey + "! tying agian.");
      smidManger.createSmid(orcidRecord, callback);
    } else {
      var newSmid = {
        details : {
          authenticated_orcids: [ /* { orcid: 0000-0000-0000-0000, name: 'name' } */],
          created: new Date(),
          form: {
            description: undefined,
            title: undefined,
          },
          owner: orcidRecord
        },
        private_key: privKey, // used for allowing edits
        public_key: pubKey, // used for shareing
        'version': 1
      }
      smidManger._smidCol.save(newSmid, callback);      
    }
  });
};

SmidManger.prototype.createOrcidRecord = function(orcidId, fullOrcidId, name) {
  return { 'orcid': orcidId, 'fullOrcidId': fullOrcidId, 'name': name, 'dateRecorded': new Date(), 'version': 1};
};

SmidManger.prototype.getDetails = function(pubKey, callback) {
  this._smidCol.findOne({public_key: pubKey}, function(err, doc) {
    if (err) callback(err,null);
    else callback(null, doc != null ? doc.details : null);
  })
};

SmidManger.prototype.updateForm = function(privateKey, form, callback) {
  this.validateForm(form);
  this._smidCol.findAndModify({
      query: {private_key: privateKey}, 
      update: {$set: {'details.form': form}},
      new: true // this means return the updated object
    }, 
    function(err, doc, lastErrorObject) {
      if (err) callback(err, null);
      else {
        console.log("returned doc " + JSON.stringify(doc));
        callback(null, doc.details.form);
      }
  });
}

SmidManger.prototype.validateOrcidRecord = function(orcidRecord) {
  if (!ajv.validate(OrcidRecordSchema, orcidRecord)) {
    console.log(JSON.stringify(orcidRecord));
    console.log(ajv.errors);
    throw new Error("Invalid orcidRecord");
  }
};

SmidManger.prototype.validateForm = function(form) {
  if (!ajv.validate(FormSchema, form)) {
    console.log(JSON.stringify(form));
    console.log(ajv.errors);
    throw new Error("Invalid form");
  }
};

SmidManger.prototype.addOrcidRecord = function(orcidRecord, publicKey, callback) {
  this.validateOrcidRecord(orcidRecord);
  this._smidCol.findAndModify({
      query: {public_key: publicKey}, 
      update: {$push: {'details.authenticated_orcids': orcidRecord}},
      new: true // this means return the updated object
    },
    function(err, doc, lastErrorObject) {
      if (err) callback(err, null);
      else callback(null, doc.details.authenticated_orcids); 
  });
}

exports.SmidManger = SmidManger;