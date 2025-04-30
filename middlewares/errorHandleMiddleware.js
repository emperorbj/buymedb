export const errorHandleMiddleware = async (error,request,response,next)=>{
    console.log(error);
    return response.status(500).json({message:"something went wrong",error});
}