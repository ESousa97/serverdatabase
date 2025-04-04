// api/directorycontent.js
import express from 'express';
import axios from 'axios';

const router = express.Router();
const branch = process.env.GITHUB_BRANCH || 'main';

router.get('/:directory', async (req, res) => {
  const { directory } = req.params;

  try {
    const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/public/assets/${directory}?ref=${branch}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      }
    });

    const content = response.data.map(item => ({
      name: item.name,
      path: item.path,
      type: item.type,
      download_url: item.download_url,
    }));

    res.status(200).json({ content });
  } catch (error) {
    // Se o GitHub retornar 404 (por exemplo, diretório vazio ou não encontrado), retorne um array vazio
    if (error.response && error.response.status === 404) {
      return res.status(200).json({ content: [] });
    }
    console.error('Erro ao buscar conteúdo:', error.message);
    res.status(500).json({ error: 'Erro ao buscar conteúdo da pasta', details: error.message });
  }
});

export default router;
