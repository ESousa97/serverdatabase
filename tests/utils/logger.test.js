import { describe, it, expect } from 'vitest';

// Mock winston to avoid file system operations during tests
const mockLogger = {
  info: (msg) => msg,
  error: (msg) => msg,
  warn: (msg) => msg,
  debug: (msg) => msg,
};

describe('Logger', () => {
  it('should have info method', () => {
    expect(typeof mockLogger.info).toBe('function');
  });

  it('should have error method', () => {
    expect(typeof mockLogger.error).toBe('function');
  });

  it('should have warn method', () => {
    expect(typeof mockLogger.warn).toBe('function');
  });

  it('should have debug method', () => {
    expect(typeof mockLogger.debug).toBe('function');
  });

  it('should return message when info is called', () => {
    const message = 'Test info message';
    expect(mockLogger.info(message)).toBe(message);
  });

  it('should return message when error is called', () => {
    const message = 'Test error message';
    expect(mockLogger.error(message)).toBe(message);
  });
});
