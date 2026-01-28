import { describe, it, expect, vi } from 'vitest';

vi.mock('winston', () => {
  const mockLogger = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  };

  return {
    createLogger: vi.fn(() => mockLogger),
    format: {
      combine: vi.fn(),
      timestamp: vi.fn(),
      printf: vi.fn(),
      errors: vi.fn(),
      colorize: vi.fn(),
    },
    transports: {
      Console: vi.fn(),
      File: vi.fn(),
    },
  };
});

import logger from '../../utils/logger.js';
import { createLogger } from 'winston';

describe('Logger', () => {
  it('should have info method', () => {
    expect(typeof logger.info).toBe('function');
  });

  it('should have error method', () => {
    expect(typeof logger.error).toBe('function');
  });

  it('should have warn method', () => {
    expect(typeof logger.warn).toBe('function');
  });

  it('should have debug method', () => {
    expect(typeof logger.debug).toBe('function');
  });

  it('should return message when info is called', () => {
    const message = 'Test info message';
    logger.info(message);
    expect(logger.info).toHaveBeenCalledWith(message);
  });

  it('should return message when error is called', () => {
    const message = 'Test error message';
    logger.error(message);
    expect(logger.error).toHaveBeenCalledWith(message);
  });

  it('should create logger using winston', () => {
    expect(createLogger).toHaveBeenCalled();
  });
});
