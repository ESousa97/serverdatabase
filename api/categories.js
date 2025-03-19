const Project = require('../models/project');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://esdatabasev2.vercel.app/'
  ],
  credentials: true,
  methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  allowedHeaders: [
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version'
  ]
};

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

module.exports = cors(corsOptions)(handler);
