require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRouter = require('./src/routes');

mongoose.connect(process.env.DATABASE,{
    useNewUrlParse: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.log("ERROR",error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'/public'));

server.get('/ping', (req, res)=> {
    res.json({pong:true});
});

server.use('/', apiRouter);

server.listen(process.env.PORT, () =>{
    console.log(`RODANDO NO ENDEREÇO: ${process.env.BASE}`)
});