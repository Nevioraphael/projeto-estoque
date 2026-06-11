// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importação das rotas
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite ler JSON no body das requisições

// Uso das rotas (Todas as rotas de produto começam com /api/produtos)
app.use('/api/produtos', produtoRoutes);

// Rota de teste para saber se o servidor está no ar
app.get('/', (req, res) => {
    res.json({ message: 'API de Estoque rodando com sucesso!' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});