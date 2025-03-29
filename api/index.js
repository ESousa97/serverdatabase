const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csrf = require('csurf');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();
const { sequelize } = require('../models');
const logger = require('../utils/logger');
const Sentry = require('@sentry/node');

// Inicializa o Sentry se a DSN estiver definida
if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  logger.error("JWT_SECRET and JWT_REFRESH_SECRET must be defined in environment variables.");
  process.exit(1);
}

const app = express();

// 1. Configurar CORS antes de qualquer outro middleware
app.use(cors({
  origin: [
    'https://esdatabase-projmanage.vercel.app',
    'https://esdatabasev2.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  optionsSuccessStatus: 200,
  // Opcional: Se quiser expor o cabeçalho do token CSRF:
  exposedHeaders: ['X-CSRF-Token']
}));

// 2. Outros middlewares de segurança e utilitários
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// 3. Inicializa o middleware CSRF (ele ignora métodos GET, HEAD e OPTIONS por padrão)
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// 4. Endpoint para disponibilizar o token CSRF
app.get('/api/v1/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Configuração do Swagger
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

// Conexão com o banco de dados
(async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info('Conectado ao banco via Sequelize');
  } catch (err) {
    logger.error(`Erro ao conectar: ${err}`);
  }
})();

// Rotas (todas versionadas em /api/v1)
const authRouter = require('./auth/authRoutes');
const cardlistRouter = require('./cardlist');
const projectRouter = require('./project');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cards', cardlistRouter);
app.use('/api/v1/projects', projectRouter);
app.get('/api/v1/categories', categoriesHandler);
app.get('/api/v1/search', searchHandler);

// Sentry error handler (caso ativado)
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err.stack);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Erro interno no servidor' : err.message;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
