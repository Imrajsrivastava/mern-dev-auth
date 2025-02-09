import { signupService } from "../services/user.service.js";

export const signupController=async(req,res)=>{
try {
    const {body}=req;
    const result = await signupService(body)
    res.status(201).json(result)
} catch (error) {
    res.status(500).json({message:error.message})
}
}