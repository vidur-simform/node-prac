const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        path : 'add-product',
        pageTitle: 'Add Product',
        editing: false
    });
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId)
    Product.findById(prodId,(product)=>{
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product :product,
            path : 'edit-product',
            pageTitle: 'Edit Product',
            editing: true
        });
    });
};

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, name, imageUrl, description, price);
    product.save();
    res.redirect('/');
};
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAllProducts((products) => {
        res.render('admin/list-products', {
            path : 'list-products',
            products: products,
            pageTitle: "Admin Product List"
        })
    });
};
