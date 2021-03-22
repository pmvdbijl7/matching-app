const router = require('express').Router();
const accountController = require('../controllers/accountController');
const verifyAccess = require('../controllers/verifyAccessController');

// Your profile Route
router.get('/account/profile', verifyAccess, accountController.profileGet);

// Edit your profile Route
router.get('/account/edit', verifyAccess, accountController.editGet);
router.post('/account/edit', verifyAccess, accountController.editPost);

// Advanced account settings Route
router.get('/account/advanced', verifyAccess, accountController.advancedGet);

module.exports = router;