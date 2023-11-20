import winston from 'winston';
import expressWinston from 'express-winston';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logPath = join(__dirname, '..', 'logs');

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: join(logPath, 'request.log') })],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: join(logPath, 'error.log') })],
  format: winston.format.json(),
});

export { requestLogger, errorLogger };
