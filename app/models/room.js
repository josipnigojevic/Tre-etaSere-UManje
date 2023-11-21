const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Room = sequelize.define('Room', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    players: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },

});

module.exports = Room;
