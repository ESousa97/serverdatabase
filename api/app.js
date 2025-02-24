const { createPool } = require('@vercel/postgres');
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para desabilitar o CORS
app.use(cors());

// Utilize a string de conexão diretamente (não recomendado para produção)
const connectionString = "Enter your database connection here";

// Cria um pool de conexão usando @vercel/postgres
const pool = createPool({
  connectionString: connectionString
});

// Função para testar a conexão com o banco de dados
async function connectToDatabase() {
  try {
    // Obtém um cliente do pool de conexões
    const client = await pool.connect();
    console.log('Conectado ao banco de dados PostgreSQL');
    
    // Executa uma query simples para testar a conexão
    const result = await client.query('SELECT NOW()');
    console.log('Conexão bem-sucedida. Data e hora atuais do banco de dados:', result.rows[0].now);
    
    // Libera o cliente de volta ao pool
    client.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

connectToDatabase();

// Exporta o aplicativo express
module.exports = app;
