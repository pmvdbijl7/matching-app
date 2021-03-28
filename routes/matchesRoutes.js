const router = require('express').Router();
const matchesController = require('../controllers/matchesController');
const verifyAccess = require('../controllers/verifyAccessController');

router.get('/matches', verifyAccess, matchesController.matchesGet);

module.exports = router;
