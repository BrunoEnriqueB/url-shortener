import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'debug', // Set the default log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
    new transports.File({ filename: 'logs/combined.log' }) // Combined logs
  ]
});

export default logger;
