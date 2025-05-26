import express from 'express';
import{ 
addCart,
getCart,
getCartItemDetails,
removeItemFromCart,
clearCart
} from '../controller/cartController.js';
import { verifyToken } from '../middlewares/verifyToken.js';



const router = express.Router();

router.post('/',verifyToken, addCart)
router.get('/',verifyToken, getCart)
router.get('/:id',verifyToken,getCartItemDetails)
router.delete('/:id',verifyToken,removeItemFromCart)
router.delete('/',verifyToken,clearCart)


export default router;