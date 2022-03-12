const Products = require('../models/productModel');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    };

    async filtering() {
        const queryObj = { ...this.queryString }; //queryString = req.query
        //console.log({before: queryObj});

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete (queryObj[el]));

        //console.log({after: queryObj});
        let queryStr = JSON.stringify(queryObj);
        console.log({queryObj, queryStr});

        let test1 = JSON.parse(queryStr);
        //console.log(test1);
        const regex = /\b(gte|gt|lt|lte|regex)\b/g;
        queryStr = queryStr.replace(regex, match => '$' + match);

        this.query = await Products.findAll({where: test1});

        return this;
    };

    sorting(query) {
        this.queryString = query
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy);
        }

        return this;
    };

    async paginating(query) {
        //this.query = await Products.findAll();
        this.queryString = query;
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 15;
        const skiping = (page - 1) * limit;
        this.query = await Products.findAll({offset: skiping, limit: limit});

        return this;
    };
}

const productController = {
    getProducts: async (req, res) => {
        try {
            const features = await (await new APIfeatures(Products.findAll(), req.query).filtering()).sorting(req.query).paginating(req.query);

            const products = await features.query;

            res.json({
                status: 'success',
                result: products.length,
                products: products
            });

        }catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;

            if (!images) {
                return res.status(400).json({ msg: "Nenhuma imagem enviada." });
            }

            const product = await Products.findOne({ where: { product_id } });
            if (product) {
                return res.status(400).json({ msg: "Produto já existente." });
            }
            const newProduct = await Products.create({ product_id, title: title.toLowerCase(), price, description, content, images, category });

            await newProduct.save();
            res.json({ msg: "Produto criado com sucesso!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.destroy({ where: { id: req.params.id } });
            res.json({ msg: "Produto deletado." });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;
            if (!images) {
                return res.status(400).json({ msg: "Nenhuma imagem enviada." });
            }

            await Products.update({ title: title.toLowerCase(), price, description, content, images, category }, { where: { id: req.params.id } });

            res.json({ msg: "Produto atualizado com sucesso." });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = productController;