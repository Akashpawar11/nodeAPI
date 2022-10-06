const connection = require('./connection.js');
const queries = require('../queries/queries.js');
const { validate } = require('jsonschema');
var _ = require('underscore');

var db = connection.database;
connection.database.connect();

exports.home = (req, res) => {
    const homeContent = [{ message: 'Hello...This api is created using express and mysql' }, { paths: "/users" }]
    return res.send(homeContent)
};

exports.users = async (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(queries.view_all, (error, results) => {
            if (error) {
                reject(res.status(400).send(error))
            } else if (error == null) {
                resolve(res.send({ data: results, message: 'users list' }))
            }
        })
    }).catch(() => {
        console.log("Error occured")
    })
}

exports.single_user = async (req, res) => {
    new Promise((resolve, reject) => {
        let user_id = req.params.id;
        db.query(queries.view_particular, user_id, (error, results) => {
            if (error) {
                reject(res.send(error))
            } else if (error == null) {
                resolve(res.send({ data: results }))
            }
        })
    }).catch(() => {
        console.log("")
    })
}

var message = (msg) => {
    return msg.property + '-' + msg.instance + '-' + msg.message
}

exports.post_user = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let role = req.body.role;

    const userSchema = require('../middleware/schema');
    const result = validate(req.body, userSchema.userSchema);
    if (!result.valid) {
        console.log("Validation Error !!!!");
        const newArr = result.errors.map(message)
        res.status(400).send({ Errors: newArr });
    }
    else {
        new Promise((resolve, reject) => {
            db.query(queries.post_user, [id, name, email, contact, role], (error, results) => {
                if (error.errno == 1062) {
                    reject(res.status(400).send("User with same ID or email or contact exists"))
                } else if (error == null) {
                    resolve(res.send({ message: 'New user created successfully!!!' }))
                }
            });
        }).catch(() => {
            console.log("Post - catch block")
        })
    }
}

exports.update_user = async (req, res) => {
    console.log("--------------------------------------------");
    console.log("-----UPDATE USER-----");
    console.log(_.now())
    let id = req.body.id
    let name = req.body.name
    let email = req.body.email
    let contact = req.body.contact
    let role = req.body.role

    const userSchema = require('../middleware/schema')

    const result = validate(req.body, userSchema.userSchema);
    console.log('data validation - ', result.valid)

    if (!result.valid) {
        console.log("Validation Error !!!!")
        console.log("--------------------------------------------");

        const newArr = result.errors.map(message)
        _.pluck(result.errors, 'message');

        res.status(400).send({ Errors: newArr });
    } else {
        console.log("Userdata data is valid....Updating data!!!");
        db.query(queries.update_user, [name, email, contact, role, id], async (error, results) => {
            if (error) {
                res.status(400).send({ message: "Error Occured" })
            }
            try {
                await res.send({ message: 'user has been updated successfully' });
                console.log("User data updated successfully");
                console.log("--------------------------------------------");
            } catch (error) {
                console.log("Error occured!!!")
                console.log("--------------------------------------------");
                await res.status(400).send(error)
            }
        });
    }
}

exports.delete_user = async (req, res) => {
    console.log("--------------------------------------------");
    console.log("-----DELETE USER-----");
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'Please provide user_id' });
    }
    db.query(queries.delete_user, [id], async (error, results) => {
        if (error) {
            try {
                await res.status(400).send(error)
            } catch (error) {
                await req.status(400).send(error)
            }
        } else {
            res.send({ message: 'User has been removed successfully!!!' });
        }
    });
}

exports.delete_all = async (req, res) => {
    db.query(queries.delete_all, async (error, results) => {
        if (error) {
            try {
                await res.status(400).send("Something went wrong")
            } catch (error) {
                await res.send(error)
            }
        } else {
            await res.send({ message: 'All data cleared!!!' });
        }
    });
}