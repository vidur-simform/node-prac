const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_db', 'root', 'Simform@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;