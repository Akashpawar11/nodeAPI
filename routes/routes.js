const express = require('express')
const router = express.Router()
const home = require('../controllers/home.js');
const controllers = require('../controllers/controllers.js');

router.get('/',home.home);
router.get('/users', controllers.users);
router.get('/user/:id', controllers.single_user);
router.post('/user', controllers.post_user);
router.put('/user', controllers.update_user);
router.use('/user/:id', controllers.delete_user);

module.exports = router ;