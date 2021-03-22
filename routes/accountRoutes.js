const router = require('express').Router();
const accountController = require('../controllers/accountController');
const verifyAccess = require('../controllers/verifyAccessController');

// My profile Route
router.get('/profile', verifyAccess, accountController.profileGet);

module.exports = router;