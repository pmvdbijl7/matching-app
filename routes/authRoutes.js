const router = require('express').Router();
const authController = require('../controllers/authController');
const verifyAccess = require('../controllers/verifyAccessController');
const passport = require('passport');

// Register Routes
router.get('/signup', authController.registerGet);
router.post('/signup', authController.registerPost);
// Google
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/signin' }),
	authController.googleCb
);

// Login Routes
router.get('/signin', authController.loginGet);
router.post('/signin', authController.loginPost);
router.get('/signin/preferences', verifyAccess, authController.preferencesGet);
router.post(
	'/signin/preferences',
	verifyAccess,
	authController.preferencesPost
);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
