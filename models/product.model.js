import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["clothing", "jewelry", "home", "food", "other"],
  },
   image:{
    type:String,
    required:true
  },
    description: {
    type: String,
  },
  isFavorite:{
    type:Boolean,
    default:false
  },
  sellerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})
export const Product = mongoose.model("Product",ProductSchema)