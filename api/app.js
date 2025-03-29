// /api/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('../models');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Se você quiser literalmente liberar geral, sem checar origem:
app.use(cors({
  origin: '*',
  credentials: true,  // Se estiver usando cookies, browsers podem barrar a combinação '*' + credentials.
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

module.exports = app;
