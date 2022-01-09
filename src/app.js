const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
const db = require('./db/db');
const employeesRouter = require('./routes/employees');
const app = express();
// const fs = require('fs');

// async function writeFile(path) {
// 	try {
// 		const writeStream = fs.createWriteStream(path, {
// 			flags: 'w'
// 		});

// 		for (let index = 0; index < 10000; index++) {
// 			writeStream.write(`fName${index},lName${index},email${index}@mail.com\n`, err => {
// 				if (err) throw err;
// 				if (index === 10000 - 1) writeStream.end(); //I attempted close() and destroy() too, none worked
// 			});
// 		}

// 		writeStream.on('finish', () => {
// 			console.log('All files were written.'); //Currently being emmited before all is written.
// 		});
// 	} catch (err) {
// 		throw err;
// 	}
// }

// writeFile('./src/assets/upload.csv');

db.sequelize
	.sync({ force: true })
	.then(() => {
		console.log('Re sync done!');
	})
	.catch(err => console.trace(err));

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/employees', employeesRouter);

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			status: error.status || 500,
			message: error.message
		}
	});
});

module.exports = app;
