var connection = require('./connection.js')
var queries = require('../queries/queries.js');
// var S = require('fluent-json-schema')
// var ajv = require('../middleware/ajvschema')
var { validate } = require('jsonschema');
const { send } = require('process');

var db = connection.database
connection.database.connect()

exports.users = (req, res) => {
    db.query(queries.view_all, (error, results) => {
        if (error) throw error;
        return res.send({ results, message: 'users list.' })
    })
};

exports.single_user = (req, res) => {
    let user_id = req.params.id
    if (!user_id) {
        return res.status(400).send({ message: 'Please provide user_id' });
    }
    db.query(queries.view_particular, user_id, (error, results) => {
        if (error) throw error;
        return res.send({ data: results[0] });
    });
}

exports.post_user = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let role = req.body.role;



    // require the book schema (a JSON file that we generated on jsonschema.net)
    const userS = require('../middleware/schema.js');
    const userSchema = userS.a

    // var ajv = require('ajv');
    // var AJV = new ajv();
    // var userSchema = {
    //     type: "object",
    //     properties: {
    //         id: { type: "number" },
    //         name: { type: "string" },
    //         email: { type: "string" ,pattern: "^\\S+@\\S+\\.\\S+$",},
    //         contact: { type: "number", minLength: 10 },
    //         role: { type: "string" },
    //     },
    //     required: ["id", "name", "email", "contact", "role"],
    // };

    // const userData = req.body;
    // const isDataValid = AJV.validate(userSchema, userData);
    // console.log(isDataValid)

    const result = validate(req.body, userSchema);
    console.log('data is - ', result)

    if (result.valid) {
        db.query(queries.post_user, [id, name, email, contact, role], (error, results) => {
            if (error) {
                res.send(error)
            }
            else {
                res.send({ results, message: 'New user has been created successfully!!!' });
                console.log("Userdata data is valid!");
            }
        });
    } else {
        console.error("Userdata is invalid");
    }

}

exports.update_user = (req, res) => {
    let id1 = parseInt(req.body.id)
    let name = (req.body.name).toString();
    let email = (req.body.email).toString();
    let contact = (req.body.contact).toString();
    let role = (req.body.role).toString();
    if (!id1) {
        return res.status(400).send({ message: 'Please provide user and user_id' });
    }
    db.query(queries.update_user, [name, email, contact, role, id1], (error, results) => {
        if (error) throw error;
        return res.send({ data: results, message: 'user has been updated successfully.' });
    });
}

exports.delete_user = (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    db.query('DELETE FROM users WHERE id = ?', [id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been removed successfully.' });
    });
}