// api/renamecontent.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

const basePath = process.env.GITHUB_ASSETS_BASE || 'public/assets';
const branch = process.env.GITHUB_BRANCH || 'main';

router.put('/', async (req, res) => {
  const { oldPath, newPath } = req.body;

  if (!oldPath || !newPath) {
    return res.status(400).json({ error: 'oldPath e newPath são obrigatórios.' });
  }

  // Constrói a URL completa para o arquivo antigo, incluindo o branch
  const urlOld = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${basePath}/${oldPath}?ref=${branch}`;

  try {
    // Primeiro, obtenha os dados do arquivo antigo (incluindo o SHA e o conteúdo em base64)
    const getRes = await axios.get(urlOld, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const { sha, content } = getRes.data;

    // Constrói a URL para criar/atualizar o arquivo com o novo nome
    const urlNew = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${basePath}/${newPath}?ref=${branch}`;
    const commitMessage = `Renomeando arquivo de ${oldPath} para ${newPath}`;

    // Cria ou atualiza o arquivo no novo caminho com o mesmo conteúdo
    await axios.put(urlNew, {
      message: commitMessage,
      content, // O conteúdo em base64
      branch,
      committer: {
        name: process.env.COMMITTER_NAME,
        email: process.env.COMMITTER_EMAIL,
      },
    }, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    // Após criar o novo arquivo, delete o antigo
    await axios.delete(urlOld, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      data: {
        message: `Removendo arquivo antigo após renomeação: ${oldPath}`,
        sha,
        branch,
        committer: {
          name: process.env.COMMITTER_NAME,
          email: process.env.COMMITTER_EMAIL,
        },
      },
    });

    return res.status(200).json({ message: 'Arquivo renomeado com sucesso.' });

  } catch (error) {
    console.error('Erro ao renomear conteúdo:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return res.status(500).json({
      error: 'Erro ao renomear',
      details: error.message,
      github: error.response?.data || null,
    });
  }
});

export default router;
