const router = require('express').Router();
const accountController = require('../controllers/accountController');
const verifyAccess = require('../controllers/verifyAccessController');

// My profile Route
router.get('/account/profile', verifyAccess, accountController.profileGet);

// Edit profile Route
router.get('/account/edit', verifyAccess, accountController.editGet);
router.post('/account/edit', verifyAccess, accountController.editPost);

module.exports = router;