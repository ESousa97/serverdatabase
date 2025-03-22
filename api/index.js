// /api/index.js
require('dotenv').config();

const app = require('./app');
const express = require('express');
// Importa explicitamente o arquivo de rotas dentro da pasta auth
const authRouter = require('./auth/authRoutes'); 
const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');
const projectRouter = require('./project');

const PORT = process.env.PORT || 8000;

app.use('/api/auth', authRouter);
app.use('/api/cards', cardlistHandler);
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);
app.use('/api/projects', projectRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
