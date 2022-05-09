const mongoose = require('mongoose');
const { validatorResult, matchedData } = require('express-validator');

const User = require('../moldes/User');
const State = require('../models/State');

module.exports = {
    singin: async(req, res)=>{

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



        res.json({tudocerto: true});
    }
};