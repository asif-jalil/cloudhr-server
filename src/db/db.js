const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');
const path = require('path');
const fs = require('fs');
const db = {};

const dbURL = dbConfig.db;
if (!dbURL) {
	console.error('Database is not set in env file or config.js');
	return new Error('Database is not set in env file or config.js');
}

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

db.Sequelize = Sequelize
db.sequelize = sequelize

const src = __dirname.replace(/\\/g, '/').split('/src')[0].concat('/src');
const models = fs.readdirSync(path.join(src, 'models'));
models.forEach(file => {
	const modelName = file.split('.model.js')[0];
	db[modelName] = require(`../models/${file.split('.js')[0]}`)(sequelize, DataTypes);
})


Object.keys(db).forEach(key => {
	if (db[key].associate) {
		db[key].associate(db);
	}
});

module.exports = db;
