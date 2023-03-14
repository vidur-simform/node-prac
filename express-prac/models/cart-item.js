const Sequelize = require('sequelize');

const sequelize = require('../utils/databaseSequelize');

const CartItem = sequelize.define('cartitem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;