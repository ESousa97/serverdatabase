// pages/api/imageupload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import axios from 'axios';

// Configura o multer para armazenar o arquivo na memória
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Erro no servidor: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Método ${req.method} não permitido` });
  },
});

// Processa o campo "image" enviado no form
apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  try {
    const { directory, overwrite } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const uploadPath = process.env.GITHUB_UPLOAD_PATH || 'public/assets';
    const dir = directory || 'default';
    const filePath = `${uploadPath}/${dir}/${file.originalname}`;
    const contentBase64 = file.buffer.toString('base64');
    const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`;
    const message = overwrite
      ? `Atualizando arquivo ${file.originalname}`
      : `Adicionando arquivo ${file.originalname}`;
    const committer = {
      name: process.env.COMMITTER_NAME,
      email: process.env.COMMITTER_EMAIL,
    };

    let sha = null;

    try {
      const getResponse = await axios.get(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });

      sha = getResponse.data.sha;

      // Se o arquivo já existe e overwrite for false → impedir o upload
      if (!overwrite) {
        return res.status(409).json({ error: 'Arquivo já existe e overwrite está desabilitado.' });
      }

    } catch (err) {
      // Se o arquivo não existe, seguimos normalmente (sem SHA)
      if (err.response?.status !== 404) {
        throw err;
      }
}

    const payload = {
      message,
      committer,
      content: contentBase64,
      branch: process.env.GITHUB_BRANCH,
    };
    if (sha) payload.sha = sha;

    const response = await axios.put(url, payload, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    res.status(200).json({ imageUrl: response.data.content.download_url });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
