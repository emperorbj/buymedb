const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const { getProducts, getSingleProduct, createProduct, deleteProduct, updateProduct } = require('../controller/product.controller')

router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.post('/', createProduct);
router.delete('/:id',deleteProduct);
router.put('/:id',updateProduct)



module.exports = router;