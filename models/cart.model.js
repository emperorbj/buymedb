import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique:true
    },
    items:[
        {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true,
        },
        quantity:{
            type:Number,
            min:1,
            default:1
        }
    },
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export const Cart = mongoose.model("Cart",CartSchema)