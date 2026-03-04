const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;