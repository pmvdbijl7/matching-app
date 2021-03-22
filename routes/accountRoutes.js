const router = require('express').Router();
const accountController = require('../controllers/accountController');
const verifyAccess = require('../controllers/verifyAccessController');

// Your profile Route
router.get('/account/profile', verifyAccess, accountController.profileGet);

// Edit your profile Routes
router.get('/account/edit', verifyAccess, accountController.editGet);
router.post('/account/edit', verifyAccess, accountController.editPost);

// Delete account Routes
router.get('/account/delete', verifyAccess, accountController.deleteGet);
router.post('/account/delete', verifyAccess, accountController.deletePost);

module.exports = router;