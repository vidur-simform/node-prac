const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/products', {
                products: products,
                pageTitle: 'Products',
                path: 'products'
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.body.user
        .populate('cart.items.productId')
        .then(user => {
            const prods = user.cart.items.map((ele) => {
                return {
                    _id: ele.productId._id,
                    name: ele.productId.name,
                    imageUrl: ele.productId.imageUrl,
                    price: ele.productId.price,
                    quantity: ele.quantity
                };
            });

            res.render('shop/cart', {
                path: 'cart',
                pageTitle: 'Your Cart',
                products: prods
            });
        })
        .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.body.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/shop/cart');
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.body.user.removeFromCart(prodId)
        .then(result => {
            res.redirect('/shop/cart');
        })
        .catch(err => console.log(err));
}; 