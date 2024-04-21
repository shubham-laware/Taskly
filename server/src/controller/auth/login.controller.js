import { User } from "../../db/model/User.model.js";
import bcrypt from 'bcrypt';
import { authToken } from "../../utils/authToken.js";


async function Login(req,res){
    try {

        const {email,password}=req.body;

    const user=await User.findOne({email:email});

    if(!user){
        return res.status(404).json({ msg: "SignUp to continue" });
    }


    bcrypt.compare(password,user.confirmedPassword).then((isPasswordMatched)=>{
        if (!isPasswordMatched) {
            return res.status(401).json({ msg: "Wrong password" });
          }
          const token=  authToken(user);
        //   console.log(token)
           res.cookie('authToken',token);
          return res.status(200).json({ msg: "Login successful" });
    })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({msg:'Internal Server Error'})
    }
    
}

export default Login;