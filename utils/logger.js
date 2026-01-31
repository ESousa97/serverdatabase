// utils/logger.js
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Captura stack trace para objetos de erro
    colorize(), // Adiciona cores nos logs (bom para desenvolvimento)
    logFormat
  ),
  transports: [
    new transports.Console(),
    // Caso precise, configure o transporte para arquivo:
    new transports.File({ filename: 'logs/server.log' }),
  ],
  exitOnError: false, // Não encerra o processo em caso de erro tratado
});

export default logger;
