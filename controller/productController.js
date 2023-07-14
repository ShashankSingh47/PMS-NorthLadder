const ProductModel = require('../models/product');

//Add a new Product 
const addNewProduct = async (req, res) => {
    let errorvar =0 ;
    let prodarr =[];
    try {
    let arr = []
    if(!(Array.isArray(req.body))){
        arr.push(req.body)
        console.log("here",arr)
        }
    else{
        arr = req.body
        console.log(arr)
    }
   
    for(let i=0; i<arr.length;i++){
        if(!(req.body[i].productName) || !(req.body[i].productDescription) || !(req.body[i].price)  || !(req.body[i].stockQuantity) || !(req.body[i].category)  ){
            errorvar = i+1
            throw("Please Validate product at")
        }else{
        
            let product = {
                id: req.body[i].id,
                productName: req.body[i].productName,
                productDescription: req.body[i].productDescription,
                price: req.body[i].price,
                stockQuantity: req.body[i].stockQuantity,
                category: req.body[i].category,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
           
            prodarr.push(product)
        }}
            let input = await ProductModel.insertMany(prodarr);
            res.status(200).send(input);
            
        } catch (err) {
            if(errorvar){
                res.status(400).send(err.message);
            }
            res.status(500).send(err.message);
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