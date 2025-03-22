require('dotenv').config();
const express = require('express');
const app = require('./app');

const authRoutes = require('./auth/authRoutes');
const authenticateToken = require('./auth/authMiddleware');
const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const searchHandler = require('./search');
const projectRouter = require('./project');

const PORT = process.env.PORT || 8000;

app.use('/api/auth', authRoutes);
app.use(authenticateToken);
app.use('/api/cards', cardlistHandler);
app.get('/api/categories', categoriesHandler);
app.get('/api/search', searchHandler);
app.use('/api/projects', projectRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
