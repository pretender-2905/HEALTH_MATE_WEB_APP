import sendResponse from "../helpers/sendResponse.js"
import jwt from "jsonwebtoken";
import User from "../Models/User.js";



export default async function authenticateUser(req,res,next){
   try{
    console.log("req.headers.authorization", req.headers.authorization)
   const bearerToken = req.headers.authorization
   if(bearerToken) return sendResponse(res, 409, null, true, "Token not provided")
   const token = bearerToken.split(" ")[1]
   const decoded = jwt.verify(token, process.env.AUTH_SECRET)
   if(decoded){
    console.log("decoded=> ", decoded)  
    const user = await User.findById(decoded._id)
    if(!user) return sendResponse(res, 404, null, true, "User not found!")
    req.user = decoded
    next()
   }else{
        return sendResponse(res, 403, null, true, "Token not verified")
   }
   }catch(error){
    sendResponse(res, 500, null, true, error.message)
   }

}