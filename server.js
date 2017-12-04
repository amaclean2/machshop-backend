var express     = require('express'),
    app         = express(),
    mongodb     = require('mongodb'),
    bodyParser  = require('body-parser'),
    portId      = process.env.PORT || 3001;
    parts       = require('./APIs/parts');
    jobs        = require('./APIs/jobs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(portId, () => {
    var port = server.address().port;
    console.log("App running on port ", port);
  });

app.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/parts', parts.getAllParts);
app.get("/api/parts/:partId", parts.getIndividualPart);
app.post("/api/parts", parts.postParts);
app.put("/api/parts/:partId", parts.putParts);
app.delete("/api/parts/:partId", parts.deleteParts);

app.get('/api/jobs', jobs.getAllJobs);
app.post('/api/jobs', jobs.postJobs);
