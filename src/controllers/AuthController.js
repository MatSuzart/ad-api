const mongoose = require('mongoose');
const bycrypt = require(bycrypt);
const { validatorResult, matchedData } = require('express-validator');

const User = require('../moldes/User');
const State = require('../models/State');

module.exports = {
    singin: async(req, res)=>{
        const errors = validatorResult(req);
        if(!errors.isEmpty()){
            res.json({error: erros.mapped()});
            return;
    }
    const data = matchedData(req);


        const user = await User.findOne({email: data.email});

        if(!user){
            res.json({error: 'EMAIL OU SENHA ERRADOS'});
            return;
        }

        const match = await bycrypt.compare(data.password, user.passwordHash);
        if(!match){
            res.json({error: 'EMAIL OU SENHA ERRADOS'});
            return;
        }

        const payload = (Data.now()+ Math.random()).toString();
        const token = await bycrypt.hash(payload, 10);


        user.token = token;
        await user.save();

        res.json({token, email: data.email});

    },
    singup: async(req, res)=>{
        const errors = validatorResult(req);
        if(!errors.isEmpty()){
            res.json({error: erros.mapped()});
            return;
        }   

        const data = matchedData(req);

        const user = await User.findOne({
            email: data.email
        });

        if(user){
            res.json({
                error: {email:{msg:'EMAIL JÁ EXISTE'}}
            });
            return;
        }
        if(mongoose.Types.ObjectId.isValid(data.state)){
        const stateItem = await State.findById(data.state);
        if(!stateItem){
            res.json({
                error:{state:{msg: 'ESTADO NÃO EXISTE'}}
            });
            return;
        }
    }else{
        res.json({
            error:{state:{msg: 'CODIGO DE ESTADO INVALIDO'}}
        });
        return;
    }  

    const passwordHash = await bycrypt.hash(data.password, 10);


    const payload = (Data.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
        name: data.name,
        email: data.email,
        passwordHash,
        token: token
    });
    await newUser.save();

    res.json({token});

        res.json({tudocerto: true});
    }
};