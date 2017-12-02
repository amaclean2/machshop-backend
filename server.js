var express = require('express'),
    app = express(),
    mongodb = require('mongodb'),
    ObjectID = mongodb.ObjectID,
    bodyParser = require('body-parser');

var PARTS_COLLECTION = 'parts';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(/*mongodb://localhost/machshop'*/'mongodb://admin:machmango@ds127936.mlab.com:27936/heroku_htdsz891', (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log('Database connection ready');

  var server = app.listen(process.env.PORT || 3001, () => {
    var port = server.address().port;
    console.log("App running on port ", port);
  });
});

app.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/parts', (req, res) => {
  db.collection(PARTS_COLLECTION).find({}).toArray((err, event) => {
    if(err) {
      res.status(400).send(err);
      console.log(err);
    } else {
      res.status(200).json(event);
    }
  });
});

app.post("/api/parts", (req, res) => {
  var newContact = req.body;

  db.collection(PARTS_COLLECTION).insertOne(newContact, function(err, event) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
});


// app.post('/api/parts', (req, res) => {
// 	var new_event = new Part(req.body);
// 	new_event.save((err, event) => {
// 		if (err) {
// 			res.status(400).send(err);
// 		} else {
// 			res.status(200).send(event);
// 		}
// 	})
// });

app.get('/api/parts/:partId', (req, res) => {
	Part.findById(req.params.partId, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
    	res.status(200).json(event);
  	}
  });
});

app.put('/api/events/:eventId', (req, res) => {
	Part.findOneAndUpdate({_id: req.params.eventId}, req.body, {new: true}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
    	res.status(200).json(event);
    }
  });
});

app.delete('/api/parts/:partId', (req, res) => {
	Part.remove({
    _id: req.params.partId
  }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
    	res.status(200).send({ message: 'Part successfully deleted' });
   	}
  });
});
