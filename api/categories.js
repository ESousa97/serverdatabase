// api/categories.js
import db from '../models/index.js';
const { Project, Sequelize } = db;

async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Para cada categoria distinta, retorna também o menor título e o menor ID (representativo)
    const categories = await Project.findAll({
      attributes: [
        'categoria',
        [Sequelize.fn('MIN', Sequelize.col('titulo')), 'titulo'],
        [Sequelize.fn('MIN', Sequelize.col('id')), 'id']
      ],
      group: ['categoria']
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erro ao buscar dados das categorias:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

export default handler;
