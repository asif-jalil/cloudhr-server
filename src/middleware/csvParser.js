const csv = require('csv-parser');
const fs = require('fs');

module.exports.parseCSV = function (req, res, next) {
	const results = [];
	const acceptedColumn = ['firstName', 'lastName', 'email'];
	fs.createReadStream(`${req.file.destination}${req.file.filename}`)
		.on('error', error => {
			fs.unlinkSync(`${req.file.destination}${req.file.filename}`);
			console.log(error);
		})
		.pipe(
			csv({
				mapHeaders: ({ header, index }) => (acceptedColumn.includes(header) ? header : null),
				mapValues: ({ header, index, value }) => (value ? value : null)
			})
		)
		.on('data', data => {
			results.push(data);
		})
		.on('end', () => {
			const filteredCSV = results.filter(row => {
				const values = Object.values(row);
				const isValid = values.every(value => !!value);
				if (isValid) {
					return row;
				}
			});
			req.body = filteredCSV;
			console.log(filteredCSV);
			next();
		});
};
