var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const queries = require('./queries/queries');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//middleware for CORS
const headers = require('./middleware/headers')
app.use(headers.headers);

//routes
app.get('/', require('./routes/routes.js'));
app.get('/users', require('./routes/routes.js'));
app.get('/user/:id', require('./routes/routes.js'));
app.post('/user', require('./routes/routes.js'));
app.put('/user', require('./routes/routes.js'));
app.delete('/user/:id', require('./routes/routes.js'));

require('dotenv').config
const PORT = process.env.port || 3000
app.listen(PORT, () => {
    console.log(`node-express-api is running on http://localhost:${PORT}`);
});

module.exports = app;
