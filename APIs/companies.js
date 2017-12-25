const COMPANY_COLLECTION	= 'companies';
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
  console.log('company connection ready');
});

exports.getAllCompanies = (req, res) => {
	// query params are at req.query
  db.collection(COMPANY_COLLECTION).find({}).toArray((err, user) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(company);
    }
  });
}

exports.getIndividualCompany = (req, res) => {
	db.collection(COMPANY_COLLECTION).findOne({ _id: new ObjectID(req.params.companyId) }, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(company);
    }
  });
}

exports.postCompany = (req, res) => {
	var newCompany = req.body;

  db.collection(COMPANY_COLLECTION).insertOne(newCompany, (err, company) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newCompany);
    }
  });
}

exports.putCompany = (req, res) => {
	var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(COMPANY_COLLECTION).updateOne({_id: new ObjectID(req.params.companyId)}, updateDoc, (err, company) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updateDoc._id = req.params.companyId;
      res.status(200).json(updateDoc);
    }
  });
}

exports.deleteCompany = (req, res) => {
	db.collection(COMPANY_COLLECTION).deleteOne({ _id: new ObjectID(req.params.companyId )}, (err, company) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Company successfully deleted'});
    }
  });
}