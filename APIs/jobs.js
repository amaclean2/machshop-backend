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
  console.log('jobs connection ready');
});

exports.getAllJobs = (req, res) => {
	// query params are at req.query
  db.collection(JOBS_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.getGlobalJobs = (req, res) => {
  // query params are at req.query
  if(req.query.company_id === '1100') {
    db.collection(JOBS_COLLECTION).find({ }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    res.status(400).send('company invalid');
  }
}

exports.getIndividualJob = (req, res) => {
	db.collection(JOBS_COLLECTION).findOne({ _id: new ObjectID(req.params.jobId), company_id: req.query.company_id }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.postJobs = (req, res) => {
	var newJob = req.body;

  db.collection(JOBS_COLLECTION).insertOne(newJob, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newJob);
    }
  });
}

exports.putJobs = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(JOBS_COLLECTION).updateOne({_id: new ObjectID(req.params.jobId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.jobId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteJobs = (req, res) => {
	db.collection(JOBS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.jobId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Job successfully deleted'});
    }
  });
}