// /api/index.js
const app = require('./app');
const PORT = process.env.PORT || 8000;

// Sobe o servidor (no Vercel, isso se transforma em uma Serverless Function)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
