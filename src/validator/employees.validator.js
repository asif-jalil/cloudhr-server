const { body, check, validationResult, oneOf } = require("express-validator");

module.exports.validateSingleEmployee = async function (req, res, next) {
  await Promise.all([
    check("email", "Invalid email address").trim().isEmail().normalizeEmail().run(req),
    check("firstName", "Invalid First Name").trim().not().isEmpty().escape().run(req),
    check("lastName", "Invalid Last Name").trim().not().isEmpty().escape().run(req),
  ]);
  // await check("email", "Invalid email address").trim().isEmail().normalizeEmail().run(req);
  // await check("firstName", "Invalid First Name").trim().not().isEmpty().escape().run(req);
  // await check("lastName", "Invalid Last Name").trim().not().isEmpty().escape().run(req);

  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    next();
  }

  let errorMessage = "";
  errors.errors.forEach((error) => {
    errorMessage = errorMessage + error.msg + ", ";
  });
  next({ status: 400, message: errorMessage });
};

module.exports.validateBulkEmployee = async function (req, res, next) {
  await check("*.email", "Invalid email address").trim().isEmail().normalizeEmail().run(req);
  await check("*.firstName", "Invalid First Name").trim().not().isEmpty().escape().run(req);
  await check("*.lastName", "Invalid Last Name").trim().not().isEmpty().escape().run(req);

  next();
};
