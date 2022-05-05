const { checkSchema } = require('express-validator');

module.exports = {
    singup: checkSchema({
        name: {
            trim: true,
            isLenght: {
                options: { min: 2}
            },
            errorMessage: 'NOME PRECISA TER PELO MENOS 2 CARACTERES'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-EMAIL INVALIDADO'
        },
        password:{
            isLenght: {
                options: { min: 2 }
            },
            errorMessage: 'SENHA PRECISA TER PELO MENOS 2 CARACTERES'
        },
        state: {
            notEmpty: true,
            errorMessage: 'ESTADO NÃO PREENCHIDO'
        }
    })
};