const { validatorResult, matchedData } = require('express-validator');
module.exports = {
    singin: async(req, res)=>{

    },
    singup: async(req, res)=>{
        const errors = validatorResult(req);
        if(!errors.isEmpty()){
            res.json({error: erros.mapped()});
            return;
        }   

        res.json({tudocerto: true});
    }
};