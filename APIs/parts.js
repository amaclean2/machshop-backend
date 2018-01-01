const PARTS_COLLECTION	= 'parts';
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
  console.log('Parts connection ready');
});

exports.getAllParts = (req, res) => {
	// query params are at req.query
  db.collection(PARTS_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.getGlobalParts = (req, res) => {
  // query params are at req.query
  if(req.params.companyId === '1100') {
    db.collection(PARTS_COLLECTION).find({ }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    res.status(400).send('invalid company');
  }
   
}

exports.getIndividualPart = (req, res) => {
	db.collection(PARTS_COLLECTION).findOne({ _id: new ObjectID(req.params.partId), company_id: req.query.company_id  }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.postParts = (req, res) => {
	var newPart = req.body;

  db.collection(PARTS_COLLECTION).insertOne(newPart, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newPart);
    }
  });
}

exports.putParts = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(PARTS_COLLECTION).updateOne({_id: new ObjectID(req.params.partId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.partId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteParts = (req, res) => {
	db.collection(PARTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.partId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Part successfully deleted'});
    }
  });
}