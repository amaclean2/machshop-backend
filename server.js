var express     = require('express'),
    app         = express(),
    mongodb     = require('mongodb'),
    bodyParser  = require('body-parser'),
    portId      = process.env.PORT || 3001;
    parts       = require('./APIs/parts'),
    jobs        = require('./APIs/jobs'),
    events      = require('./APIs/events');
    users       = require('./APIs/users');
    companies   = require('./APIs/companies');

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
app.get('/api/jobs/:jobId', jobs.getIndividualJob);
app.post('/api/jobs', jobs.postJobs);
app.put('/api/jobs/:jobId', jobs.putJobs);
app.delete('/api/jobs/:jobId', jobs.deleteJobs);

app.get('/api/events', events.getAllEvents);
app.get('/api/events/:eventId', events.getIndividualEvent);
app.post('/api/events', events.postEvents);
app.put('/api/events/:eventId', events.putEvents);
app.delete('/api/events/:eventId', events.deleteEvents);

app.get('/api/allusers', users.getAllUsers);
app.get('/api/users', users.getWithoutAuth);
app.get('/api/users/:userId', users.getIndividualUser);
app.post('/api/users', users.postUsers);
app.put('/api/users/:userId', users.putUsers);
app.delete('/api/users/:userId', users.deleteUsers);

app.get('/api/companies', companies.getAllCompanies);
app.get('/api/companies/:companyId', companies.getIndividualCompany);
app.post('/api/companies', companies.postCompany);
app.put('/api/companies/:companyId', companies.putCompany);
app.delete('/api/companies/:companyId', companies.deleteCompany);
