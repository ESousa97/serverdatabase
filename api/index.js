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

// CORS configurado
app.use(cors({
  origin: [
    'https://esdatabase-projmanage.vercel.app',
    'https://esdatabasev2.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-XSRF-TOKEN'],
  optionsSuccessStatus: 200,
  exposedHeaders: ['X-CSRF-Token']
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// CSRF configurado (exceto para login)
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  }
});

app.use((req, res, next) => {
  if (req.path === '/api/v1/auth/login') {
    return next();
  }
  return csrfProtection(req, res, next);
});

app.get('/api/v1/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get('/api/v1/ping', (req, res) => {
  res.status(200).json({ pong: true });
});

// Swagger docs
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API ES Data Base',
      version: '1.0.0',
      description: 'Documentação da API'
    },
    servers: [
      { url: process.env.BASE_URL || 'http://localhost:8000/api/v1' }
    ],
  },
  apis: ['./api/*.js', './api/auth/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Conexão com banco de dados
(async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info('Conectado ao banco via Sequelize');
  } catch (err) {
    logger.error(`Erro ao conectar: ${err}`);
  }
})();

// Importação das rotas
import authRouter from './auth/authRoutes.js';
import cardlistRouter from './cardlist.js';
import projectRouter from './project.js';
import categoriesHandler from './categories.js';
import searchHandler from './search.js';
import imageuploadRouter from './imageupload.js';
import directoryListRouter from './directorylist.js';

// Novas rotas para manipulação de diretórios/arquivos
import directoryContentRouter from './directorycontent.js';
import deleteContentRouter from './deletecontent.js';
import renameContentRouter from './renamecontent.js';
import createDirectoryRouter from './create-directory.js';

// Definição das rotas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cards', cardlistRouter);
app.use('/api/v1/projects', projectRouter);
app.get('/api/v1/categories', categoriesHandler);
app.get('/api/v1/search', searchHandler);
app.use('/api/v1/imageupload', imageuploadRouter);
app.use('/api/v1/directories', directoryListRouter);

// Novas rotas adicionadas
app.use('/api/v1/directory-content', directoryContentRouter);
app.use('/api/v1/delete-content', deleteContentRouter);
app.use('/api/v1/rename-content', renameContentRouter);
app.use('/api/v1/create-directory', createDirectoryRouter);

// Handler de erro do Sentry (se habilitado)
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err.stack);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Erro interno no servidor'
    : err.message;
  res.status(status).json({ message });
});

// Inicialização do servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
