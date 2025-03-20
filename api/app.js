const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('../models');

const app = express();

app.use(cors());
app.use(express.json());

// Testa a conexão via Sequelize e sincroniza os modelos (opcional)
// Se estiver utilizando migrations, o sync() não é obrigatório
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados via Sequelize');
    // await sequelize.sync(); // Descomente se desejar sincronizar os modelos automaticamente
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

connectToDatabase();

module.exports = app;
