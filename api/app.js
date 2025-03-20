// /api/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('../models');

const app = express();

// Configuração global do CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://esdatabasev2.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

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
