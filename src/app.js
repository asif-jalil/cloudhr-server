const express = require('express');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
const db = require('./db/db');
const employeesRouter = require('./routes/employees');
const app = express();

db.sequelize
	.sync({ force: true })
	.then(() => {
		console.log('Re sync done!');
	})
	.catch(err => console.trace(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/employees', employeesRouter);

module.exports = app;
