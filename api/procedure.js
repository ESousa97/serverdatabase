const { Pool } = require('pg');

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  connectionString: 'Enter your database connection here',
  ssl: {
    rejectUnauthorized: false // Certifique-se de que essa opção esteja configurada corretamente para o seu ambiente
  }
});

async function handler(req, res) {
  // Configuração dos cabeçalhos de CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Não use '*' em produção!
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    // Método OPTIONS é utilizado como preflight pelo CORS, nós respondemos apenas com os cabeçalhos
    return res.status(200).end();
  }

  try {
    // Verifica se foi fornecido um ID na requisição
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: 'ID do procedimento não fornecido' });
    }

    // Realize a consulta ao banco de dados para obter o procedimento com o ID fornecido
    const query = 'SELECT * FROM procedure WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    // Verifica se o procedimento com o ID fornecido existe
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }

    // Retorne o procedimento obtido da consulta ao banco de dados
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar dados do procedimento:', error);
    // Em caso de erro na consulta ao banco de dados, retorne um erro 500
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
