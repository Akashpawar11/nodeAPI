var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { Console } = require('console');
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
    password: 'toor',
    database: 'node-mysql-api'
});
// connect to database
database.connect();
// Retrieve all users
app.get('/users', (req, res) => {
    database.query('SELECT * FROM users', (error, results) => {
        if (error) throw error;
        return res.send({ data: results, message: 'users list.' })

    });
});

// Get user information with user ID  
app.get('/user/:id', (req, res) => {
    let user_id = req.params.id;
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
    let created_at = req.body.created_at;
    database.query("INSERT INTO users values (?,?,?,?) ", [id , name , email ,created_at], (error, results) => {
        if (error) throw error;
        return res.send({ data: results, message: 'New user has been created successfully.' });
    });
});
//  Update user with id
// app.put('/user', (req, res) => {
//     let user_id = req.body.user_id;
//     let user = req.body.user;
//     if (!user_id || !user) {
//         return res.status(400).send({ message: 'Please provide user and user_id' });
//     }
//     database.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], (error, results) => {
//         if (error) throw error;
//         return res.send({ data: results, message: 'user has been updated successfully.' });
//     });
// });
// //  Delete user
// app.delete('/user', (req, res) => {
//     let user_id = req.body.user_id;
//     if (!user_id) {
//         return res.status(400).send({ message: 'Please provide user_id' });
//     }
//     database.query('DELETE FROM users WHERE id = ?', [user_id], (error, results, fields) => {
//         if (error) throw error;
//         return res.send({ data: results, message: 'User has been updated successfully.' });
//     });
// });
// set port
app.listen(3000, () => {
    console.log('node-express-api is running on http://localhost:3000');
});
module.exports = app;