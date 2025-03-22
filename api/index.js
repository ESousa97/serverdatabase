// /api/index.js
require('dotenv').config();

const app = require('./app');
const express = require('express');
const authRouter = require('./auth'); // novo router de autenticação
const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');
const projectRouter = require('./project');

const PORT = process.env.PORT || 8000;

// Monta o router de autenticação
app.use('/api/auth', authRouter);

// Outras rotas da API
app.use('/api/cards', cardlistHandler);
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);
app.use('/api/projects', projectRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
