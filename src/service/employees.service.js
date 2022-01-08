const db = require("../db/db");

// create main model
const Employee = db.employee;

module.exports.createSingleEmployee = async function (employee) {
  return await Employee.create(employee);
};

module.exports.createBulkEmployee = async function (rows) {
  return await Employee.bulkCreate(rows, {validate: true})
}

module.exports.countEmployees = async function () {
  return await Employee.count({ col: "Employee.id" });
};

module.exports.getEmployees = async function (offset, limit) {
  return await Employee.findAll({ offset: offset, limit: limit });
};