const OTHER_COLLECTION	  = 'other';
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
  console.log('other tools connection ready');
});

exports.getAllOtherTools = (req, res) => {
	// query params are at req.query
  if(req.query.company_id === '5a4b0203734d1d7cf82ec0b8') {
    db.collection(OTHER_COLLECTION).find({ }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    db.collection(OTHER_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } 
}

exports.getIndividualOtherTool = (req, res) => {
  if(req.query.company_id === '5a4b0203734d1d7cf82ec0b8') {
    db.collection(OTHER_COLLECTION).findOne({ _id: new ObjectID(req.params.otherToolId) }, (err, event) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    db.collection(OTHER_COLLECTION).findOne({ _id: new ObjectID(req.params.otherToolId), company_id: req.query.company_id }, (err, event) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  }
}

exports.postOtherTool = (req, res) => {
	var newOtherTool = req.body;

  db.collection(OTHER_COLLECTION).insertOne(newOtherTool, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newOtherTool);
    }
  });
}

exports.putOtherTool = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(OTHER_COLLECTION).updateOne({_id: new ObjectID(req.params.otherToolId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.otherToolId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteOtherTool = (req, res) => {
	db.collection(OTHER_COLLECTION).deleteOne({ _id: new ObjectID(req.params.otherToolId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Other tool successfully deleted'});
    }
  });
}