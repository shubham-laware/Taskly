import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema =new Schema({
    fullName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    confirmedPassword:{
        type:String,
        required:true
    },

    tasks:[{
        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        assignDate:{
            type:String,
            required:true
        },

        dueDate:{
            type:String,
            required:true,
        },

        isCompleted:{
            type:Boolean,
            default:false
        }
        
    }]


},{timestamps:true});


userSchema.pre("save",async function (next){
    try {
        if(!this.isModified("confirmedPassword")) return next();
    const hashedPassword=await bcrypt.hash(this.confirmedPassword,10)
    this.confirmedPassword=hashedPassword;
    } catch (error) {
        console.log(error)
    }
    next();
    
});

export const User=mongoose.model("User",userSchema)
