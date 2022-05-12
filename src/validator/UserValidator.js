
const { checkSchema } = require('express-validator');

module.exports = {
    editAction: checkSchema({
        token: {

        },
        name: {
            optional:true,
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
            optional: true,
            notEmpty: true,
            errorMessage: 'ESTADO NÃO PREENCHIDO'
        }
    }),

};