// server/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Mapeamento das rotas para os métodos do controller
router.get('/', produtoController.getAll);
router.post('/', produtoController.create);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.delete);

module.exports = router;