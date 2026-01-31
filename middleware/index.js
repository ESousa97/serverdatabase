// middleware/index.js
// Exportação centralizada dos middlewares

export { authenticateToken, optionalAuth } from './auth.js';
export { errorHandler, notFoundHandler } from './error-handler.js';
export { validate } from './validate.js';
