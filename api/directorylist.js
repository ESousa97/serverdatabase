// api/directorylist.js
import express from 'express';
import { listDirectories } from '../utils/github-client.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const directories = await listDirectories();
    res.status(200).json({ directories });
  } catch (error) {
    logger.error('Erro ao buscar diretórios na nuvem:', error.message);
    res.status(500).json({ error: 'Erro ao buscar diretórios', details: error.message });
  }
});

export default router;
