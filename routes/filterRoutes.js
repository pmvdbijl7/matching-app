const router = require('express').Router();
const filterController = require('../controllers/filterController');

router.post('/filter/', filterController.FilterGet);

module.exports = router;
