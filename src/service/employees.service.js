const db = require('../db/db');

const { Op } = db;

// create main model
const Employee = db.employee;


// Create an employee query
module.exports.createSingleEmployee = async function (employee) {
	return await Employee.create(employee);
};


// Crete bulk employee query
module.exports.createBulkEmployee = async function (rows) {
	return await Employee.bulkCreate(rows, { validate: true });
};


// Count total employee query
module.exports.countEmployees = async function () {
	return await Employee.count({ col: 'Employee.id' });
};


// Get total employee query
module.exports.getEmployees = async function (offset, limit) {
	return await Employee.findAll({ offset: offset, limit: limit });
};


// Search employee query
module.exports.searchEmployees = async function (searchTerm) {
	return await Employee.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt'] },
		where: {
			[Op.or]: [{ firstName: { [Op.like]: '%' + searchTerm + '%' } }, { lastName: { [Op.like]: '%' + searchTerm + '%' } }]
		}
		// offset: 0,
		// limit: 10
	});
};
