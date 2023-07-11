const express = require('express');
const productController = require('../controller/productController');
const router = new express.Router();

router.post('/product', productController.addNewProduct);
router.patch('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);
router.get('/product/:id', productController.getProductById);
router.get('/product', productController.listProducts);

module.exports = router;