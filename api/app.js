// /api/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('../models');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Configure as origens permitidas a partir do .env ou use um array fixo
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [
      'http://localhost:3000',
      'http://localhost:8000',
      'https://esdatabasev2.vercel.app'
    ];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origem (ex.: ferramentas como curl ou Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
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
