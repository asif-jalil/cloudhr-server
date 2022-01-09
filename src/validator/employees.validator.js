const { check } = require("express-validator");

module.exports.validateEmployee = async function (req, res, next) {
    await check("email", "Invalid email address").isEmail().normalizeEmail().run(req);
    await check("firstName", "Invalid First Name").not().isEmpty().trim().escape().run(req);
    await check("lastName", "Invalid Last Name").not().isEmpty().trim().escape().run(req);
    next()
};
