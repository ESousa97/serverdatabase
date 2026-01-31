import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

import db from '../models/index.js';
import logger from '../utils/logger.js';
import * as Sentry from '@sentry/node';

const { sequelize } = db;

// Initialize Sentry if configured
if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'JWT_REFRESH_SECRET'];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// ========================================
//   CORS CONFIGURATION
// ========================================

const parseAllowedOrigins = () => {
  const envOrigins = process.env.CORS_ORIGINS;
  if (!envOrigins) {
    return ['http://localhost:3000', 'http://localhost:5173'];
  }
  return envOrigins.split(',').map((origin) => origin.trim());
};

const allowedOrigins = parseAllowedOrigins();

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow localhost in development
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    if (!isProduction && isLocalhost) {
      logger.info(`Allowing development origin: ${origin}`);
      return callback(null, true);
    }

    logger.warn(`Origin not allowed by CORS: ${origin}`);
    callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-CSRF-Token',
    'Accept',
    'Origin',
    'X-Requested-With',
  ],
  exposedHeaders: ['X-CSRF-Token'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ========================================
//   SECURITY CONFIGURATION
// ========================================

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========================================
//   CSRF PROTECTION (csrf-csrf)
// ========================================

const csrfSecret = process.env.CSRF_SECRET || process.env.JWT_SECRET;

const csrfCookieSameSite = (
  process.env.CSRF_COOKIE_SAMESITE || (isProduction ? 'none' : 'lax')
).toLowerCase();
const csrfCookieSecure = csrfCookieSameSite === 'none' ? true : isProduction;

const csrfProtection = doubleCsrf({
  getSecret: () => csrfSecret,
  cookieName: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    secure: csrfCookieSecure,
    sameSite: csrfCookieSameSite,
    path: '/',
    maxAge: 3600000, // 1 hour
  },
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
});

const generateToken = csrfProtection.generateToken;
const doubleCsrfProtection = csrfProtection.doubleCsrfProtection;

// Routes that don't need CSRF protection
const csrfExemptRoutes = [
  '/api/v1/ping',
  '/api/v1/csrf-token',
  '/api-docs',
  '/api/v1/auth/login',
  '/api/v1/auth/refresh',
  '/api/v1/auth/logout',
];

const conditionalCsrf = (req, res, next) => {
  // Skip CSRF for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip CSRF for exempt routes
  if (csrfExemptRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }

  return doubleCsrfProtection(req, res, next);
};

app.use(conditionalCsrf);

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - Origin: ${req.get('Origin') || 'none'}`);
  next();
});

// ========================================
//   SYSTEM ROUTES
// ========================================

// Get CSRF token
app.get('/api/v1/csrf-token', (req, res) => {
  try {
    const token = generateToken(req, res);
    res.json({
      csrfToken: token,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error generating CSRF token:', error);
    res.status(500).json({
      error: 'Failed to generate CSRF token',
      message: error.message,
    });
  }
});

// Health check
app.get('/api/v1/ping', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Server info (development only)
app.get('/api/v1/server-info', (req, res) => {
  if (isProduction) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json({
    name: 'ES Database API',
    version: '1.1.0',
    node: process.version,
    environment: process.env.NODE_ENV || 'development',
    allowedOrigins,
    timestamp: new Date().toISOString(),
  });
});

// ========================================
//   SWAGGER DOCUMENTATION
// ========================================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ES Database API',
      version: '1.1.0',
      description: 'API for managing projects, cards, and digital assets',
      contact: {
        name: 'API Support',
        url: 'https://github.com/ESousa97/serverdatabase',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:8000',
        description: isProduction ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        csrfToken: {
          type: 'apiKey',
          in: 'header',
          name: 'X-CSRF-Token',
        },
      },
    },
    security: [{ bearerAuth: [] }, { csrfToken: [] }],
  },
  apis: ['./api/*.js', './api/auth/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'ES Database API Docs',
  })
);

// ========================================
//   DATABASE CONNECTION
// ========================================

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected via Sequelize');

    if (!isProduction) {
      await sequelize.sync({ alter: true });
      logger.info('Database synchronized (development mode)');
    }
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

connectDatabase();

// ========================================
//   ROUTE IMPORTS
// ========================================

import authRouter from './auth/authRoutes.js';
import cardlistRouter from './cardlist.js';
import projectRouter from './project.js';
import categoriesHandler from './categories.js';
import searchHandler from './search.js';
import imageuploadRouter from './imageupload.js';
import directoryListRouter from './directorylist.js';
import directoryContentRouter from './directorycontent.js';
import deleteContentRouter from './deletecontent.js';
import renameContentRouter from './renamecontent.js';
import createDirectoryRouter from './create-directory.js';

// ========================================
//   ROUTE DEFINITIONS
// ========================================

// Core routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cards', cardlistRouter);
app.use('/api/v1/projects', projectRouter);

// Utility routes
app.get('/api/v1/categories', categoriesHandler);
app.get('/api/v1/search', searchHandler);

// File management routes
app.use('/api/v1/imageupload', imageuploadRouter);
app.use('/api/v1/directories', directoryListRouter);
app.use('/api/v1/directory-content', directoryContentRouter);
app.use('/api/v1/delete-content', deleteContentRouter);
app.use('/api/v1/rename-content', renameContentRouter);
app.use('/api/v1/create-directory', createDirectoryRouter);

// ========================================
//   ERROR HANDLING
// ========================================

// Sentry error handler
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// 404 handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, _next) => {
  logger.error(`Application error: ${err.message}`, { stack: err.stack });

  // CORS error
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      error: 'CORS error',
      message: 'Origin not allowed',
      origin: req.get('Origin'),
    });
  }

  // CSRF error
  if (err.code === 'EBADCSRFTOKEN' || err.message.includes('csrf')) {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      message: 'Please obtain a new CSRF token from /api/v1/csrf-token',
    });
  }

  // Generic error
  const statusCode = err.status || err.statusCode || 500;
  const message = isProduction ? 'Internal server error' : err.message;

  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    ...(isProduction ? {} : { stack: err.stack }),
  });
});

// ========================================
//   SERVER STARTUP
// ========================================

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, HOST, () => {
    logger.info(`Server running on ${HOST}:${PORT}`);
    logger.info(`Documentation: http://localhost:${PORT}/api-docs`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
