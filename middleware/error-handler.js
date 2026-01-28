// middleware/error-handler.js
// Middleware centralizado para tratamento de erros

import logger from '../utils/logger.js';
import { ApiError } from '../utils/api-error.js';

/**
 * Middleware para rotas não encontradas
 */
export const notFoundHandler = (req, res, next) => {
  logger.warn(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Rota não encontrada',
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Middleware global de tratamento de erros
 */
export const errorHandler = (err, req, res, next) => {
  logger.error(`Erro na aplicação: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Erro de CORS
  if (err.message?.includes('CORS')) {
    return res.status(403).json({
      error: 'Erro de CORS',
      message: 'Origin não permitida',
      origin: req.get('Origin'),
      timestamp: new Date().toISOString(),
    });
  }

  // Erro de CSRF
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: 'Token CSRF inválido',
      message: 'Obtenha um novo token CSRF em /api/v1/csrf-token',
      timestamp: new Date().toISOString(),
    });
  }

  // Erro de validação do express-validator
  if (err.array && typeof err.array === 'function') {
    return res.status(422).json({
      error: 'Erro de validação',
      details: err.array(),
      timestamp: new Date().toISOString(),
    });
  }

  // Erro operacional conhecido (ApiError)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Erro do Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(422).json({
      error: 'Erro de validação do banco de dados',
      details: err.errors?.map((e) => e.message),
      timestamp: new Date().toISOString(),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Registro duplicado',
      details: err.errors?.map((e) => e.message),
      timestamp: new Date().toISOString(),
    });
  }

  // Erro genérico
  const statusCode = err.statusCode || err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Erro interno no servidor' : err.message;

  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

export default { notFoundHandler, errorHandler };
