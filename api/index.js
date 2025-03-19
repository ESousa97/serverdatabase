require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Configuração global do CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://esdatabasev2.vercel.app/'
  ],
  credentials: true,
  methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  allowedHeaders: [
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version'
  ]
};

app.use(cors(corsOptions));
app.use(express.json());

const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const procedureHandler = require('./procedure');
const searchHandler = require('./search');

const PORT = process.env.PORT || 3000;

app.get('/api/cardlist', cardlistHandler);
app.get('/api/categories', categoriesHandler);
app.get('/api/procedure', procedureHandler);
app.get('/api/search', searchHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
