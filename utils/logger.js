const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  // Se houver stack, exibe-o; caso contrário, exibe a mensagem
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
    // Descomente e configure o transporte para arquivo se necessário:
    new transports.File({ filename: 'logs/server.log' })
  ],
  exitOnError: false, // Não encerra o processo em caso de erro tratado
});

module.exports = logger;
