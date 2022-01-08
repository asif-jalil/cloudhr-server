const employeeService = require("../service/employees.service");
const fs = require("fs");

module.exports.createEmployee = async function (req, res, next) {
  const employee = req.body;

  try {
    await employeeService.createSingleEmployee(employee);
    return res.status(200).json({ status: 200, message: "Employee Added Successfully" });
  } catch (error) {
    next({ status: 500, message: error.errors[0].message });
  }
};

module.exports.createBulkEmployee = async function (req, res, next) {
  const csvData = req.csvData;
  const filteredCSV = csvData.filter((row) => {
    const values = Object.values(row);
    const isValid = values.every((value) => !!value);
    if (isValid) {
      return row;
    }
	});
	
  try {
    await employeeService.createBulkEmployee(filteredCSV);
    return res.status(200).json({ status: 200, message: "Bulk Employee Added Successfully" });
	} catch (error) {
		fs.unlinkSync(`${req.file.destination}${req.file.filename}`)
    next({ status: 500, message: error.errors[0].message });
  }
};

module.exports.countEmployees = async function (req, res) {
  const employees = await employeeService.countEmployees();
  return res.status(200).json(employees);
};

module.exports.getEmployees = async function (req, res) {
  const pageNumber = req.query.page || 1;
  const perPage = req.query.posts || 5;

  const limit = Number(perPage);
  const offset = Number(pageNumber * limit - limit);

  try {
    const employees = await employeeService.getEmployees(offset, limit);
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};
