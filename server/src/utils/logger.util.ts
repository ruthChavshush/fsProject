import winston from 'winston';
import 'winston-daily-rotate-file';

// Define custom settings for each transport (file, console)
const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  dirname: './logs',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
});

const consoleTransport = new winston.transports.Console({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

// Define the logger configuration
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    fileTransport,
    consoleTransport,
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: './logs/rejections.log' }),
  ],
});

// Export the logger to use in other files
export default logger;
