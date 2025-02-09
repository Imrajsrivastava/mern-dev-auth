import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import logger from '../utils/logger.js';
import CustomError from '../utils/customError.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
        callbackURL: process.env.GOOGLE_CALLBACK_URL ,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            logger.info(`Google profile received: ${JSON.stringify(profile, null, 2)}`);

            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = await new User({
                    username: profile.displayName,
                    email: profile.emails?.[0]?.value,  
                    googleId: profile.id
                }).save();
                logger.info(`New user created: ${user._id}`);
            } else {
                logger.info(`Existing user found: ${user._id}`);
            }
            return done(null, user);
        } catch (err) {
            logger.error(`Google auth error: ${err.message}`);
            return done(new CustomError(500, "Internal Server Error"));
        }
    }
));

passport.serializeUser((user, done) => {
    logger.info(`Serializing user with ID: ${user._id}`);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            logger.warn(`User not found during deserialization: ${id}`);
            return done(new CustomError(404, "User not found"));
        }
        logger.info(`Deserialized user: ${user._id}`);
        done(null, user);
    } catch (err) {
        logger.error(`Error in deserialization: ${err.message}`);
        done(new CustomError(500, "Internal Server Error"));
    }
});
