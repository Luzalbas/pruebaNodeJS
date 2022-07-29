const { Sequelize } = require('sequelize');

const db = new Sequelize('users','postgres','123',{
    host: 'localhost',
    dialect: 'postgres',
    //logging: false,
})

export default db;