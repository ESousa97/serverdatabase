// middleware/auth.js
// Middleware de autenticação JWT (ES Modules)

import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/api-error.js';
import logger from '../utils/logger.js';

/**
 * Middleware para autenticação via JWT Bearer Token
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn('Tentativa de acesso sem token de autenticação');
    return next(ApiError.unauthorized('Token de autenticação não fornecido'));
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    logger.warn('Formato de token inválido');
    return next(ApiError.unauthorized('Formato de token inválido. Use: Bearer <token>'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.warn(`Token inválido ou expirado: ${err.message}`);

      if (err.name === 'TokenExpiredError') {
        return next(ApiError.unauthorized('Token expirado'));
      }

      return next(ApiError.forbidden('Token inválido'));
    }

    req.user = decoded;
    next();
  });
};

/**
 * Middleware opcional de autenticação
 * Não falha se não houver token, apenas popula req.user se houver
 */
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.user = decoded;
    }
    next();
  });
};

export default authenticateToken;
