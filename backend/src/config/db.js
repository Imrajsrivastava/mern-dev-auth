
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';
dotenv.config();

if(!process.env.MONGO_URI){
    logger.error("MONGO_URI is not defined in environment variables");
    process.exit(1);
}

export const connectionDb= async() =>{
    const retryAttempts=5;
    let attempts=0;
    while(attempts<retryAttempts){
        try {
            await mongoose.connect(process.env.MONGO_URI,{
                maxPoolsize:20,
                serverSelectionTimeoutMS:5000,
                socketTimeoutMS:45000

            })
            logger.info("Connected to the database successfully");
            return;

        } catch (error) {
            attempts++;
            logger.error(`Database connection attempt ${attempts} failed: ${error.message}`,{stack:error.stack});
            if(attempts<retryAttempts){
                logger.info(`Retrying to connect to the database... Attempt ${attempts + 1}`);
                await new Promise((resolve)=>setTimeout(resolve,5000));
            }else{
                logger.error("All database connection attempts failed. Exiting application...");
                process.exit(1);
            }
            
        }
    }
}