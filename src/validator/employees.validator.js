const { body, check } = require("express-validator");

// Validator for Single employee creation
module.exports.validateSingleEmployee = async function (req, res, next) {
  await Promise.all([
    check("email", "Invalid email address").trim().isEmail().normalizeEmail().run(req),
    check("firstName", "Invalid First Name").trim().not().isEmpty().escape().run(req),
    check("lastName", "Invalid Last Name").trim().not().isEmpty().escape().run(req),
  ]);

  next();
};


// Validator for Bulk employee creation
module.exports.validateBulkEmployee = async function (req, res, next) {
  await Promise.all([
    body("*.email", "Invalid email address").trim().isEmail().normalizeEmail().run(req),
    body("*.firstName", "Invalid First Name").trim().not().isEmpty().escape().run(req),
    body("*.lastName", "Invalid Last Name").trim().not().isEmpty().escape().run(req),
  ]);

  next();
};
