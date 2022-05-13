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

    },
    getItem: async (req, res)=>{

    },
    getAction: async (req, res)=>{

    },
};