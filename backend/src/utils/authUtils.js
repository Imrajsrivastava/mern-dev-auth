import jwt from 'jsonwebtoken';
import CustomError from './customError.js';
import dotenv from 'dotenv';
import logger from './logger.js';
dotenv.config();

export const generateToken = (id) => {
try {
    const accessToken = jwt.sign({id}, process.env.JWT_ACCESS_SECRET,{expiresIn: '15m'});
    const refreshToken = jwt.sign({id}, process.env.JWT_REFRESH_SECRET,{expiresIn: '7d'});
     logger.info(`Token generated for user: ${id}`);
    return {accessToken,refreshToken};
} catch (error) {
    logger.error("Token generation failed");
    throw new CustomError(500, "Token generation failed");
}
    
}