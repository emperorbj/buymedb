import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const verifyToken = async (request,response,next) =>{
  try{
	const authHeader = request.header("Authorization")
  if(!authHeader){
    return response.status(401).json({message:"invalid authorization"})
  }

  const token = authHeader.replace("Bearer ", "")
  if(!token){
   return response.status(404).json({success:false,message:'unauthorized, there is no token'})
  }
  
  
  	const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    if(!decoded){
    	return response.status(409).json({success:false,message:'unauthorized, wrong token'})
    }
    
     const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return response.status(401).json({ success: false, message: "User not found" });
    }

    // Attach user to request object
    request.user = user;
    next()
  }
   catch (error) {
    console.log("Error in verifying token", error);
    response.status(500).json({ success: false, message: `Error in verifying token: ${error.message}` });
  }
}