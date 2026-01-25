import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['api/**/*.js', 'services/**/*.js', 'utils/**/*.js'],
      exclude: ['node_modules/', 'tests/', 'coverage/', 'migrations/', 'seeders/'],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
