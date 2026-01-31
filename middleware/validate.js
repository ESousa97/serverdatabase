// middleware/validate.js
// Middleware de validação usando express-validator

import { validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error.js';

/**
 * Middleware para processar resultados de validação
 * Deve ser usado após as regras de validação do express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value,
    }));

    return next(ApiError.validation('Erro de validação nos dados enviados', formattedErrors));
  }

  next();
};

export default validate;
