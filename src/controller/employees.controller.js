const employeeService = require("../service/employees.service");
const { validationResult } = require("express-validator");
const fs = require("fs");

// Create an employee handler
module.exports.createEmployee = async function (req, res, next) {
  const employee = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMessage = "";
      errors.errors.forEach((error) => {
        errorMessage = errorMessage + error.msg + ", ";
      });
      next({ status: 400, message: errorMessage });
    } else {
      await employeeService.createSingleEmployee(employee);
      return res.json({ status: 200, message: "Employee Added Successfully" });
    }
  } catch (error) {
    next({ status: 500, message: error.errors ? error.errors[0].message : "Something happened wrong. Please try again with proper information." });
  }
};


// Create bulk employee uploaded by CSV handler
module.exports.createBulkEmployee = async function (req, res, next) {
  const csvData = req.body;

  try {
		const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMessage = "";
			errors.errors.forEach((error) => {
        errorMessage = `${errorMessage} ${error.msg} at line ${Number(error.param.split('.')[0].split(/\[|\]/)[1]) + 1}, `;
      });
      next({ status: 400, message: errorMessage });
    } else {
      await employeeService.createBulkEmployee(csvData);
      return res.status(200).json({ status: 200, message: "Bulk Employee Added Successfully" });
    }
  } catch (error) {
    fs.unlinkSync(`${req.file.destination}${req.file.filename}`);
    next({ status: 500, message: error.errors ? error.errors[0].message : "Something happened wrong. Please try again with proper information." });
  }
};


// Count total employee handler
module.exports.countEmployees = async function (req, res) {
  const employees = await employeeService.countEmployees();
  return res.setHeader('Last-Modified', (new Date()).toUTCString()).status(200).json(employees);
};


// Get total employee handler
module.exports.getEmployees = async function (req, res) {
  const pageNumber = req.query.page || 1;
  const perPage = req.query.posts || 5;

  const limit = Number(perPage);
  const offset = Number(pageNumber * limit - limit);

  try {
    const employees = await employeeService.getEmployees(offset, limit);
    return res.setHeader('Last-Modified', (new Date()).toUTCString()).status(200).json(employees);
  } catch (error) {
    next({ message: error });
  }
};


// Search employee handler
module.exports.searchEmployees = async function (req, res, next) {
  const { searchTerm } = req.query;

  try {
    const employees = await employeeService.searchEmployees(searchTerm);
    return res.setHeader('Last-Modified', (new Date()).toUTCString()).status(200).json(employees);
  } catch (error) {
    next({ message: error });
  }
};
