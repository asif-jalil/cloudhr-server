const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const {getEmployees, createEmployee} = require('../controller/employees.controller');
const { logRequest } = require('../middleware/employees.middleware');

router.get('/', function (req, res) {
	return res.json({ message: 'App is running' });
});

router.get('/view', getEmployees);
router.post('/create', upload.single('file'), logRequest, createEmployee);


module.exports = router;
