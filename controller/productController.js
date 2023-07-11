const ProductModel = require('../models/product');

//Add a new Product 
const addNewProduct = async (req, res) => {
    try {
        let product = {
            id: req.body.id,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            category: req.body.category,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        let input = await ProductModel.create(product);
        res.status(200).send(input);
    } catch (err) {
        res.status(500).send(err);
    }
}

//Update an existing product
const updateProduct = async (req, res) => {
    try {
        if (req.params.id) {
            let product = await ProductModel.findOne({ id: req.params.id });
            let result = await ProductModel.findOneAndUpdate({ id: req.params.id }, {
                $set: req.body
            }, { new: true });
            res.status(200).send(result);
        }
        else {
            res.status(400).send("Please provide Product ID")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

//Delete a Product
const deleteProduct = async (req, res) => {
    try {
        if (req.params.id) {
            let result = await ProductModel.deleteOne({ id: req.params.id });
            res.status(200).send(result);
        } else {
            res.status(400).send("Please provide a ID")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

//Retreive a Product by its ID 
const getProductById = async (req, res) => {
    try {
        if (req.params.id) {
            let product = await ProductModel.findOne({ id: req.params.id });
            if (!product || product === {})
                return res.status(404).send("Product not Found");
            res.status(200).send(product);
        } else {
            res.status(400).send("Please provide a ID")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

//List all products
const listProducts = async (req, res) => {
    try {
        let product = await ProductModel.find({});
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = { addNewProduct, updateProduct, deleteProduct, getProductById, listProducts }