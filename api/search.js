const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Termo de busca não fornecido' });

    const searchTerms = `%${query}%`;
    const sql = `
      SELECT * FROM projects
      WHERE conteudo ILIKE :searchTerms
      ORDER BY similarity(conteudo, :query) DESC
      LIMIT 10
    `;

    const results = await sequelize.query(sql, {
      replacements: { searchTerms, query },
      type: QueryTypes.SELECT,
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
