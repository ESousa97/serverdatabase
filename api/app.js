const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('../models');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://esdatabasev2.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

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