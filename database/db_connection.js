const Sequelize = require('sequelize');
const connection = new Sequelize('financas', 'root', '@Yan2004', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;