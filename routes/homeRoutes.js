const router = require('express').Router();
const homeController = require('../controllers/homeController');
const verifyAccess = require('../controllers/verifyAccessController');

router.get('/', verifyAccess, homeController.homeGet);

module.exports = router;
