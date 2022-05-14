const User = require("../models/User");
const Category = require("../models/Category");
const Ad = require("../models/Ad");

module.exports = {
    getCategories: async (req, res)=>{
        const cats = await Category.find();

        let categories = [];

        for(let i in cats){
            categories.push({
                ...cats[i]._doc,
                img:`${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });


        }
        res.json({categories});
    },
    addAction: async(req, res)=>{
        let {title, price, priceng, desc, cat, token} = req.body;
        const user = await User.findOny({token: token}).exec();


        if(!title || !cat){
            res.json({error: 'TITULO OU CATEGORIA NÃO FORAM PREENCHIDOS'});
            return;
        }

        if(price){
            price = price.replace('.','').replace(',','.').replace('R$  ','');

            price = parseFloat(price);
        }else {
            price = 0;
        }

        const newAd = new Ad();
        newAd.status = true;
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.dateCreated = new Date();
        newAd.title = title;
        newAd.category = cat;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg=='true') ? true : false;
        newAd.description = desc;
        newAd.views = 0;

    },
    getItem: async (req, res)=>{

    },
    getAction: async (req, res)=>{

    },
};