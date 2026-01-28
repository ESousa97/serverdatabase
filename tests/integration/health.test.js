// tests/integration/health.test.js
// import request from 'supertest'; // TODO: Descomentar quando app for exportado

// Este teste requer que o app seja exportado
// Por enquanto, é um placeholder para testes de integração futuros

describe('Health Endpoints', () => {
  describe('GET /api/v1/ping', () => {
    it.todo('should return pong response');
  });

  describe('GET /api/v1/health', () => {
    it.todo('should return healthy status when database is connected');
    it.todo('should return unhealthy status when database is disconnected');
  });
});

describe('API Endpoints', () => {
  describe('Projects', () => {
    it.todo('GET /api/v1/projects should return list of projects');
    it.todo('POST /api/v1/projects should create a new project');
    it.todo('GET /api/v1/projects/:id should return a project');
    it.todo('PUT /api/v1/projects/:id should update a project');
    it.todo('DELETE /api/v1/projects/:id should delete a project');
  });

  describe('Cards', () => {
    it.todo('GET /api/v1/cards should return list of cards');
    it.todo('POST /api/v1/cards should create a new card');
  });

  describe('Auth', () => {
    it.todo('POST /api/v1/auth/login should return access token');
    it.todo('POST /api/v1/auth/refresh should return new access token');
    it.todo('POST /api/v1/auth/logout should clear refresh token cookie');
  });
});
