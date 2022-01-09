const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { upload } = require("../middleware/multer");
const { countEmployees, createEmployee, createBulkEmployee, getEmployees, searchEmployees } = require("../controller/employees.controller");
const { parseCSV } = require("../middleware/csvParser");
const { logRequest } = require("../middleware/employees.middleware");
const { validateEmployee } = require("../validator/employees.validator");

router.get("/", function (req, res) {
  return res.json({ message: "App is running" });
});

router.get("/count", countEmployees);
router.post("/create", validateEmployee, createEmployee);
router.post("/createbulk", upload.single("file"), parseCSV, createBulkEmployee);
router.get("/view", getEmployees);
router.get("/search", searchEmployees);

module.exports = router;
