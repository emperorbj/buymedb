import {Product} from "../models/product.model.js";
import {StatusCodes} from "http-status-codes"
import { GoogleGenAI } from "@google/genai";
import cloudinary from "../lib/cloudinary.js";
import { User } from "../models/user.model.js";
import dotenv from 'dotenv'
dotenv.config()


// Initialize Gemini API
const genAI = new GoogleGenAI({apiKey:`${process.env.GEMINI_API_KEY}`});

const generateDescription = async (name, category) => {
  try {
        const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a professional copywriter for ecommerce industries generate a powerful,
     engaging product description for a ${category} category item named "${name}" that will hook customers make the concise. do not provide me 
     with options just give me a single response`,
  });
  return response.text;
}           
  catch (error) {
    console.error('Gemini API error:', error.message);
    return `A high-quality ${category} item named ${name}.`;
  }
};



export const addProducts = async (request,response)=> {
    const {name,price,category,image} = request.body;
    try {

      const user = await User.findById(request.user._id)
      if(!user || user.role !== 'seller'){
        return response.status(403).json({message:'only sellers can add products'})
      }
      console.log(request.body)
      if(!name || !price || !category || !image){
        return response.status(401).json({message:'all the fields are required'})
      }

      const uploadResponse = await cloudinary.uploader.upload(image)
      const imageURL = uploadResponse.secure_url

      const description = await generateDescription(name,category)


        const products = new Product({
            name,
            price,
            category,
            image:imageURL,
            description,
            sellerId:request.user._id
        })
    
        await products.save()
        return response.status(StatusCodes.CREATED).json({products})
    } catch (error) {
        return response.status(StatusCodes.BAD_REQUEST).json({success:false,message:error.message})
        
    }
    
}


// get all products here

export const getAllProducts = async (request,response)=> {
    const {search,category,name,price, page=1,limit=10} = request.query;
    try {
        const queryObject = {};
        if(category){
            queryObject.category = {$regex:category,$options:'i'};
        }

        if(name){
            queryObject.name = {$regex:name,$options:'i'};
        }

        if(price){
            queryObject.price = price; 
        }

        if(search){
            queryObject.name = {$regex:search,$options:'i'};
        }


        const skip = (parseInt(page)-1)*parseInt(limit);   
        const products = await Product.find(queryObject)
        .populate("sellerId","name phone email")
        .skip(skip)
        .limit(parseInt(limit))
        .sort('createdAt');

        const totalProducts = await Product.countDocuments(queryObject);
        const currentPage = parseInt(page);
        const numOfPages = Math.ceil(totalProducts/limit);

    return response.status(StatusCodes.OK).json({ success:true ,totalProducts,numOfPages,currentPage,products})
    } catch (error) {
        return response.status(500).json({success:false,message:error.message})
        
    }
    
}


export const updateProduct = async (request,response)=> {
    const id = request.params.id
    try{
        const product = await Product.findByIdAndUpdate(id,{$set:request.body},{new:true})

        if(!product){
            return response.status(404).json({message:"product not found"})
        }

        return response.status(200).json({
            success:true,
            product
        })
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}




export const deleteProduct = async (request,response)=>{
    const id = request.params.id
    try{
        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return response.status(404).json({message:"product not found to be deleted"})
        }

        return response.status(200).json({message:"product deleted successfully"})
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}




export const getSingleProduct = async (request,response)=>{
    const id = request.params.id
    try{
        const product = await Product.findById(id)

        if(!product){
            return response.status(404).json({message:"product not found"})
        }

        return response.status(200).json({message:"success",product})
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}

