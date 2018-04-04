const SHOPPING_COLLECTION	  = 'shoppingOther';
var 	mongodb						    = require('mongodb'),
			ObjectID					    = mongodb.ObjectID,
			portId						    = process.env.PORT || 3001,
			enviornment				    = (portId === 3001) ? 'mongodb://localhost/machshop' : 'mongodb://admin:machmango@ds127936.mlab.com:27936/heroku_htdsz891',
			db;

mongodb.MongoClient.connect(enviornment, (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
});

exports.getTools = (req, res) => {
	// query params are at req.query
  db.collection(SHOPPING_COLLECTION).find({ company_id: req.query.company_id }).toArray((err, event) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.getIndividualTool = (req, res) => {
  db.collection(SHOPPING_COLLECTION).findOne({ _id: new ObjectID(req.params.toolId), company_id: req.query.company_id }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
}

exports.postTool = (req, res) => {
	var newTool = req.body;
  newTool.created_at = new Date().getTime();
  newTool.updated_at = new Date().getTime();

  db.collection(SHOPPING_COLLECTION).insertOne(newTool, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(newTool);
    }
  });
}

exports.putTool = (req, res) => {
	var updatedTool = req.body;
  updatedTool.updated_at = new Date().getTime();
  delete updatedTool._id;

  db.collection(SHOPPING_COLLECTION).updateOne({_id: new ObjectID(req.params.toolId)}, updatedTool, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      updatedTool._id = req.params.toolId;
      res.status(200).json(updatedTool);
    }
  });
}

exports.deleteTool = (req, res) => {
	db.collection(SHOPPING_COLLECTION).deleteOne({ _id: new ObjectID(req.params.toolId )}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({message: 'Tool successfully deleted'});
    }
  });
}