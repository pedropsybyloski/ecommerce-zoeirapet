const {Router} = require("express");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../middleware/auth");

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/infor', auth, userController.getUser); //auth
router.get('/logout', userController.logout);
router.get('/refresh_token', userController.refreshToken);
router.patch('/addcart', auth, userController.addCart);

module.exports = router;