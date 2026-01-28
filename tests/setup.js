// tests/setup.js
// Configuração global para testes

import dotenv from 'dotenv';

// Carrega variáveis de ambiente de teste
dotenv.config({ path: '.env.test' });

// Configura variáveis padrão para testes
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-purposes';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-for-testing-purposes';
process.env.LOG_LEVEL = 'error'; // Silencia logs durante testes

// Timeout global para testes
jest.setTimeout(10000);

// Limpa mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
