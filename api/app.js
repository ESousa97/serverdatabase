const { createPool } = require('@vercel/postgres');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Habilita o CORS
app.use(cors());

// Obtém a string de conexão a partir da variável de ambiente
const connectionString = process.env.POSTGRES_URL;

// Cria o pool de conexão utilizando @vercel/postgres
const pool = createPool({ connectionString });

// Função para testar a conexão com o banco de dados
async function connectToDatabase() {
  try {
    const client = await pool.connect();
    console.log('Conectado ao banco de dados PostgreSQL');
    
    const result = await client.query('SELECT NOW()');
    console.log('Data e hora do banco:', result.rows[0].now);
    
    client.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

connectToDatabase();

module.exports = app;
