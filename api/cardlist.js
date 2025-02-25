// Apenas para desenvolvimento: ignora a verificação de certificados SSL
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Pool } = require('pg');
require('dotenv').config();

// Usa a string de conexão definida no .env sem duplicar o parâmetro sslmode
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function handler(req, res) {
  // Configuração dos cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Em produção, defina a origem permitida
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { rows } = await pool.query('SELECT * FROM cards;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar dados dos cards:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
