const { Pool } = require('pg');

// Configura o pool de conexão usando a variável de ambiente
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Ajuste conforme necessário
  }
});

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Não utilize '*' em produção
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Termo de busca não fornecido' });
    }

    const searchTerms = `%${query}%`;
    const result = await pool.query(
      'SELECT * FROM procedure WHERE conteudo ILIKE $1 ORDER BY similarity(conteudo, $1) DESC LIMIT 10', 
      [searchTerms]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
