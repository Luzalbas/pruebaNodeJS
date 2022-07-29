"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const db = new Sequelize('users', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map