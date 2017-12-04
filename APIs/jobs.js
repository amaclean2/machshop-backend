const JOBS_COLLECTION	= 'jobs';
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
  console.log('Jobs connection ready');
});

exports.getAllJobs = (req, res) => {
	// query params are at req.query
  db.collection(JOBS_COLLECTION).find({}).toArray((err, event) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.getIndividualJob = (req, res) => {
	db.collection(JOBS_COLLECTION).findOne({ _id: new ObjectID(req.params.partId) }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.postJobs = (req, res) => {
	var newPart = req.body;

  db.collection(JOBS_COLLECTION).insertOne(newPart, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newPart);
    }
  });
}

exports.putJobs = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(JOBS_COLLECTION).updateOne({_id: new ObjectID(req.params.partId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.partId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteJobs = (req, res) => {
	db.collection(JOBS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.partId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Job successfully deleted'});
    }
  });
}