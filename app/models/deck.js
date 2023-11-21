const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Deck = sequelize.define('Deck', {
    cardIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },

});

module.exports = Deck;
