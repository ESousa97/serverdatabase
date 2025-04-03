import express from 'express';
import axios from 'axios';

const router = express.Router();

router.put('/', async (req, res) => {
  const { oldPath, newPath } = req.body;

  if (!oldPath || !newPath) {
    return res.status(400).json({ error: 'Parâmetros oldPath e newPath são obrigatórios.' });
  }

  try {
    const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${oldPath}`;

    // Obter conteúdo original
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      }
    });

    const payload = {
      message: `Renomeando ${oldPath} para ${newPath}`,
      content: data.content,
      sha: data.sha,
      branch: process.env.GITHUB_BRANCH,
      committer: {
        name: process.env.COMMITTER_NAME,
        email: process.env.COMMITTER_EMAIL,
      },
    };

    // Criar novo
    await axios.put(`https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${newPath}`, payload, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    // Deletar original
    await axios.delete(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      data: {
        message: `Removendo original ${oldPath}`,
        sha: data.sha,
        branch: process.env.GITHUB_BRANCH,
        committer: {
          name: process.env.COMMITTER_NAME,
          email: process.env.COMMITTER_EMAIL,
        },
      },
    });

    return res.status(200).json({ message: `Renomeado com sucesso para ${newPath}` });
  } catch (error) {
    console.error('Erro ao renomear:', error.message);
    res.status(500).json({ error: 'Erro ao renomear', details: error.message });
  }
});

export default router;
