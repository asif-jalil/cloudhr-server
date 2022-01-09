const db = require('../db/db');

const { Op } = db;

// create main model
const Employee = db.employee;

module.exports.createSingleEmployee = async function (employee) {
	return await Employee.create(employee);
};

module.exports.createBulkEmployee = async function (rows) {
	return await Employee.bulkCreate(rows, { validate: true });
};

module.exports.countEmployees = async function () {
	return await Employee.count({ col: 'Employee.id' });
};

module.exports.getEmployees = async function (offset, limit) {
	return await Employee.findAll({ offset: offset, limit: limit });
};

module.exports.searchEmployees = async function (searchTerm) {
	return await Employee.findAll({
		where: {
			[Op.or]: [{ firstName: { [Op.like]: '%' + searchTerm + '%' } }, { lastName: { [Op.like]: '%' + searchTerm + '%' } }]
		}
		// offset: 0,
		// limit: 10
	});
};
