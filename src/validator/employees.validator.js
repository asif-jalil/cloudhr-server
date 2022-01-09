const { check } = require("express-validator");

module.exports.validateEmployee = async function (req, res, next) {
    await check("email", "Invalid email address").trim().isEmail().normalizeEmail().run(req);
    await check("firstName", "Invalid First Name").trim().not().isEmpty().escape().run(req);
    await check("lastName", "Invalid Last Name").trim().not().isEmpty().escape().run(req);
    next()
};
