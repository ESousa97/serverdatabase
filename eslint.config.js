// eslint.config.js
import js from '@eslint/js';
import nodePlugin from 'eslint-plugin-node';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      // Errors
      'no-console': 'off', // Permitido para backend logging
      'no-unused-vars': ['error', { argsIgnorePattern: '^_|next|req|res' }],
      'no-undef': 'error',

      // Best Practices
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Style (handled by Prettier, but some semantic rules)
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'prefer-arrow-callback': 'warn',

      // ES Modules
      'no-duplicate-imports': 'error',
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
  {
    ignores: ['node_modules/**', 'coverage/**', 'logs/**', '*.config.js', '.*.js'],
  },
];
