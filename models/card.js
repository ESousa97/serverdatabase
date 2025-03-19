const Card = require('../models/card');
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'https://esdatabasev2.vercel.app/'
];

const corsOptions = {
  origin: function(origin, callback) {
    // Permite requisições sem header "origin" (ex.: chamadas server-to-server ou via curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
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
    const cards = await Card.findAll();
    res.status(200).json(cards);
  } catch (error) {
    console.error('Erro ao buscar dados dos cards:', error);
    res.status(500).json({
      message: 'Erro ao consultar o banco de dados',
      error: error.message
    });
  }
}

// Wrapper que garante que req.headers exista antes de aplicar o middleware CORS
module.exports = function(req, res) {
  req.headers = req.headers || {};
  return cors(corsOptions)(req, res, function() {
    return handler(req, res);
  });
};
