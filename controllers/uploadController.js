const multer = require('multer');
const path = require('path');

// Set Uploads Storage Engine
const uploadStorage = multer.diskStorage({
	// Determine uploads save
	destination: (req, file, cb) => {
		cb(null, 'public/uploads');
	},
	// Determine file name
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
