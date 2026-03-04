const Lancamentos = require('../models/Model_lancamentos');

module.exports = {
    criar_lancamento: (req, res) => {
        res.render('novo_lancamento');
    },

    salvar_lancamento: (req, res) => {
        const {
            tipo, valor, categoria,
            data, formaDePagamento, descricao, pessoa
        } = req.body;

        Lancamentos.create({
            tipo: tipo,
            valor: valor,
            categoria: categoria,
            data: data,
            formaDePagamento: formaDePagamento,
            descricao: descricao,
            pessoa: pessoa
        }).then(() => {
            res.redirect('/criar_lancamento')
            console.log('\n✅ Lancamento registrado com sucesso!');
        });
    },

    editar_lancamento: async (req, res) => {
        try {
            const idLancamento = req.params.idLancamento;
            const lancamento = await Lancamentos.findByPk(idLancamento);

            return res.render('editar_lancamento', {
                lancamento
            });

        } catch (error) {
            console.error(error.message)
            return res.status(500).json({
                error: error.message
            })
        }

    },

    salvar_edicao: async (req, res) => {
        try {
            let idLancamento = req.body.idLancamento;
            let novosDados = {
                tipo: req.body.tipo,
                valor: req.body.valor,
                categoria: req.body.categoria,
                data: req.body.data,
                formaDePagamento: req.body.formaDePagamento,
                descricao: req.body.descricao,
                pessoa: req.body.pessoa
            }

            Lancamentos.update(novosDados, {
                where: {
                    id: idLancamento
                }
            })

            res.redirect('/extrato')

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                error: error.message
            })
        }
    }
}