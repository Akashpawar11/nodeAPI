const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers.js');

router.get('/',controllers.home);   //homepage
router.get('/users', controllers.users);    //all users data
router.get('/user/:id', controllers.single_user);   //single user data
router.post('/user', controllers.post_user);    //add new user
router.put('/user', controllers.update_user);   //update user data
router.use('/user/:id', controllers.delete_user);   //remove user
router.delete('/users', controllers.delete_all);    //wipe out data of all users

module.exports = router ;