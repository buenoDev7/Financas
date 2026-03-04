const express = require('express');
const router = express.Router();
const Controller_lancamentos = require('../controllers/Controller_lancamentos');
const Controller_extrato = require('../controllers/Controller_extrato');

// View para cadastrar novo lancamento
router.get('/', Controller_lancamentos.criar_lancamento);

// Salva novo lançamento no Banco de Dados
router.post('/salvar_lancamento', Controller_lancamentos.salvar_lancamento);

// Visualização de extrato
router.get('/extrato', Controller_extrato.extrato);

// Edição de lançamento
router.get('/editar_lancamento/:idLancamento', Controller_lancamentos.editar_lancamento);

// Salva a edição
router.post('/salvar_edicao', Controller_lancamentos.salvar_edicao);

// Deleta item do extrato
router.post('/del_item', Controller_extrato.del_item);

// Limpa todos os lançamentos
router.get('/limpar_dados', Controller_extrato.limpar_dados);

// Gráfico de Lançamentos
router.get('/grafico', Controller_extrato.grafico);

module.exports = router;