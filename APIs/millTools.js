const MILL_COLLECTION	  = 'mill';
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
  console.log('tools connection ready');
});

exports.getAllMillTools = (req, res) => {
	// query params are at req.query
  if(req.query.company_id === '5a4b0203734d1d7cf82ec0b8') {
    db.collection(MILL_COLLECTION).find({ }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    db.collection(MILL_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } 
}

exports.getIndividualMillTool = (req, res) => {
  if(req.query.company_id === '5a4b0203734d1d7cf82ec0b8') {
    db.collection(MILL_COLLECTION).findOne({ _id: new ObjectID(req.params.millToolId) }, (err, event) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    db.collection(MILL_COLLECTION).findOne({ _id: new ObjectID(req.params.millToolId), company_id: req.query.company_id }, (err, event) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  }	
}

exports.postMillTool = (req, res) => {
	var newMillTool = req.body;

  db.collection(MILL_COLLECTION).insertOne(newMillTool, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newMillTool);
    }
  });
}

exports.putMillTool = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MILL_COLLECTION).updateOne({_id: new ObjectID(req.params.millToolId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.millToolId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteMillTool = (req, res) => {
	db.collection(MILL_COLLECTION).deleteOne({ _id: new ObjectID(req.params.millToolId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Mill tool successfully deleted'});
    }
  });
}