const express = require('express')
const router = express.Router()
const home = require('../controllers/home.js');
const users = require('../controllers/controllers.js');
// const validateDto = require('../middleware/validate-dto');
// const dto = require('../dto/dto')



router.get('/',home.home);
router.get('/users', users.users);
router.get('/user/:id', users.single_user);
router.post('/user', users.post_user);
router.put('/user', users.update_user);
router.use('/user/:id', users.delete_user);

module.exports = router ;