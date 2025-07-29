// api/index.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csrf from 'csurf';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();
import db from '../models/index.js';
const { sequelize } = db;
import logger from '../utils/logger.js';
import * as Sentry from '@sentry/node';

// Inicializa Sentry (se configurado)
if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

// Verificação de variáveis obrigatórias
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  logger.error("JWT_SECRET and JWT_REFRESH_SECRET must be defined in environment variables.");
  process.exit(1);
}

const app = express();

// ========================================
//   CONFIGURAÇÃO CORS PARA VITE
// ========================================

// Lista de origens permitidas para desenvolvimento e produção
const allowedOrigins = [
  // URLs de produção
  'http://adicione-aqui-sua-url-de-producao.com',
  
  // URLs de desenvolvimento local
  'http://adicione-aqui-sua-url-de-desenvolvimento.com',
  
  // IPs locais da rede (ajuste conforme necessário)
  'http://adicione-aqui-seu-ip-local:8000',
];

// Configuração dinâmica de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem origin (Postman, mobile apps, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Verifica se a origin está na lista permitida
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Para desenvolvimento, permite qualquer localhost
      const isLocalhost = origin.includes('localhost') || 
                         origin.includes('adicione-inicio-do-ip') ||
                         origin.includes('adicione-inicio-do-ip') ||
                         origin.includes('adicione-inicio-do-ip');
      
      if (process.env.NODE_ENV !== 'production' && isLocalhost) {
        logger.info(`Permitindo origin de desenvolvimento: ${origin}`);
        callback(null, true);
      } else {
        logger.warn(`Origin não permitida: ${origin}`);
        callback(new Error('Não permitido pelo CORS'), false);
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-CSRF-Token', 
    'X-XSRF-TOKEN',
    'Accept',
    'Origin',
    'X-Requested-With'
  ],
  exposedHeaders: ['X-CSRF-Token', 'Set-Cookie'],
  optionsSuccessStatus: 200, // Para suporte a navegadores legados
  preflightContinue: false
};

app.use(cors(corsOptions));

// ========================================
//  CONFIGURAÇÃO DE SEGURANÇA
// ========================================

// Helmet configurado para desenvolvimento
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: false
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========================================
//  CONFIGURAÇÃO CSRF
// ========================================

// CSRF configurado (com exceções)
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 3600000 // 1 hora
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
});

// Aplicar CSRF globalmente primeiro
app.use(csrfProtection);

// Middleware de logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - Origin: ${req.get('Origin') || 'No Origin'}`);
  next();
});

// ========================================
//   ROTAS DE SISTEMA
// ========================================

// Rota para obter token CSRF
app.get('/api/v1/csrf-token', (req, res) => {
  try {
    // Verificar se req.csrfToken está disponível
    if (typeof req.csrfToken !== 'function') {
      logger.error('CSRF middleware não inicializado corretamente');
      return res.status(500).json({ 
        error: 'CSRF não configurado',
        message: 'Token CSRF não disponível' 
      });
    }
    
    const token = req.csrfToken();
    logger.info(`CSRF Token gerado: ${token.substring(0, 10)}...`);
    res.json({ 
      csrfToken: token,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao gerar CSRF token:', error);
    res.status(500).json({ 
      error: 'Erro ao gerar token CSRF',
      message: error.message 
    });
  }
});

// Rota de health check
app.get('/api/v1/ping', (req, res) => {
  res.status(200).json({ 
    pong: true, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota para informações do servidor (desenvolvimento)
app.get('/api/v1/server-info', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }
  
  res.json({
    server: 'Projmanage API',
    version: '1.0.0',
    node: process.version,
    environment: process.env.NODE_ENV,
    cors: {
      allowedOrigins: allowedOrigins,
      currentOrigin: req.get('Origin')
    },
    timestamp: new Date().toISOString()
  });
});

// ========================================
//   DOCUMENTAÇÃO SWAGGER
// ========================================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projmanage API',
      version: '1.0.0',
      description: 'API para gerenciamento de projetos e cards',
      contact: {
        name: 'Suporte API',
        email: 'suporte@projmanage.com'
      }
    },
    servers: [
      { 
        url: process.env.BASE_URL || 'http://localhost:8000/api/v1',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        csrfToken: {
          type: 'apiKey',
          in: 'header',
          name: 'X-CSRF-Token'
        }
      }
    },
    security: [
      { bearerAuth: [] },
      { csrfToken: [] }
    ]
  },
  apis: ['./api/*.js', './api/auth/*.js']
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Projmanage API Docs'
}));

// ========================================
//   CONEXÃO COM BANCO DE DADOS
// ========================================

(async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info('Conectado ao banco via Sequelize');
    
    // Sincronização em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      logger.info('Banco sincronizado (desenvolvimento)');
    }
  } catch (err) {
    logger.error(`❌ Erro ao conectar com banco: ${err.message}`);
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
// TRATAMENTO DE ERROS
// ========================================

// Handler de erro do Sentry (se habilitado)
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  logger.warn(` Rota não encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: 'Rota não encontrada',
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(`💥 Erro na aplicação: ${err.stack}`);
  
  // Erro de CORS
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      error: 'Erro de CORS',
      message: 'Origin não permitida',
      origin: req.get('Origin')
    });
  }
  
  // Erro de CSRF
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: 'Token CSRF inválido',
      message: 'Obtenha um novo token CSRF'
    });
  }
  
  // Erro genérico
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Erro interno no servidor'
    : err.message;
    
  res.status(status).json({ 
    error: message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  logger.info(`Servidor rodando em ${HOST}:${PORT}`);
  logger.info(`Documentação: http://localhost:${PORT}/api-docs`);
  logger.info(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`CORS configurado para: ${allowedOrigins.length} origens`);
});
