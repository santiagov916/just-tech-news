const Sequelize = require('sequelize');

// create connection to our database, pass in mysql info
const sequelize = new Sequelize('just_tech_news_db', 'root', 'hellafarted', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3001'
})

module.exports = sequelize;