import db from '../models/index.js';
const { Project, Sequelize } = db;

async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const categories = await Project.findAll({
      attributes: ['id', 'titulo', 'categoria'],
      order: [['id', 'DESC']]
    });
    res.status(200).json(categories);    
  } catch (error) {
    console.error('Erro ao buscar dados das categorias:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

export default handler;
