var express         = require('express'),
    app             = express(),
    mongodb         = require('mongodb'),
    bodyParser      = require('body-parser'),
    portId          = process.env.PORT || 3001,
    users           = require('./APIs/users');
    companies       = require('./APIs/companies');
    shoppingMill    = require('./APIs/shoppingMill');
    shoppingLathe   = require('./APIs/shoppingLathe');
    shoppingOther   = require('./APIs/shoppingOther');
    setupSheets     = require('./APIs/setupSheets');

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

app.get('/api/shopping/mill', shoppingMill.getTools);
app.get('/api/shopping/mill/:toolId', shoppingMill.getIndividualTool);
app.post('/api/shopping/mill', shoppingMill.postTool);
app.put('/api/shopping/mill/:toolId', shoppingMill.putTool);
app.delete('/api/shopping/mill/:toolId', shoppingMill.deleteTool);

app.get('/api/shopping/lathe', shoppingLathe.getTools);
app.get('/api/shopping/lathe/:toolId', shoppingLathe.getIndividualTool);
app.post('/api/shopping/lathe', shoppingLathe.postTool);
app.put('/api/shopping/lathe/:toolId', shoppingLathe.putTool);
app.delete('/api/shopping/lathe/:toolId', shoppingLathe.deleteTool);

app.get('/api/shopping/other', shoppingOther.getTools);
app.get('/api/shopping/other/:toolId', shoppingOther.getIndividualTool);
app.post('/api/shopping/other', shoppingOther.postTool);
app.put('/api/shopping/other/:toolId', shoppingOther.putTool);
app.delete('/api/shopping/other/:toolId', shoppingOther.deleteTool);

app.get('/api/setup', setupSheets.getSheets);
app.get('/api/setup/:sheetId', setupSheets.getIndividualSheet);
app.post('/api/setup', setupSheets.postSheet);
app.put('/api/setup/:sheetId', setupSheets.putSheet);
app.delete('/api/setup/:sheetId', setupSheets.deleteSheet);
