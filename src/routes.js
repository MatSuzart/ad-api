const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/AuthController');
const AdController = require('./controllers/AdController');
const UserController = require('./controllers/UserController');

router.get('/ping', (req,res)=> {
    res.json({pong: true});
});

module.exports = router;