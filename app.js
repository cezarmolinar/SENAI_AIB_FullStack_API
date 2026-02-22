/**
 * Arquivo principal da aplicação
 * Aqui configuramos o servidor Express
 */

// Importa o Express
import express from 'express';

// Cria a aplicação Express
const app = express();

// Middleware para JSON
app.use(express.json());

// Define a porta do servidor
const PORT = 3000;
let dadosClientes = [];
let proximoId = 1;

// Rota inicial (rota de teste)
app.get('/', (req, res) => {
  res.json({
    message: 'API Node.js com Express está funcionando!',
  });
});

// Rota para verificar a saúde da API
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.get('/clientes', (req, res) => {
  res.status(200).json(dadosClientes);
});

app.get('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = dadosClientes.find((c) => c.id === id);

  if (!cliente) {
    return res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }

  res.json(cliente);
});

app.post('/clientes', (req, res) => {
  const cliente = req.body;
  dadosClientes.push(cliente);
  res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
});

app.post('/clientes', (req, res) => {
  const { nome, email } = req.body;

  const novoCliente = {
    id: proximoId++,
    nome,
    email,
  };

  dadosClientes.push(novoCliente);

  res.status(201).json(novoCliente);
});

app.put('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  const index = dadosClientes.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }

  dadosClientes[index] = {
    id,
    nome,
    email,
  };

  res.json(dadosClientes[index]);
});

app.patch('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const cliente = dadosClientes.find((c) => c.id === id);

  if (!cliente) {
    return res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }

  const { email } = req.body;

  cliente.email = email;

  res.json(cliente);
});

app.delete('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = dadosClientes.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }

  dadosClientes.splice(index, 1);

  res.json({ mensagem: 'Cliente removido com sucesso' });
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
