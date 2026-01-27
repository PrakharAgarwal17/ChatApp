import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export async function isloggedIn(req,res,next){
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({message:"Unauthorised user"})
        }
        const check=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findOne({_id:check.id})
        if(!user){
            return res.status(400).json({message:"User not found"})
        } 
        req.userId=user._id
        console.log(req.userId)
        next()
    }catch(err){
         return res.status(500).json({message:err})
    } 
} 