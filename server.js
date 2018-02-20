var express         = require('express'),
    app             = express(),
    mongodb         = require('mongodb'),
    bodyParser      = require('body-parser'),
    portId          = process.env.PORT || 3001;
    parts           = require('./APIs/parts'),
    jobs            = require('./APIs/jobs'),
    events          = require('./APIs/events');
    users           = require('./APIs/users');
    companies       = require('./APIs/companies');
    millTools       = require('./APIs/millTools');
    latheTools      = require('./APIs/latheTools');
    otherTools      = require('./APIs/otherTools');
    setupSheets     = require('./APIs/setupSheets');
    shoppingMill    = require('./APIs/shoppingMill');

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

app.get('/api/users', users.getUsers);
app.get('/api/allusers', users.getWithoutAuth);
app.get('/api/users/:userId', users.getIndividualUser);
app.post('/api/users', users.postUsers);
app.put('/api/users/:userId', users.putUsers);
app.delete('/api/users/:userId', users.deleteUsers);

app.get('/api/companies', companies.getAllCompanies);
app.get('/api/companies/:companyId', companies.getIndividualCompany);
app.post('/api/companies', companies.postCompany);
app.put('/api/companies/:companyId', companies.putCompany);
app.delete('/api/companies/:companyId', companies.deleteCompany);

app.get('/api/mill', millTools.getAllMillTools);
app.get('/api/mill/:millToolId', millTools.getIndividualMillTool);
app.post('/api/mill', millTools.postMillTool);
app.put('/api/mill/:millToolId', millTools.putMillTool);
app.delete('/api/mill/:millToolId', millTools.deleteMillTool);

app.get('/api/lathe', latheTools.getAllLatheTools);
app.get('/api/lathe/:latheToolId', latheTools.getIndividualLatheTool);
app.post('/api/lathe', latheTools.postLatheTool);
app.put('/api/lathe/:latheToolId', latheTools.putLatheTool);
app.delete('/api/lathe/:latheToolId', latheTools.deleteLatheTool);

app.get('/api/other', otherTools.getAllOtherTools);
app.get('/api/other/:otherToolId', otherTools.getIndividualOtherTool);
app.post('/api/other', otherTools.postOtherTool);
app.put('/api/other/:otherToolId', otherTools.putOtherTool);
app.delete('/api/other/:otherToolId', otherTools.deleteOtherTool);

app.get('/api/setup', setupSheets.getAllSetupSheets);
app.get('/api/setup/:setupId', setupSheets.getIndividualSetupSheet);
app.post('/api/setup', setupSheets.postSetupSheet);
app.put('/api/setup/:setupId', setupSheets.putSetupSheet);
app.delete('/api/setup/:setupId', setupSheets.deleteSetupSheet);

app.get('/api/shopping/mill', shoppingMill.getTools);
app.get('/api/shopping/mill/:toolId', shoppingMill.getIndividualTool);
app.post('/api/shopping/mill', shoppingMill.postTool);
app.put('/api/shopping/mill/:toolId', shoppingMill.putTool);
app.delete('/api/shopping/mill/:toolId', shoppingMill.deleteTool);
