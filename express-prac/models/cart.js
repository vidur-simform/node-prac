const Sequelize = require('sequelize');

const sequelize = require('../utils/databaseSequelize');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
});

module.exports = Cart;