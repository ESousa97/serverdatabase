// api/search.js
import db from '../models/index.js';
import { QueryTypes } from 'sequelize';
import asyncHandler from 'express-async-handler';
import logger from '../utils/logger.js';

const { sequelize } = db;

const handler = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Termo de busca não fornecido' });
  }

  const searchTerms = `%${query}%`;

  // Detecta o dialeto do banco para usar a sintaxe correta
  const dialect = sequelize.getDialect();
  const likeOperator = dialect === 'postgres' ? 'ILIKE' : 'LIKE';

  const sql = `
    SELECT * FROM projects
    WHERE conteudo ${likeOperator} :searchTerms
       OR titulo ${likeOperator} :searchTerms
       OR descricao ${likeOperator} :searchTerms
    LIMIT 10
  `;

  const results = await sequelize.query(sql, {
    replacements: { searchTerms },
    type: QueryTypes.SELECT,
  });

  logger.debug(`Busca realizada: "${query}" - ${results.length} resultados`);
  res.status(200).json(results);
});

export default handler;
