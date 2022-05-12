const express = require('express');
const router = express.Router();

const Auth = require('../middleware/Auth');
const AuthValidator = require('./validator/authValidator');

const AuthController = require('./controllers/AuthController');
const AdController = require('./controllers/AdController');
const UserController = require('./controllers/UserController');
const userValidator = require('./validator/userValidator');

router.get('/ping', (req,res)=> {
    res.json({pong: true});
});

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthVlidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.singup, AuthController.getStates);

router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me',userValidator.editAction, Auth.private, UserController.editAction);

router.get('/categories', AdController.getCategories);

router.get('/ad/add',Auth.private, AdController.addAction);
router.get('/ad/list', AdController.getList);
router.get('/ad/item', AdController.getItem);
router.get('/ad/:id', Auth.private, AdController.editAction);


module.exports = router;