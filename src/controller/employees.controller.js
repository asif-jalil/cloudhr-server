const employeeService = require('../service/employees.service');


module.exports.createEmployee = async function (req, res) {
	const employee = req.body;

	try {
		const createdEmployee = await employeeService.createEmployee(employee);
		return res.status(200).json(createdEmployee);
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Failed to add employee. Please try again' });
	}
};

module.exports.getEmployees = async function (req, res) {
	try {
		const employees = await employeeService.getEmployees();
		return res.status(200).json(employees);
	} catch (e) {
		return res.status(500).json({ error: true, message: 'Failed to fetch your posts. Please try again' });
	}
};
