import express from 'express';
import { connectionDb } from './config/db.js';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5008;

let server;

const shutdown = (signal) => {
  logger.info(`Received ${signal}. Closing HTTP server and cleaning up resources...`);
  mongoose.connection.close(() => {
    logger.info('Database connection closed.');
  });
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

const startServer = async () => {
  try {
    await connectionDb();
    
    server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to connect to the database. Exiting...', error);
    process.exit(1); 
  }
};

startServer();
