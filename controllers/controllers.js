const connection = require('./connection.js');
const qry = require('../queries/queries.js');
const { validate } = require('jsonschema');
var _ = require('underscore');
const variables = require('../config/const');
const queries = require('../queries/queries.js');

//database connectivity
var db = connection.database;
connection.database.connect();

//Homepage
exports.home = async (req, res) => {
    await res.json(variables.homeContent)
};

//To fetch data of all users
exports.users = async (req, res) => {
    db.query(qry.view_all, async (error, results) => {
        if (error !== null) await res.status(400).json("Something went wrong!!!");
        else if (error == null) await res.json({ data: results, message: 'users list' });
    })
}

//To fetch data of single user
exports.single_user = async (req, res) => {
    let user_id = req.params.id;
    db.query(qry.view_particular, user_id, async (error, results) => {
        try {
            if (error) await res.send(error);
            else if (error == null) await res.json({ data: results });
        } catch (err) {
            await res.status(400).send(err)
        }
    })
}

//To create new user
exports.post_user = async (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let role = req.body.role;

    const result = validate(req.body, require('../middleware/schema').userSchema);
    const newArr = result.errors.map(variables.message)
    if (!result.valid) await res.status(400).send({ Errors: newArr });
    else try {
        db.query(qry.post_user, [id, name, email, contact, role], async (error) => {
            if (error !== null && error.errno == 1062) {
                await res.status(400).send("User with same ID or email or contact exists")
            }
            else if (error == null) {
                await res.json({ message: 'New user created successfully!!!' })
                console.log(typeof (req.body.contact))
            }
        })
    } catch (err) { await res.status(500).send(err) }
}

//To update data of any existing user
exports.update_user = async (req, res) => {
    //req.body
    let id = req.body.id
    let name = req.body.name
    let email = req.body.email
    let contact = req.body.contact
    let role = req.body.role

    //result of schema validation
    const result = validate(req.body, require('../middleware/schema').userSchema);

    //errors in result mapped in newArr
    const newArr = result.errors.map(variables.message)

    //If validation is successfull
    if (!result.valid) res.status(400).json({ Errors: newArr })
    //If validation is unsuccessfull
    else db.query(qry.update_user, [name, email, contact, role, id], async (error) => {
        try {
            if (error) await res.status(400).json({ message: "Error in updating data..." }); //idf any sql error
            else await res.send({ message: 'user has been updated successfully' })
        } catch (error) {
            await res.status(400).json(error);
        }
    });
}

//To remove user using user's ID
exports.delete_user = async (req, res) => {
    let id = req.params.id;
    if (!id) await res.status(400).json({ message: 'Please provide user_id' });
    db.query(queries.delete_user, [id], async (error) => {
        try {
            if (error) {
                await res.status(400).json(error);
            } else {
                await res.send({ message: 'User has been removed successfully!!!' })
            }
        } catch (error) {
            res.status(400).send(error)
        }
    });
}

//To wipeout data of all existing users
exports.delete_all = async (req, res) => {
    db.query(queries.delete_all, async (error) => {
        if (error !== null) {
            try {
                await res.status(400).json("Something went wrong");
            } catch (error) {
                await res.json(error);
            }
        } else await res.json({ message: 'All data cleared!!!' })
    });
}