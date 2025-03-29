const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { sequelize } = require('../models');
const serverless = require('serverless-http');

// Importar rotas
const authRouter = require('./auth/authRoutes');
const cardlistRouter = require('./cardlist');
const projectRouter = require('./project');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');

// Cria app Express
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Conecta no banco (assíncrono)
(async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco via Sequelize');
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
})();

// Suas rotas
app.use('/api/auth', authRouter);
app.use('/api/cards', cardlistRouter);
app.use('/api/projects', projectRouter);
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);

// NÃO faça app.listen(...).
// Em vez disso, exporte com serverless-http:
module.exports = serverless(app);
