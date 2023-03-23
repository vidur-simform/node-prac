const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/isAuth');

router.get('/products',shopController.getProducts);
router.get('/orders', isAuth, shopController.getOrders);
router.get('/orders/:orderId', isAuth, shopController.getInvoice);

router.get('/cart', isAuth, shopController.getCart);
router.post('/add-to-cart', isAuth, shopController.addToCart);
router.post('/delete-from-cart', isAuth, shopController.postCartDeleteProduct);
router.post('/create-order', isAuth, shopController.postOrder);



module.exports = router;
