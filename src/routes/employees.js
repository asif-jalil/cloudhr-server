const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const { countEmployees, createEmployee } = require('../controller/employees.controller');
const { logRequest } = require('../middleware/employees.middleware');

router.get('/', function (req, res) {
	return res.json({ message: 'App is running' });
});

router.get('/count', countEmployees);
router.post('/create', upload.single('file'), createEmployee);

module.exports = router;
