const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: String,
    description: String,
    views: Number,
    statues: String

});

const modelName = 'Ad';

if(mongoose.connection && mongoose.connection.models[modelName]){
    models.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}