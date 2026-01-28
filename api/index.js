// api/index.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

import db from '../models/index.js';
const { sequelize } = db;
import logger from '../utils/logger.js';
import { errorHandler, notFoundHandler } from '../middleware/error-handler.js';
import * as Sentry from '@sentry/node';

// Inicializa Sentry (se configurado)
if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

// Verificação de variáveis obrigatórias
const requiredEnvVars = ['JWT_SECRET', 'JWT_REFRESH_SECRET'];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  logger.error(`Variáveis de ambiente obrigatórias não definidas: ${missingVars.join(', ')}`);
  process.exit(1);
}

const app = express();

// ========================================
//   CONFIGURAÇÃO CORS
// ========================================

// Lista de origens permitidas (via variável de ambiente)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Configuração dinâmica de CORS
const corsOptions = {
  origin(origin, callback) {
    // Permite requisições sem origin (Postman, mobile apps, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Verifica se a origin está na lista permitida
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Para desenvolvimento, permite localhost e IPs locais
    const isLocalDev =
      origin.includes('localhost') ||
      origin.match(/^http:\/\/192\.168\.\d+\.\d+/) ||
      origin.match(/^http:\/\/10\.\d+\.\d+\.\d+/) ||
      origin.match(/^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+/);

    if (process.env.NODE_ENV !== 'production' && isLocalDev) {
      logger.debug(`Permitindo origin de desenvolvimento: ${origin}`);
      return callback(null, true);
    }

    logger.warn(`Origin não permitida pelo CORS: ${origin}`);
    callback(new Error('Não permitido pelo CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

app.use(cors(corsOptions));

// ========================================
//   CONFIGURAÇÃO DE SEGURANÇA
// ========================================

app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========================================
//   MIDDLEWARE DE LOGGING
// ========================================

app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });

  next();
});

// ========================================
//   ROTAS DE SISTEMA
// ========================================

// Health check básico
app.get('/api/v1/ping', (req, res) => {
  res.status(200).json({
    pong: true,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health check com verificação de DB
app.get('/api/v1/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Health check failed:', error.message);
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Informações do servidor (desenvolvimento apenas)
app.get('/api/v1/server-info', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({
    server: 'ES Data Base API',
    version: '1.0.0',
    node: process.version,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ========================================
//   DOCUMENTAÇÃO SWAGGER
// ========================================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ES Data Base API',
      version: '1.0.0',
      description: 'API para gerenciamento de projetos, cards e assets',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:8000/api/v1',
        description: process.env.NODE_ENV === 'production' ? 'Produção' : 'Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./api/*.js', './api/auth/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'ES Data Base API Docs',
  })
);

// ========================================
//   CONEXÃO COM BANCO DE DADOS
// ========================================

(async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info('Conectado ao banco de dados via Sequelize');

    // Sincronização em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      logger.info('Banco de dados sincronizado (desenvolvimento)');
    }
  } catch (err) {
    logger.error(`Erro ao conectar com banco de dados: ${err.message}`);
    process.exit(1);
  }
})();

// ========================================
//   IMPORTAÇÃO DAS ROTAS
// ========================================

import authRouter from './auth/authRoutes.js';
import cardlistRouter from './cardlist.js';
import projectRouter from './project.js';
import categoriesHandler from './categories.js';
import searchHandler from './search.js';
import imageuploadRouter from './imageupload.js';
import directoryListRouter from './directorylist.js';

// Rotas para manipulação de diretórios/arquivos
import directoryContentRouter from './directorycontent.js';
import deleteContentRouter from './deletecontent.js';
import renameContentRouter from './renamecontent.js';
import createDirectoryRouter from './create-directory.js';

// ========================================
//   DEFINIÇÃO DAS ROTAS
// ========================================

// Rotas principais
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cards', cardlistRouter);
app.use('/api/v1/projects', projectRouter);

// Rotas de busca e categorias
app.get('/api/v1/categories', categoriesHandler);
app.get('/api/v1/search', searchHandler);

// Rotas de arquivos e upload
app.use('/api/v1/imageupload', imageuploadRouter);
app.use('/api/v1/directories', directoryListRouter);
app.use('/api/v1/directory-content', directoryContentRouter);
app.use('/api/v1/delete-content', deleteContentRouter);
app.use('/api/v1/rename-content', renameContentRouter);
app.use('/api/v1/create-directory', createDirectoryRouter);

// ========================================
//   TRATAMENTO DE ERROS
// ========================================

// Handler de erro do Sentry (se habilitado)
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Middleware para rotas não encontradas
app.use('*', notFoundHandler);

// Middleware global de tratamento de erros
app.use(errorHandler);

// ========================================
//   INICIALIZAÇÃO DO SERVIDOR
// ========================================

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  logger.info(`Servidor rodando em ${HOST}:${PORT}`);
  logger.info(`Documentação: http://localhost:${PORT}/api-docs`);
  logger.info(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
