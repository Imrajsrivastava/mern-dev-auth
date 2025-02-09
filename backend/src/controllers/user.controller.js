import { signupService ,loginService} from "../services/user.service.js";
import { generateToken } from "../utils/authUtils.js";
import logger from "../utils/logger.js";
export const signupController=async(req,res)=>{
try {
    const {body}=req;
    const result = await signupService(body)
    res.status(201).json(result)
} catch (error) {
    res.status(500).json({message:error.message})
}
}

export const loginController=async(req,res)=>{
    try {
        const {body}=req;
        const result = await loginService(body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    }

export const googleAuth=(req,res)=>{
    try {
        logger.info("Google login controller called");
        res.send("Redirecting to Google...")
    } catch (error) {
        logger.error(`Google login error: ${error.message}`);
        res.status(500).json({message:error.message})
    }
}

export const googleCallback=(req,res)=>{
    try {
        const user = req.user;
        const {accessToken,refreshToken}=generateToken(user._id);
        res.cookie("accessToken",accessToken,{httpOnly:true});
        res.cookie("refreshToken",refreshToken,{httpOnly:true});
        res.redirect(process.env.FRONTEND_URL);
        logger.info(`User logged in with Google: ${user.email}`);
    } catch (error) {
        logger.error(`Google callback error: ${error.message}`);
        res.status(500).json({message:error.message})
        
    }
}

export const logoutController=(req,res)=>{
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.send("Logged out successfully")
        logger.info("User logged out")
    } catch (error) {
        logger.error(`Logout error: ${error.message}`);
        res.status(500).json({message:error.message})
    }
}
