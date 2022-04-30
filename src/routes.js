const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/AuthController');
const AdController = require('./controllers/AdController');
const UserController = require('./controllers/UserController');

router.get('/ping', (req,res)=> {
    res.json({pong: true});
});

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthController.signin);
router.post('/user/signup', AuthController.getStates);

router.get('/user/me', UserController.info);
router.put('/user/me', UserController.editAction);

router.get('/categories', AdController.getCategories);

router.get('/ad/add', AdController.addAction);
router.get('/ad/list', AdController.getList);
router.get('/ad/item', AdController.getItem);
router.get('/ad/:id', AdController.editAction);


module.exports = router;