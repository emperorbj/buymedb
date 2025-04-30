import {Product} from "../models/product.model.js";
import {StatusCodes} from "http-status-codes"


// add new products here
export const addProducts = async (request,response)=> {
    const {name,price,company} = request.body;

    try {
        const products = new Product({
            name:name,
            price:price,
            company:company
        })
    
        await products.save()
        return response.status(StatusCodes.CREATED).json({products})
    } catch (error) {
        return response.status(StatusCodes.BAD_REQUEST).json({success:false,message:error.message})
        
    }
    
}


// get all products here

export const getAllProducts = async (request,response)=> {
    const {search,featured,company,name,price, page=1,limit=3} = request.query;
    try {
        const queryObject = {};

        if(featured){
            queryObject.featured = featured === 'true' ? true : false;
        }

        if(company){
            queryObject.company = {$regex:company,$options:'i'};
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
        const products = await Product.find(queryObject).skip(skip).limit(parseInt(limit)).sort('createdAt');

        const totalProducts = await Product.countDocuments(queryObject);
        const currentPage = parseInt(page);
        const numOfPages = Math.ceil(totalProducts/limit);

    return response.status(StatusCodes.OK).json({ success:true ,totalProducts,numOfPages,currentPage,products})
    } catch (error) {
        return response.status(500).json({success:false,message:error.message})
        
    }
    
}




export const getSingleProduct = async (request,response)=> {
	const id = request.params.id
  try{
  	const product = await Product.findById(id)
    if(product){
				return response.status(200).json({success:true,product})
  	}
    
   response.status(401).json({success:false, message:'product not found'})
  }catch(error){
  	return response.status(404).json({success:false,message:error.message})
  }
}


export const deleteProduct = async(request,response)=>{
	const id = request.params.id
  try{
  	const product = await Product.findByIdAndDelete(id)
    if(!product) {
				return response.status(404).json({success:false, message:'product not found'})
  	}
    
    return response.status(200).json({success:true,message:'product deleted successfully'})
  }catch(error){
  	return response.status(500).json({success:false,message:error.message})
  	}
}


export const updateProduct = async (request,response)=> {
	const id = request.params.id
	try{
  	const product = await Product.findByIdAndUpdate(id,request.body)
    if(!product){
		return response.status(404).json({success:false,message:'product not found'})
  	}

    const updatedProduct = await Product.findById(id)
    return response.status(200).json({success:true,updatedProduct})
    
  	}catch(error){
	return response.status(500).json({success:false,message:error.message})
  }
}