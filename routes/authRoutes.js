const router = require('express').Router();
const authController = require('../controllers/authController');

// Register Routes
router.get('/signup', authController.registerGet);
router.post('/signup', authController.registerPost);

// Login Routes
router.get('/signin', authController.loginGet);
router.post('/signin', authController.loginPost);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
