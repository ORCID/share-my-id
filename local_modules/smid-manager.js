var mongojs = require('mongojs'),
randomstring = require("randomstring");

var SmidManger = function (connectionStr, collectionsArr) {
    this._db = mongojs(connectionStr, collectionsArr);
    this._smidCol = this._db.collection('smids');
    console.log("listing all docs")
//    this._smidCol.find(function (err, docs) {
//      docs.forEach(function (doc) {
//        console.log(JSON.stringify(doc, 4));
//      });
//    });
    this._smidCol.createIndex({public_key:1}, {unique: true});
};

/*
 *  callback(err, [new smid object])
 */

SmidManger.prototype.createSmid = function(orcidId, orcidName, callback) {
  if (orcidId == null) throw new Error("createSmid: orcidId is null");
  if (orcidName == null) throw new Error("createSmid: orcidName is null");
  if (orcidId == null) throw new Error("createSmid: orcidCallback is null");
  var smidManger = this;
  var pubKey = randomstring.generate(8);
  var privKey = randomstring.generate()
  
  // make sure pubKey doesn't exist in the db
  this._smidCol.findOne({public_key: pubKey}, function(err, doc) {
    if (doc !== null) {
      console.log("public_key collision " + pubKey + "! tying agian.");
      smidManger.createSmid(orcidId, callback);
    } else {
      var newSmid = {
        details : {
          authenticated_orcids: [ /* { orcid: 0000-0000-0000-0000, name: 'name' } */],
          created: new Date(),
          form: {
            description: undefined,
            title: undefined,
          },
          owner: {
            orcid: orcidId, 
            name: orcidName
          }
        },
        private_key: privKey, // used for allowing edits
        public_key: pubKey // used for shareing
      }
      smidManger._smidCol.save(newSmid, callback);      
    }
  });
};

SmidManger.prototype.getDetails = function(pubKey, callback) {
  this._smidCol.findOne({public_key: pubKey}, function(err, doc) {
    if (err) callback(err,null);
    else callback(null, doc != null ? doc.details : null);
  })
};

SmidManger.prototype.updateForm = function(privateKey, form, callback) {
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

SmidManger.prototype.addOrcidName = function(publicKey, orcidName, callback) {
  this._smidCol.findAndModify({
      query: {public_key: publicKey}, 
      update: {$addToSet: {'details.authenticated_orcids': orcidName}},
      new: true // this means return the updated object
    },
    function(err, doc, lastErrorObject) {
      if (err) callback(err, null);
      else {
        console.log("returned doc " + JSON.stringify(doc));
        callback(null, doc.details.authenticated_orcids);
      }
  });
}

exports.SmidManger = SmidManger;