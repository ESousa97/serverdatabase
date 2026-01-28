// api/categories.js
import asyncHandler from 'express-async-handler';
import db from '../models/index.js';
import logger from '../utils/logger.js';

const { Project } = db;

const handler = asyncHandler(async (req, res) => {
  const categories = await Project.findAll({
    attributes: ['id', 'titulo', 'categoria'],
    order: [['id', 'DESC']],
  });

  logger.debug(`Categorias listadas: ${categories.length} projetos`);
  res.status(200).json(categories);
});

export default handler;
