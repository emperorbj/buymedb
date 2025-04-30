import express from 'express';
import { 
    addProducts,
    getAllProducts,
    getSingleProduct,deleteProduct,updateProduct } from '../controller/productController.js';

import { verifyToken } from '../middlewares/verifyToken.js';


const router = express.Router();

router.post('/', verifyToken, addProducts)
router.get('/', getAllProducts)

router.get('/:id',getSingleProduct)
router.delete('/:id', verifyToken,deleteProduct)
router.put('/:id',verifyToken,updateProduct)


export default router;