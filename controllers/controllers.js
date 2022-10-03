var connection = require('./connection.js');
var queries = require('../queries/queries.js');
var { validate } = require('jsonschema');
const e = require('express');

var db = connection.database;
connection.database.connect();


exports.home = (req, res) => {
    const homeContent = [{ message: 'Hello...This api is created using express and mysql' },
    { paths: "/users" }]
    return res.send(homeContent)
};

exports.users = (req, res) => {
    console.log("--------------------------------------------");
    console.log("Getting data of all users....");
    db.query(queries.view_all, (error, results) => {
        if (error) {
            res.status(400).send(error);
            console.log("Error occured --- ", error);
            console.log("--------------------------------------------");
        } else {
            res.send({ data: results, message: 'users list' });
            console.log("fetched data of all users!!!");
            console.log("--------------------------------------------");
        }
    });
};

exports.single_user = (req, res) => {
    console.log("--------------------------------------------");
    console.log("Getting data of a particular user....");
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ message: 'Please provide user_id' });
    }
    db.query(queries.view_particular, user_id, (error, results) => {
        if (error) {
            res.status(400).send(error)
        } else {   
            res.send({ data: results[0] });
        }
    });
}

exports.post_user = (req, res) => {
    console.log("--------------------------------------------");
    console.log("-----POST USER-----");
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let role = req.body.role;
    
    const userSchema = require('../middleware/schema');
    //Json Schema validation 
    const result = validate(req.body, userSchema.userSchema);
    console.log('data validation - ', result.valid);
    
    if (!result.valid) {
        console.log("Validation Error !!!!");
        const newArr = result.errors.map(message)
        function message(msg){
            return msg.property+ '-'+ msg.instance + '-' + msg.message
        }
        res.status(400).send({ Errors: newArr });
    }
    else {
        console.log("Userdata data is valid....Sending data!!!");
        db.query(queries.post_user, [id, name, email, contact, role], (error, results) => {
            if (error) {
                console.log("Error occured!!!");
                console.log("--------------------------------------------");
                res.status(400).send(error);
            }
            else {
                res.send({ message: 'New user created successfully!!!', data :results });
                console.log("New user added successfully!!!");
                console.log("--------------------------------------------");
            }
        });
    }
}

exports.update_user = (req, res) => {
    console.log("--------------------------------------------");
    console.log("-----UPDATE USER-----");
    let id = req.body.id
    let name = req.body.name
    let email = req.body.email
    let contact = req.body.contact
    let role = req.body.role
    
    const userSchema = require('../middleware/schema')
    
    const result = validate(req.body, userSchema.userSchema);
    console.log('data validation - ', result.valid)
    console.log('data - ', result)
    
    if (!result.valid) {
        console.log("Validation Error !!!!")
        console.log("--------------------------------------------");
        
        const newArr = result.errors.map(message)
        function message(msg){
            return msg.property+ '-'+ msg.instance + '-' + msg.message
        }
        res.status(400).send({ Errors: newArr });
    } else {
        console.log("Userdata data is valid....Updating data!!!");
        db.query(queries.update_user, [name, email, contact, role, id], (error, results) => {
            if (error) {
                console.log("Error occured!!!")
                console.log("--------------------------------------------");
                res.status(400).send(error)
            } else {
                res.send({ message: 'user has been updated successfully' , data: results });
                console.log("User data updated successfully");
                console.log("--------------------------------------------");
            }
        });
    }
}

exports.delete_user = (req, res) => {
    console.log("--------------------------------------------");
    console.log("-----DELETE USER-----");
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'Please provide user_id' });
    }
    db.query(queries.delete_user, [id],(error, results) => {
        if (error) {
            console.log("ERROR OCCURED")
            res.status(400).send(error)
        } else {
            res.send({ message: 'User has been removed successfully!!!', data: results });
            console.log("User has been removed successfully!!!!")
        }
    });
}

exports.delete_all = (req, res) => {  
    db.query(queries.delete_all ,(error, results) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.send({ message: 'All data cleared!!!', data: results});
        }
    });
}