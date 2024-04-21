import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../db/model/User.model.js';

dotenv.config();
const TOKEN_SECRET=process.env.TOKEN_SECRET;

const Authenticate= async(req,res,next)=>{
    // console.log(req)
    try {
        const token= await req.cookies.authToken;
        // console.log('token',token)

    if(!token){
        return res.status(401).json({msg:"Unauthorized User"});
    }

    const decode=jwt.verify(token,TOKEN_SECRET);

    const user= await User.findById(decode.id);

    if(!user){
        return res.status(401).json({msg:"Unauthorized User"});
    }

    req.user=user;

    next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}


export default Authenticate;