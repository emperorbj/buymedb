import jwt from 'jsonwebtoken'
export const generateToken = (response,userId)=> {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'30d'})
      response.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'None',
        maxAge:30*24*60*60*1000
      })

      
      return token
}
