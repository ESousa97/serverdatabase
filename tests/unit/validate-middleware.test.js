// tests/unit/validate-middleware.test.js
import { validate } from '../../middleware/validate.js';
import { validationResult } from 'express-validator';

// Mock do express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('Validate Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should call next when no validation errors', () => {
    validationResult.mockReturnValue({
      isEmpty: () => true,
      array: () => [],
    });

    validate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
  });

  it('should call next with ApiError when validation fails', () => {
    const errors = [
      { path: 'email', msg: 'Invalid email', value: 'invalid' },
      { path: 'password', msg: 'Too short', value: '123' },
    ];

    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => errors,
    });

    validate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    const error = mockNext.mock.calls[0][0];
    expect(error.statusCode).toBe(422);
    expect(error.details).toHaveLength(2);
    expect(error.details[0].field).toBe('email');
    expect(error.details[0].message).toBe('Invalid email');
  });

  it('should format error details correctly', () => {
    const errors = [{ param: 'titulo', msg: 'Required', value: undefined }];

    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => errors,
    });

    validate(mockReq, mockRes, mockNext);

    const error = mockNext.mock.calls[0][0];
    expect(error.details[0]).toEqual({
      field: 'titulo',
      message: 'Required',
      value: undefined,
    });
  });
});
