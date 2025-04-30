import jwt from 'jsonwebtoken'

export const verifyToken = (request,response,next) =>{
	const token = request.cookies.token
  if(!token){
   return response.status(404).json({success:false,message:'unauthorized, there is no token'})
  }
  
  try{
  	const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    if(!decoded){
    	return response.status(409).json({success:false,message:'unauthorized, wrong token'})
    }
    
    request.userId = decoded.userId
    
    next()
  }catch(error){
  	return response.status(500).json({success:false,message:error.message})
  }
}