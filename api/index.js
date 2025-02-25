require('dotenv').config();

const app = require('./app');
const express = require('express');
const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const procedureHandler = require('./procedure');
const searchHandler = require('./search');

const PORT = process.env.PORT || 3000;

// Define as rotas da API
app.get('/api/cardlist', cardlistHandler);
app.get('/api/categories', categoriesHandler);
app.get('/api/procedure', procedureHandler);
app.get('/api/search', searchHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
