const LATHE_COLLECTION	= 'lathe';
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
});

exports.getAllLatheTools = (req, res) => {
	// query params are at req.query
  if(req.query.company_id === '5a4b0203734d1d7cf82ec0b8') {
    db.collection(LATHE_COLLECTION).find({ }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    db.collection(LATHE_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } 
}

exports.getIndividualLatheTool = (req, res) => {
  if(req.query.company_id === '5a4b0203734d1d7cf82ec0b8') {
    db.collection(LATHE_COLLECTION).findOne({ _id: new ObjectID(req.params.latheToolId) }, (err, event) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    db.collection(LATHE_COLLECTION).findOne({ _id: new ObjectID(req.params.latheToolId), company_id: req.query.company_id }, (err, event) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  }
}

exports.postLatheTool = (req, res) => {
	var newLatheTool = req.body;

  db.collection(LATHE_COLLECTION).insertOne(newLatheTool, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newLatheTool);
    }
  });
}

exports.putLatheTool = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(LATHE_COLLECTION).updateOne({_id: new ObjectID(req.params.latheToolId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.latheToolId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteLatheTool = (req, res) => {
	db.collection(LATHE_COLLECTION).deleteOne({ _id: new ObjectID(req.params.latheToolId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Lathe tool successfully deleted'});
    }
  });
}