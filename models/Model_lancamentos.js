const Sequelize = require('sequelize');
const connection = require('../database/db_connection');

const financas = connection.define('lancamentos', {
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "Tipo" não pode ser vazio!'
            }
        }
    },

    valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    },

    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "Categoria" não pode ser vazio!'
            }
        }
    },

    data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "Data" não pode ser vazio!'
            }
        }
    },

    formaDePagamento: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "Forma de pagamento" não pode ser vazio!'
            }
        }
    },

    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "Descricao" não pode ser vazio!'
            }
        }
    },

    pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "Pessoa" não pode ser vazio!'
            }
        }
    },
},
    { freezeTableName: true }
);

financas.sync({ force: false, alter: true }).then(() => {
    console.log('\n✅ Tabela "financas" sincronizada')
}).catch((error => {
    console.log(`\n❌ Erro ao sincronizar tabela: ${error}`)
}));

module.exports = financas;