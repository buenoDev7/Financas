const Sequelize = require('sequelize');
const Lancamentos = require('../models/Model_lancamentos');

module.exports = {
    extrato: (req, res) => {
        Lancamentos.findAll({
            raw: true,
            order: [['data', 'DESC']]
        }).then(lancamentos => {
            let entradas = lancamentos.filter(lancamento => lancamento.tipo === 'Entrada');
            let saidas = lancamentos.filter(lancamento => lancamento.tipo === 'Saída');
            let Poupança = lancamentos.filter(lancamento => lancamento.categoria === 'Poupança');

            let totalEntradas = entradas.reduce((soma, item) => soma + Number(item.valor), 0);
            let totalSaidas = saidas.reduce((soma, item) => soma + Number(item.valor), 0);
            let totalPoupanca = Poupança.reduce((soma, item) => soma + Number(item.valor), 0);
            let saldoTotal = (totalEntradas - totalSaidas);

            res.render('extrato', {
                lancamentos,
                entradas,
                saidas,
                totalEntradas,
                totalPoupanca,
                totalSaidas,
                saldoTotal
            })
        }).catch(error => {
            console.log(`\n❌ Erro ao registrar lançamento: ${error}`);
        });
    },

    grafico: async (req, res) => {
        try {
            const dados = await Lancamentos.findAll({
                attributes: [
                    'categoria',
                    [Sequelize.fn('SUM', Sequelize.col('valor')), 'total']
                ],
                where: { tipo: 'Saída' },
                group: ['categoria'],
                raw: true
            });

            const totalGeral = dados.reduce((acc, item) => acc + parseFloat(item.total), 0);

            res.render('grafico', {
                totalGeral,
                labels: dados.map(d => d.categoria),
                valores: dados.map(d => d.total)
            });
        } catch (error) {
            res.status(500).send("Erro ao carregar dados");
        }
    },

    del_item: async (req, res) => {
        try {
            const id_lancamento = req.body.id_lancamento;
            Lancamentos.destroy({
                where: {
                    id: id_lancamento
                }
            }).then(() => {
                res.redirect('/extrato');
            });
        } catch (error) {
            res.json(error.message);
        }
    },

    limpar_dados: async (req, res) => {
        try {
            Lancamentos.destroy({
                where: {}
            })
            res.redirect('/extrato')
        } catch (error) {
            console.error(error.message)
        }
    }
}