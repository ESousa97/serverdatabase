const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csrf = require('csurf');
require('dotenv').config();
const { sequelize } = require('../models');

// Verifica se as variáveis sensíveis estão definidas
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  console.error("JWT_SECRET and JWT_REFRESH_SECRET must be defined in environment variables.");
  process.exit(1);
}

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cookieParser());

// CSRF Protection: middleware que ignora métodos GET, HEAD e OPTIONS por padrão
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Endpoint para disponibilizar o token CSRF ao cliente
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Configuração de CORS
app.use(cors({
  origin: [
    'https://esdatabase-projmanage.vercel.app',
    'https://esdatabasev2.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Conexão com o banco de dados
(async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco via Sequelize');
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
})();

// Rotas
const authRouter = require('./auth/authRoutes');
const cardlistRouter = require('./cardlist');
const projectRouter = require('./project');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');

app.use('/api/auth', authRouter);
app.use('/api/cards', cardlistRouter);
app.use('/api/projects', projectRouter);
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);

// Middleware global para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Erro interno no servidor' : err.message;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
