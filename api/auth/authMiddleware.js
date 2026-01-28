// api/auth/authMiddleware.js
// Re-exporta o middleware de autenticação centralizado

export {
  authenticateToken as default,
  authenticateToken,
  optionalAuth,
} from '../../middleware/auth.js';
