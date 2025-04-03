// api/search.js
import db from '../models/index.js';
import { QueryTypes } from 'sequelize';
import asyncHandler from 'express-async-handler';

const { sequelize } = db;

async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const { query } = req.query;
    if (!query)
      return res.status(400).json({ error: 'Termo de busca não fornecido' });

    // Removido o cache via Redis para evitar a tentativa de conexão
    const searchTerms = `%${query}%`;
    const sql = `
      SELECT * FROM projects
      WHERE conteudo ILIKE :searchTerms
      LIMIT 10
    `;
    const results = await sequelize.query(sql, {
      replacements: { searchTerms },
      type: QueryTypes.SELECT,
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res
      .status(500)
      .json({ message: 'Erro ao consultar o banco de dados' });
  }
}

export default asyncHandler(handler);
