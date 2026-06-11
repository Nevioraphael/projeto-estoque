// server/controllers/produtoController.js
const Produto = require('../models/produtoModel');

const produtoController = {
    getAll: async (req, res) => {
        try {
            const produtos = await Produto.getAll();
            res.json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno ao buscar produtos' });
        }
    },

    create: async (req, res) => {
        try {
            const { nome, descricao, quantidade, preco } = req.body;
            const novoId = await Produto.create({ nome, descricao, quantidade, preco });
            res.status(201).json({ id: novoId, nome, descricao, quantidade, preco });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno ao criar produto' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, descricao, quantidade, preco } = req.body;
            await Produto.update(id, { nome, descricao, quantidade, preco });
            res.json({ message: 'Produto atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno ao atualizar produto' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await Produto.delete(id);
            res.json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno ao deletar produto' });
        }
    }
};

module.exports = produtoController;