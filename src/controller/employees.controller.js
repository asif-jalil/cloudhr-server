const employeeService = require('../service/employees.service');

module.exports.createEmployee = async function (req, res) {
	const employee = req.body;
	try {
		const createdEmployee = await employeeService.createEmployee(employee);
		return res.status(200).json(createdEmployee);
	} catch (e) {
		console.log(e);
		return res.status(500).json(e);
	}
};

module.exports.countEmployees = async function (req, res) {
	const employees = await employeeService.countEmployees();
	return res.status(200).json(employees);
};
