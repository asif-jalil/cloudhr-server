const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { upload } = require("../middleware/multer");
const { countEmployees, createEmployee, createBulkEmployee, getEmployees, searchEmployees } = require("../controller/employees.controller");
const { parseCSV } = require("../middleware/csvParser");
const { logRequest } = require("../middleware/employees.middleware");
const { validateSingleEmployee, validateBulkEmployee } = require("../validator/employees.validator");

router.get("/", function (req, res) {
  return res.json({ message: "App is running" });
});

// Count total employee route
router.get("/count", countEmployees);

//  Create an employee route
router.post("/create", validateSingleEmployee, createEmployee);

// Bulk employee upload by CSV route
router.post("/createbulk", upload.single("file"), parseCSV, validateBulkEmployee, createBulkEmployee);

// Get total employee route
router.get("/view", getEmployees);

// Search employee route
router.get("/search", searchEmployees);

module.exports = router;
