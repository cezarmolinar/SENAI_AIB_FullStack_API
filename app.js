/**
 * Arquivo principal da aplicação
 * Aqui configuramos o servidor Express
 */

// Importa o Express
import express from 'express';

// Cria a aplicação Express
const app = express();

// Define a porta do servidor
const PORT = 3000;

// Rota inicial (rota de teste)
app.get('/', (req, res) => {
  res.send('🚀 API Node.js com Express está funcionando!!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
