const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/isAuth');

router.get('/products',shopController.getProducts);
router.get('/cart', isAuth, shopController.getCart);
router.post('/add-to-cart', isAuth, shopController.addToCart);
router.post('/delete-from-cart', isAuth, shopController.postCartDeleteProduct);



module.exports = router;
