// /api/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('../models');
const cookieParser = require('cookie-parser');

// Importe as rotas que você já tem
const authRouter = require('./auth/authRoutes');
const cardlistRouter = require('./cardlist');
const projectRouter = require('./project');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');

const app = express();

app.use(cookieParser());

// Libera CORS para qualquer origem — se você precisa de cookies
// em produção, talvez seja necessário especificar origin dinamicamente, mas teste primeiro:
app.use(cors({
  origin: '*',
  credentials: true,  // Se usar cookies, alguns browsers não permitem '*' + credentials.
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Conexão com o banco
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados via Sequelize');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

connectToDatabase();

// **Aqui** você registra todas as rotas “filhas” do seu app:
app.use('/api/auth', authRouter);           // /api/auth/...
app.use('/api/cards', cardlistRouter);      // /api/cards/...
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);
app.use('/api/projects', projectRouter);    // /api/projects/...

module.exports = app;
