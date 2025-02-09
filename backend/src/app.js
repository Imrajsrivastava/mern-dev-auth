import express from 'express';
import logger from './utils/logger.js';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import { USER_ROUTE } from './config/constantRoute.js';
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL,  
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
  optionsSuccessStatus: 204,  
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  logger.debug(`${req.method} request received at ${req.path}`);
  next();
});

app.use(USER_ROUTE,userRouter)

app.get('/', (req, res) => {
    logger.debug('GET request received at /'); 
    logger.info('Sending response from / endpoint'); 
    res.send('Hello World');
  });
  
  app.use((err, req, res, next) => {
    logger.error(`Error occurred: ${err.message}`); 
    res.status(500).send('Something went wrong!');
  });


  app.use(errorMiddleware)