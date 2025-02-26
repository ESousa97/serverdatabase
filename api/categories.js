const { Pool } = require('pg');
require('dotenv').config();

// Importar CORS
const cors = require('cors');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

// Habilitar CORS
const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:8000','https://esdatabasev2.vercel.app/'], // ⚠️ Em produção, use 'https://seu-site.com' para mais segurança
  credentials: true
};

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Não utilize '*' em produção
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Supondo que sua tabela de categorias esteja na tabela "procedure" conforme o seu exemplo
    const { rows } = await pool.query('SELECT * FROM procedure;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar dados das categorias:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
