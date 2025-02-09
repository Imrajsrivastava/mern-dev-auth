import express from 'express';
import passport from 'passport';    
import { signupController,loginController,googleAuth,googleCallback,logoutController } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.post('/signup',signupController);
userRouter.post('/login',loginController);
userRouter.get('/google',googleAuth);
userRouter.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);
userRouter.post('/logout',logoutController);


export default userRouter;