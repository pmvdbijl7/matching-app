const router = require('express').Router();
const createProfileController = require('../controllers/createProfileController');
const verifyAccess = require('../controllers/verifyAccessController');

router.get(
  './createprofile',
  verifyAccess,
  createProfileController.createProfileGet
);

module.exports = router;
