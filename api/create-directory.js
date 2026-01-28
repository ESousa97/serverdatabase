// api/create-directory.js
import express from 'express';
import { createDirectory } from '../utils/github-client.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome do diretório é obrigatório.' });
  }

  try {
    const result = await createDirectory(name);
    return res.status(200).json({
      message: `Diretório ${name} criado com sucesso.`,
      details: result,
    });
  } catch (error) {
    logger.error('Erro ao criar diretório:', error.message);
    return res.status(500).json({ error: 'Erro ao criar diretório', details: error.message });
  }
});

export default router;
