const { Project, Sequelize } = require('../models');

async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Retorna categorias distintas da tabela projects
    const categories = await Project.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('categoria')), 'categoria']
      ]
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erro ao buscar dados das categorias:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
