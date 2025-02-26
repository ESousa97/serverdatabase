require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Desativa a verificação de certificados

const fs = require('fs');
const { Pool } = require('pg');
const cors = require('cors'); // Importa o módulo cors

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
    // O campo "ca" pode ser removido, pois a verificação está desativada.
    // Caso prefira manter o arquivo de certificado, ele não fará efeito.
    // ca: fs.readFileSync('./certs/supabase-ca.crt', 'utf8')
  }
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
    const { rows } = await pool.query('SELECT * FROM procedures;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar dados das categorias:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
