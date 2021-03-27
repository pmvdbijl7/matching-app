const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyAccess = require('../controllers/verifyAccessController');

router.get('/user/profile/:id', verifyAccess, userController.profileGet);
router.post('/user/profile/like', verifyAccess, userController.profileLikePost);
router.post('/user/profile/unlike', verifyAccess, userController.profileUnlikePost);

module.exports = router;