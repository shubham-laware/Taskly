import { User } from "../../db/model/User.model.js";

async function SignUp(req,res){

    try {
        const userData=req.body;

        const email= await User.findOne({email:userData.email})
         if(email){
          return res.status(400).json({msg:'User with email already exists'})
         };
    
         const newUser=new User(userData);
         newUser.save();
    
         return res.status(201).json({msg:'User registered successfully'}) ; 
    } catch (error) {
        res.status(500).json({msg:'Error registering user'})
    }
   

}

export default SignUp;