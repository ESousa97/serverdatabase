require('dotenv').config();

const app = require('./app');
const express = require('express');
const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');
const projectRouter = require('./project'); // Agora, este router possui todas as operações CRUD

const PORT = process.env.PORT || 8000;

// Define as rotas da API
app.use('/api/cards', require('./cardlist'));
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);

// Rota para operações de CRUD em projetos
app.use('/api/projects', projectRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
