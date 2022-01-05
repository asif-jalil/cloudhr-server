const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dir = req.originalUrl.split('/')[1];
		const imageType = /jpg|jpeg|png/;
		const isImage = imageType.test(req.mimeType);
		const filePath = `src/assets/${isImage ? 'images' : 'files'}/${dir}`;
		fs.mkdirSync(filePath, { recursive: true });
		cb(null, filePath);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});

module.exports.upload = multer({
	storage: storage,
	limits: {
		fileSize: '10000000'
	},
	fileFilter: function (req, file, cb) {
		const fileTypes = /csv/;
		const mimeType = file.mimetype === 'application/vnd.ms-excel';
		const extname = fileTypes.test(path.extname(file.originalname));
		if (mimeType && extname) {
			return cb(null, true);
		}

		cb(new Error('Give proper file format to upload'));
	}
});