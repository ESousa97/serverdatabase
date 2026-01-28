import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

describe('Authentication Utilities', () => {
  const JWT_SECRET = 'test-secret';

  describe('JWT Token', () => {
    it('should generate a valid JWT token', () => {
      const payload = { userId: 1, email: 'test@example.com' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should verify a valid JWT token', () => {
      const payload = { userId: 1, email: 'test@example.com' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

      const decoded = jwt.verify(token, JWT_SECRET);

      expect(decoded.userId).toBe(1);
      expect(decoded.email).toBe('test@example.com');
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        jwt.verify('invalid-token', JWT_SECRET);
      }).toThrow();
    });

    it('should throw error for expired token', () => {
      const payload = { userId: 1 };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '-1s' });

      expect(() => {
        jwt.verify(token, JWT_SECRET);
      }).toThrow();
    });
  });

  describe('Password Hashing', () => {
    it('should hash a password', async () => {
      const password = 'securePassword123';
      const hash = await bcrypt.hash(password, 10);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(password.length);
    });

    it('should verify correct password', async () => {
      const password = 'securePassword123';
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare(password, hash);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'securePassword123';
      const wrongPassword = 'wrongPassword';
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare(wrongPassword, hash);
      expect(isValid).toBe(false);
    });
  });
});
