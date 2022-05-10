const State = require('..models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

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
        
    }
};