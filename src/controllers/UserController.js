const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const State = require('..models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');
const { default: mongoose } = require('mongoose');

module.exports = {
    getStates: async (req, res)=>{
        let states = await State.find();
        res.json({
            states
        });
    },
    info: async(req, res)=>{
        let token = req.query.token;

        const user = await User.findOne({token});
        const states = await State.findById(user.state);
        const ads = await Ad.find({idUser: user._id.toString()});


        let adList = [];
        for(let i in ads){
            const cat = await Category.findById(ads[i].category);
            adList.push({...ads[i], category: cat.slug});
            /*adList.push({
               id: ads[i]._id,
                states: ads[i].states,
                images: ads[i]._image,
                dateCreated: ads[i].dateCreated,
                title: ads[i].title,
                price: ads[i].price,
                priceNegotiable: ads[i].priceNegotiable,
                description: ads[i].description,
                views: ads[i].views,
                category:ads[i].cat.slug
            }); */
        }


            res.json({});
    },
    editAction: async (req, res)=>{
            const error = validationResult(req);
            if(!erros.isEmpty()){
                res.json({error: erros.mapped()});
                return;
            }
            const data = matchedData(req);

           // const user = await User.findOne({token: data.token});


            let updates = {}

            if(data.name){
                updates.name = data.name;
            }
            
            if(data.email){
                const emailCheck = await User.findOne({email: data.email});
                if(emailCheck){
                    res.json({error: 'EMAIL EXISTENTE'});
                }
                updates.email = data.email;
            }

            if(data.state){
                if(mongoose.Types.ObjectId.isValid(data.state)){
                const stateCheck = await State.findById(data.state);
                if(!stateCheck){
                    res.json({error: 'ESTADO NÃO EXISTE'});
                }
                updates.state = data.state;

                }else{
                    res.json({error: 'CODIGO DE ESTADO INEXISTENTE'});
                }
            }


            if(data.password){
                updates.passwordHash = await bcrypt.hash(data.password, 10);
            }

            await User.findOneAndUpdate({token: data.token}, {set: updates})
            
            res.json({});      
    }
};