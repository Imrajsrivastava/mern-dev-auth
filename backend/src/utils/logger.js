import winston from 'winston';

const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug'; 
const logger = winston.createLogger({
  level: logLevel, 
  format: winston.format.combine(
    winston.format.colorize(), 
    winston.format.timestamp(), 
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`; 
    })
  ),
  transports: [
    new winston.transports.Console(),

    ...(process.env.NODE_ENV === 'production' 
      ? [new winston.transports.File({ filename: 'logs/app.log' })] 
      : []),
  ],
});

export default logger;
