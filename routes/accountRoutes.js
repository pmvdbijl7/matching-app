const router = require('express').Router();
const accountController = require('../controllers/accountController');
const verifyAccess = require('../controllers/verifyAccessController');
const uploadController = require('../controllers/uploadController');

// Your profile Route
router.get('/account/profile', verifyAccess, accountController.profileGet);

// Edit your profile Routes
router.get('/account/edit', verifyAccess, accountController.editGet);
router.post(
	'/account/edit',
	verifyAccess,
	uploadController.upload,
	accountController.editPost
);

// Delete account Routes
router.get('/account/delete', verifyAccess, accountController.deleteGet);
router.post('/account/delete', verifyAccess, accountController.deletePost);

// Change password Routes
router.get('/account/edit-password', verifyAccess, accountController.editPasswordGet);
router.post('/account/edit-password', verifyAccess, accountController.editPasswordPost);

module.exports = router;
