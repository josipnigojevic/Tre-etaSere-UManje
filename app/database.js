const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('TresetaSeres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
