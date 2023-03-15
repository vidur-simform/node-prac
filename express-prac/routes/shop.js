const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/products',shopController.getProducts);
router.get('/cart',shopController.getCart);
router.post('/add-to-cart',shopController.addToCart);
router.post('/delete-from-cart',shopController.postCartDeleteProduct);



module.exports = router;
