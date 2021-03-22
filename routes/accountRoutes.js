const router = require('express').Router();
const accountController = require('../controllers/accountController');

// My profile Route
router.get('/profile', accountController.profileGet);