import {User} from "../models/user.model.js"
import {StatusCodes} from "http-status-codes"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/getToken.js"





export const register = async (request,response)=>{
	const {email,password,role,name,phone,address} = request.body;
  try{
  	if(!email || !password || !name || !role || !phone || !address){
		return response.status(StatusCodes.NO_CONTENT).json({message:"all fields are required"})
    }

	const userExists = await User.findOne({email})

	if(userExists){
		return response.status(StatusCodes.CONFLICT).json({message:"user already exists"})
	}

	const hashedPassword = await bcrypt.hash(password,10)

	const user = new User({
		email,
		password:hashedPassword,
		name,
		role,
		phone,
		address
	})

	await user.save()

	generateToken(user._id)

  	return response.status(StatusCodes.CREATED).json({success:true,message:"user registered successfully"})
  }catch(error){
  	return response.status(500).json({message:"something went wrong",error:error.message}) 
  }
}




export const login = async (request,response)=>{
	const {email,password} = request.body
try{
	if(!email || !password) {
  return response.status(400).json({message:"all fields are required"})
  }
  
  const user = await User.findOne({email})
  if(!user){
  return response.status(409).json({message:"user does not exist or wrong email"})
  }
  
  const verifyPassword = await bcrypt.compare(password,user.password)
  
  if(!verifyPassword){
		return response.status(400).json({message:"password is invalid"})
	  }
  
  generateToken(user._id)
  await user.save()
  return response.status(200).json({success:true,message:"successfully logged in"})
}catch(error){
	return response.status(500).json({success:false,message:error.message})
}
}