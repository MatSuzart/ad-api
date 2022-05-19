const uuid = require('uuid');
const jimp = require('jimp');

const User = require("../models/User");
const Category = require("../models/Category");
const Ad = require("../models/Ad");
//const { quality } = require('jimp');

const addImage = async(buffer)=>{
    let newName = `${uuid()}.jpg`;
    let tmpImg = await jimp.read(buffer);
    tmpImg.cover(500,500).quality(80).write(`./public/media/${newName}`); //diminuir a imagem


}


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


        if(req.files && req.files.img){
            if(req.files.img.length == undefined){
                if(['image/jpeg','image/jpg','image/png'].includes(req.files.img.minetype)){
                let url = await addImage(req.files.imag.data);
                newAd.images.push({
                    url,
                    default: false

                    });
                }
            }else {
                for(let i=0; i<req.files.img.length; i++){
                    if(['image/jpeg','image/jpg','image/png'].includes(req.files.img[i].minetype)){
                        let url = await addImage(req.files.imag[i].data);
                        newAd.images.push({
                            url,
                            default: false
        
                        }); 
                    }
                }
            }
        }

        if(newAd.images.length >0){
            newAd.images[0].default = true;
        }


        const info = await newAd.save();
        res.json({id:info._id});

    },
    getItem: async (req, res)=>{

    },
    getAction: async (req, res)=>{

    },
};