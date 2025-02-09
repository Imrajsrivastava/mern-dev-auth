import express from 'express';
import { signupController } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.get('/signup',signupController)

export default userRouter