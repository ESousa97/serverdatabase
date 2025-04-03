// api/directorylist.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const url = 'https://api.github.com/repos/ESousa97/esdatabasev2/contents/public/assets';
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });
    // Filtra apenas os itens do tipo diretório
    const directories = response.data
      .filter(item => item.type === 'dir')
      .map(item => item.name);
    
    res.status(200).json({ directories });
  } catch (error) {
    console.error('Erro ao buscar diretórios na nuvem:', error.message);
    res.status(500).json({ error: 'Erro ao buscar diretórios', details: error.message });
  }
});

export default router;
