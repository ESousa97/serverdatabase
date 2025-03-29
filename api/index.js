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

// Configura CORS
app.use(cors({
  origin: (origin, callback) => {
    // Se não tiver origem (ex: Postman), libera
    if (!origin) return callback(null, true);
    // Senão, reflete a origem recebida
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // Se você quiser retornar 200 ao invés de 204 no preflight
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

// Exporta com serverless-http (não usamos app.listen no Vercel)
module.exports = serverless(app);
