const Category = require('../models/categoryModel');
//const Products = require('../models/productModel');

const categoryController = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    createCategory: async (req, res) =>{
        try {
            const {name} = req.body;
            const category = await Category.findOne({where: {name: name}});

            if(category){
                return res.status(400).json({msg: "A categoria já existe!"});
            }

            const newCategory = await Category.create({name});

            await newCategory.save();

            res.json({msg: "Categoria criada com sucesso!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            await Category.destroy({where: {id: req.params.id}});

            res.json({msg: "Categoria deletada."});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            console.log(name, req.params.id);
            
            await Category.update({name: name}, {where: {id: req.params.id}});

            res.json({msg: "Categoria atualizada!"});
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = categoryController;