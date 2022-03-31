const {Router} = require("express");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../middleware/auth");

//localhost/user/infor
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/infor', auth, userController.getUser); //auth
router.get('/logout', userController.logout);
router.get('/refresh_token', userController.refreshToken);
router.patch('/addcart', auth, userController.addCart);
router.put('/update/:id', auth, userController.updateUser);

module.exports = router;