const { Card } = require('../models');

async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const cards = await Card.findAll();
    res.status(200).json(cards);
  } catch (error) {
    console.error('Erro ao buscar dados dos cards:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
