const db = require("../db/db");

// create main model
const Employee = db.employee;

module.exports.createEmployee = async function (employee) {
  return await Employee.create(employee);
};

module.exports.getEmployees = async function () {
  return await Employee.findAll({});
};
