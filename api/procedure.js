const { Pool } = require('pg');

// Cria o pool de conexão utilizando a variável de ambiente
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
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: 'ID do procedimento não fornecido' });
    }

    const query = 'SELECT * FROM procedure WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar dados do procedimento:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
