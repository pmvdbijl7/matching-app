const router = require('express').Router();
const filterController = require('../controllers/filterController');
const verifyAccess = require('../controllers/verifyAccessController');

router.post('/filter/', verifyAccess, filterController.FilterGet);

module.exports = router;
