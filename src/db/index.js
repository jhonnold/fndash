const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { logger } = require('../util');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    dialect: 'postgres',
    logging: msg => logger.debug(msg),
});

fs.readdirSync(__dirname)
    .filter(f => f.indexOf('.') !== 0 && f !== basename && f.slice(-3) === '.js')
    .forEach(f => {
        const model = sequelize['import'](path.join(__dirname, f));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
