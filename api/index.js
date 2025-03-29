// /api/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { sequelize } = require('../models');

const authRouter = require('./auth/authRoutes');
const cardlistRouter = require('./cardlist');
const projectRouter = require('./project');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Conexão com o banco
(async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados via Sequelize');
  } catch (e) {
    console.error('Erro ao conectar ao banco:', e);
  }
})();

// Suas rotas
app.use('/api/auth', authRouter);
app.use('/api/cards', cardlistRouter);
app.use('/api/projects', projectRouter);
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);

// Aqui NÃO chamamos app.listen(...)!
// Em vez disso, simplesmente exportamos o app:
module.exports = app;
