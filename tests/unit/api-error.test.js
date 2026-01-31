// tests/unit/api-error.test.js
import { describe, it, expect } from 'vitest';
import { ApiError } from '../../utils/api-error.js';

describe('ApiError', () => {
  describe('constructor', () => {
    it('should create an error with status code and message', () => {
      const error = new ApiError(400, 'Bad Request');

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad Request');
      expect(error.isOperational).toBe(true);
      expect(error).toBeInstanceOf(Error);
    });

    it('should include details when provided', () => {
      const details = { field: 'email', issue: 'invalid format' };
      const error = new ApiError(422, 'Validation Error', details);

      expect(error.details).toEqual(details);
    });
  });

  describe('static methods', () => {
    it('badRequest should create 400 error', () => {
      const error = ApiError.badRequest('Invalid input');

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid input');
    });

    it('unauthorized should create 401 error', () => {
      const error = ApiError.unauthorized();

      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Não autorizado');
    });

    it('forbidden should create 403 error', () => {
      const error = ApiError.forbidden('Access denied');

      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Access denied');
    });

    it('notFound should create 404 error with resource name', () => {
      const error = ApiError.notFound('User');

      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('User não encontrado');
    });

    it('conflict should create 409 error', () => {
      const error = ApiError.conflict('Email already exists');

      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('Email already exists');
    });

    it('validation should create 422 error with details', () => {
      const details = [{ field: 'email', message: 'Invalid' }];
      const error = ApiError.validation('Validation failed', details);

      expect(error.statusCode).toBe(422);
      expect(error.details).toEqual(details);
    });

    it('tooManyRequests should create 429 error', () => {
      const error = ApiError.tooManyRequests();

      expect(error.statusCode).toBe(429);
    });

    it('internal should create 500 error', () => {
      const error = ApiError.internal('Server error');

      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Server error');
    });
  });

  describe('toJSON', () => {
    it('should return proper JSON structure', () => {
      const error = new ApiError(400, 'Bad Request', { field: 'test' });
      const json = error.toJSON();

      expect(json.error).toBe('Bad Request');
      expect(json.statusCode).toBe(400);
      expect(json.details).toEqual({ field: 'test' });
      expect(json.timestamp).toBeDefined();
    });

    it('should not include details if not provided', () => {
      const error = new ApiError(400, 'Bad Request');
      const json = error.toJSON();

      expect(json.details).toBeUndefined();
    });
  });
});
