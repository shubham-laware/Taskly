import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const TOKEN_SECRET=process.env.TOKEN_SECRET;

function authToken(user){
    try {
        const payload={
            id:user._id
        }
    
        return jwt.sign(payload,TOKEN_SECRET);
    }
     catch (error) {
        console.log(error)
        return ;
    }
}

export {authToken};
   