const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Create this file (see step 3)

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    elo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
});

module.exports = User;
