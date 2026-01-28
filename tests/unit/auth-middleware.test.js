// tests/unit/auth-middleware.test.js
import jwt from 'jsonwebtoken';
import { authenticateToken, optionalAuth } from '../../middleware/auth.js';

// Mock do logger
jest.mock('../../utils/logger.js', () => ({
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('Auth Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('authenticateToken', () => {
    it('should call next with error when no authorization header', () => {
      authenticateToken(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error.statusCode).toBe(401);
    });

    it('should call next with error when token format is invalid', () => {
      mockReq.headers.authorization = 'InvalidFormat token123';

      authenticateToken(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error.statusCode).toBe(401);
    });

    it('should call next with error for invalid token', () => {
      mockReq.headers.authorization = 'Bearer invalid-token';

      authenticateToken(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error.statusCode).toBe(403);
    });

    it('should set req.user and call next for valid token', () => {
      const payload = { id: 1 };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      mockReq.headers.authorization = `Bearer ${token}`;

      authenticateToken(mockReq, mockRes, mockNext);

      expect(mockReq.user).toBeDefined();
      expect(mockReq.user.id).toBe(1);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should call next with error for expired token', () => {
      const payload = { id: 1 };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '-1s' });
      mockReq.headers.authorization = `Bearer ${token}`;

      authenticateToken(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Token expirado');
    });
  });

  describe('optionalAuth', () => {
    it('should call next without setting user when no authorization', () => {
      optionalAuth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toBeUndefined();
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should call next without setting user for invalid format', () => {
      mockReq.headers.authorization = 'Invalid format';

      optionalAuth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toBeUndefined();
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should set user for valid token', () => {
      const payload = { id: 1 };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      mockReq.headers.authorization = `Bearer ${token}`;

      optionalAuth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toBeDefined();
      expect(mockReq.user.id).toBe(1);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should not set user for invalid token but still call next', () => {
      mockReq.headers.authorization = 'Bearer invalid-token';

      optionalAuth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toBeUndefined();
      expect(mockNext).toHaveBeenCalledWith();
    });
  });
});
