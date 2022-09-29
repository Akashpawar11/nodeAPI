var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});


const homeContent = [{ message: 'Hello...This api is created using express and mysql' },
{ paths: "/users" }]

// Home page - dafault route
app.get('/', (req, res) => {
    return res.send(homeContent)
});

// connection configuration
var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapi'
});

// connect to database
database.connect();

// get all users data
app.get('/users', (req, res) => {
    database.query('SELECT * FROM users', (error, results) => {
        if (error) throw error;
        return res.send({ data: results, message: 'users list.' })

    });
});

// Get user information with user ID  
app.get('/user/:id', (req, res) => {
    let user_id = req.params.id
    if (!user_id) {
        return res.status(400).send({ message: 'Please provide user_id' });
    }
    database.query('SELECT * FROM users where id=?', user_id, function (error, results) {
        if (error) throw error;
        return res.send({ data: results[0] });
    });
});
app.post('/user', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let role = req.body.role;
    database.query("INSERT INTO users values (?,?,?,?,?) ", [id, name, email, contact,role], (error, results) => {
        if (error) {
            throw error;
        }
        return res.send({ data: results, message: 'New user has been created successfully.' });
    });
});

//  Update user with id
app.put('/user', (req, res) => {
    let id1 = parseInt(req.body.id)
    console.log(id1)
    console.log(typeof(id1))
    let name = (req.body.name).toString();
    console.log(name)
    let email = (req.body.email).toString();
    console.log(email)
    let contact = (req.body.contact).toString();
    console.log(contact)
    let role = (req.body.role).toString();
    console.log(role)
    if (!id1) {
        return res.status(400).send({ message: 'Please provide user and user_id' });
    }
    database.query("UPDATE users SET name=?, email=?, contact=? ,role=? WHERE id=?", [name,email,contact,role,id1], (error, results) => {
        if (error) throw error;
        return res.send({data: results, message: 'user has been updated successfully.' });
    });
});

app.delete('/user/:id', function (req, res) {
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    database.query('DELETE FROM users WHERE id = ?', [id], function (error, results){
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been removed successfully.' });
    });
    }); 

app.listen(3000, () => {
    console.log('node-express-api is running on http://localhost:3000');
});

module.exports = app;