// api/directorycontent.js
import express from 'express';
import { listDirectoryContent } from '../utils/github-client.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.get('/:directory', async (req, res) => {
  const { directory } = req.params;

  try {
    const content = await listDirectoryContent(directory);
    res.status(200).json({ content });
  } catch (error) {
    logger.error('Erro ao buscar conteúdo:', error.message);
    res.status(500).json({ error: 'Erro ao buscar conteúdo da pasta', details: error.message });
  }
});

export default router;
