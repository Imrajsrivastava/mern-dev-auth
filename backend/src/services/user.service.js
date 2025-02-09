import { User } from "../model/user.model";
import CustomError from "../utils/customError";

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