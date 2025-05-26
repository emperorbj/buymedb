import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";

export const addCart = async (request,response) =>  {
    const {productId,quantity} = request.body
try{
     const user = await User.findById(request.user._id)
          if(!user || user.role !== 'buyer'){
            return response.status(403).json({message:'only buyers can add to cart'})
          }

    const product = await Product.findById(productId)
    if(!product){
        return response.status(401).json({message:"product not found so cannot add to cart"})
    }

    if(!quantity || quantity < 1) {
        return response.status(409).json({message:"product must be at least one"})
    }

    let cart = await Cart.findOne({userId:request.user._id})
    if(!cart){
        cart = new Cart({userId:request.user._id,items:[]})
    }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
    if(itemIndex > -1){
        cart.items[itemIndex].quantity += quantity
    }
    else{
        cart.items.push({productId,quantity})
    }

    cart.createdAt = Date.now()
    await cart.save()
    const populatedCart = await Cart.findById(cart._id)
    .populate("items.productId", "name price image category")

    return response.status(200).json({
        populatedCart
    })
}catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }

}



export const getCart = async (request,response) => {
    try{
    const user = await User.findById(request.user._id)
    if(!user || user.role !== "buyer"){
        return response.status(403).json({message:"only buyers can view the cart"})
    }

    const cartItems = await Cart.findOne({userId:request.user._id})
    .populate("items.productId", "name price image category")
    if(!cartItems){
        return response.status(401).json({message:"cart not found"})
    }

    return response.status(200).json({
        cartItems
    })
}catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
}


export const getCartItemDetails = async (request,response) => {
    const id = request.params.id
    try{
    const user = await User.findById(request.user._id)
    if(!user || user.role !== "buyer"){
        return response.status(403).json({
            message:"only buyers are allowed to check cart details"
        })
    }

    const cartItem = await Product.findById(id)
    if(!cartItem){
        return response.status(403).json({
            message:"cart details cannot be found"
        })
    }

    return response.status(200).json({
        cartItem
    })
}catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
}


export const removeItemFromCart = async (request,response) => {
    const id = request.params.id
    try {
    const user = await User.findById(request.user._id);
    if (!user || user.role !== 'buyer') {
      return response.status(403).json({ success: false, message: 'Only buyers can remove from cart' });
    }

    const cart = await Cart.findOne({ userId: request.user._id });
    if (!cart) {
      return response.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === id);
    if (itemIndex === -1) {
      return response.status(404).json({ success: false, message: 'Product not in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId', 'name price images');

    return response.status(200).json({
      success: true,
      message:"one item removed from cart",
       populatedCart
      
    });
  } catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
}

export const clearCart = async (request,response) => {
try {
    
    const user = await User.findById(request.user._id);
    if (!user || user.role !== 'buyer') {
      return response.status(403).json({ success: false, message: 'Only buyers can clear cart' });
    }

    const cart = await Cart.findOne({ userId: request.user._id });
    if (!cart) {
      return response.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    return response.status(200).json({
      message:"all cart cleared"
    });
  } catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
}