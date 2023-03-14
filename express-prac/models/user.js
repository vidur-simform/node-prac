const Sequelize = require('sequelize');

const sequelize = require('../utils/databaseSequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;