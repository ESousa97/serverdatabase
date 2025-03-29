// /api/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { sequelize } = require('../models');

// Importar as rotas que você quer
const authRouter = require('./auth/authRoutes');
const cardlistRouter = require('./cardlist');
const projectRouter = require('./project');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');

// Cria app
const app = express();
app.use(cookieParser());

// CORS geral
app.use(cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Conecta banco
(async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados via Sequelize');
  } catch (e) {
    console.error('Erro ao conectar ao banco:', e);
  }
})();

// **Registra rotas** 
app.use('/api/auth', authRouter);
app.use('/api/cards', cardlistRouter);
app.use('/api/projects', projectRouter);
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);

// Sobe o servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
