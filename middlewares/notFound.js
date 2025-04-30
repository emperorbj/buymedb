export const notFound = async (request,response)=>{
    return response.status(404).send("Route not found");
}