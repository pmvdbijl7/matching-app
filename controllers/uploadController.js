const multer = require('multer');
const path = require('path');

// Set Uplaods Storage Engine
const uploadStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads');
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

// File Upload
const upload = multer({
	storage: uploadStorage,
}).single('profile_image');

module.exports = { upload };
