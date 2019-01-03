const SETUP_COLLECTION	  = 'setup';
var 	mongodb						= require('mongodb'),
			ObjectID					= mongodb.ObjectID,
			portId						= process.env.PORT || 3001,
			enviornment				= (portId === 3001) ? 'mongodb://localhost/machshop' : 'mongodb://admin:machmango@ds127936.mlab.com:27936/heroku_htdsz891',
			db;

mongodb.MongoClient.connect(enviornment, (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log('setup sheet connection ready');
});

exports.getSheets = (req, res) => {
	// query params are at req.query
  db.collection(SETUP_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.getIndividualSheet = (req, res) => {
  db.collection(SETUP_COLLECTION).findOne({ _id: new ObjectID(req.params.setupId), company_id: req.query.company_id }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.postSheet = (req, res) => {
	var newSetupSheet = req.body;

  db.collection(SETUP_COLLECTION).insertOne(newSetupSheet, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newSetupSheet);
    }
  });
}

exports.putSheet = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(SETUP_COLLECTION).updateOne({_id: new ObjectID(req.params.setupId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.setupId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteSheet = (req, res) => {
	db.collection(SETUP_COLLECTION).deleteOne({ _id: new ObjectID(req.params.setupId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Setup sheet successfully deleted'});
    }
  });
}