import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter a product name']
    },
    price:{
        type:Number,
        required:[true,'please enter a product price']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

    company:{
        type:String,
        enum:{
            values:['apple','samsung','nokia','oneplus'],
            message:'{VALUE} is not supported'
        }
    }
})

export const Product = mongoose.model('Product',productSchema);