import mongoose from "mongoose";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
const {Schema}=mongoose;
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        // required:[true,"Password is required"],
        minlength:6
    },
    googleId:{
        type:String,
    
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    try {
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
        logger.info("Password hashed successfully");
        next();
    } catch (error) {
        logger.error("Error hashing password");
        next(error);
    }
})

userSchema.methods.comparePassword=async function(enteredPassword){
    try {
        return await bcrypt.compare(enteredPassword,this.password)
    } catch (error) {
        logger.error("Error comparing password");
    }
}
 const User = mongoose.model("User",userSchema);
 export default User;