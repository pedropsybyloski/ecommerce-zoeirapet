const router = require('express').Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/products').get(productController.getProducts).post(productController.createProduct); //auth, authAdmin, dentro do post

router.route('/products/:id').delete(productController.deleteProduct).put(productController.updateProduct); //auth, authAdmin, 

module.exports = router;