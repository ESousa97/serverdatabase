const { Project } = require('../models');

async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ message: 'ID do projeto não fornecido' });

    const project = await Project.findOne({ where: { id } });
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });

    res.status(200).json(project);
  } catch (error) {
    console.error('Erro ao buscar dados do projeto:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
