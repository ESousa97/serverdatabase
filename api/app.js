const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('../models');

const app = express();

app.use(cors());
app.use(express.json()); // Adiciona o middleware para parse de JSON

// Testa a conexão via Sequelize
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
