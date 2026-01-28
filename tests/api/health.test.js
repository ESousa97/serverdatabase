import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../api/index.js';

describe('Health Check Endpoint', () => {
  it('should return expected response structure', async () => {
    const response = await request(app).get('/api/v1/ping');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('environment');
  });

  it('should have valid ISO timestamp', async () => {
    const response = await request(app).get('/api/v1/ping');

    const date = new Date(response.body.timestamp);
    expect(date.toISOString()).toBe(response.body.timestamp);
  });
});

describe('CSRF Token Endpoint', () => {
  it('should return expected response structure', async () => {
    const response = await request(app).get('/api/v1/csrf-token');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('csrfToken');
    expect(response.body).toHaveProperty('timestamp');
    expect(typeof response.body.csrfToken).toBe('string');
    expect(response.body.csrfToken.length).toBeGreaterThan(0);
  });
});
