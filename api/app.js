const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Cria o pool de conexão utilizando a string do .env com sslmode=require
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

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
