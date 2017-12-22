const USERS_COLLECTION	= 'users';
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
  console.log('users connection ready');
});

exports.getAllUsers = (req, res) => {
	// query params are at req.query
  db.collection(USERS_COLLECTION).find({}).toArray((err, user) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(user);
    }
  });
}

exports.getIndividualUser = (req, res) => {
	db.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(req.params.userId) }, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(user);
    }
  });
}

exports.postUsers = (req, res) => {
	var newUser = req.body;

  db.collection(USERS_COLLECTION).insertOne(newUser, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newUser);
    }
  });
}

exports.putUsers = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(USERS_COLLECTION).updateOne({_id: new ObjectID(req.params.eventId)}, updateDoc, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.userId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteUsers = (req, res) => {
	db.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.userId )}, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'User successfully deleted'});
    }
  });
}