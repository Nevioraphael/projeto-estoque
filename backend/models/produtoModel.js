// server/models/produtoModel.js
const db = require('../config/database');

const Produto = {
    // Buscar todos
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM produtos ORDER BY id DESC');
        return rows;
    },

    // Criar novo
    create: async (data) => {
        const [result] = await db.query(
            'INSERT INTO produtos (nome, descricao, quantidade, preco) VALUES (?, ?, ?, ?)',
            [data.nome, data.descricao, data.quantidade, data.preco]
        );
        return result.insertId;
    },

    // Atualizar
    update: async (id, data) => {
        await db.query(
            'UPDATE produtos SET nome=?, descricao=?, quantidade=?, preco=? WHERE id=?',
            [data.nome, data.descricao, data.quantidade, data.preco, id]
        );
    },

    // Deletar
    delete: async (id) => {
        await db.query('DELETE FROM produtos WHERE id=?', [id]);
    }
};

module.exports = Produto;