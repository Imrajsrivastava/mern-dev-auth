import { User } from "../model/user.model";
import { generateToken } from "../utils/authUtils.js";
import CustomError from "../utils/customError.js";

export const signupService=async(body)=>{
    try {
        const {username,email,password}=body;
        if (!username || !email || !password) {
            throw new CustomError(400, "Username, email, and password are required");
        }

        const user= await User.findOne({email});
        if(user){
            throw new CustomError(409, "User already exists");
        }
        const newUser=new User(body);
        await newUser.save();
        logger.info(`New user created: ${email}`);
        return {message:"User created successfully"}
    } catch (error) {
        logger.error(`Signup error: ${error.message}`);
        throw new CustomError(error.status || 500, error.message || "Internal Server Error");    }
}

export const loginService=async(body)=>{
    try {
        const {email,password}=body;
        if (!email || !password) {
            throw new CustomError(400, "Email and password are required");
        }
        const user=await User.findOne({email});
        if(!user){
            throw new CustomError(404, "User not found");
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            throw new CustomError(401, "Invalid credentials");
        }
        const {accessToken,refreshToken}=generateToken(user._id);
        res.cookies("accessToken",accessToken,{httpOnly:true});
        res.cookies("refreshToken",refreshToken,{httpOnly:true}); 
        logger.info(`User logged in: ${email}`);
        return {message:"User logged in successfully"}
    } catch (error) {
        logger.error(`Login error: ${error.message}`);
        throw new CustomError(error.status || 500, error.message || "Internal Server Error");    

    }
}