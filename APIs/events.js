const EVENTS_COLLECTION	= 'events';
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
  console.log('events connection ready');
});

exports.getAllEvents = (req, res) => {
	// query params are at req.query
  if(req.query.company_id === '5a4b0203734d1d7cf82ec0b8') {
    db.collection(EVENTS_COLLECTION).find({ }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  } else {
    db.collection(EVENTS_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(event);
      }
    });
  }
}

exports.getIndividualEvent = (req, res) => {
	db.collection(EVENTS_COLLECTION).findOne({ _id: new ObjectID(req.params.eventId), company_id: req.query.company_id  }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.postEvents = (req, res) => {
	var newEvent = req.body;

  db.collection(EVENTS_COLLECTION).insertOne(newEvent, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newEvent);
    }
  });
}

exports.putEvents = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(EVENTS_COLLECTION).updateOne({_id: new ObjectID(req.params.eventId)}, updateDoc, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.eventId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteEvents = (req, res) => {
	db.collection(EVENTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.eventId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Event successfully deleted'});
    }
  });
}