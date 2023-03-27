const fs = require('fs');
const path = require('path');

const Product = require('../models/product');
const Order = require('../models/order');
const PDFDocument = require('pdfkit');

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

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.body.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postOrder = (req, res, next) => {
    req.body.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(e=>{
                return { product: {...e.productId}, quantity:e.quantity}
            });
            const order = new Order({
                user: {
                    email: req.body.user.email,
                    userId: req.body.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.body.user.clearCart();
        })
        .then(() => {
            res.redirect('/shop/orders');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
      .then(order => {
        if (!order) {
          return next(new Error('No order found.'));
        }
        // if (order.user.userId.toString() !== req.body.user._id.toString()) {
        //   return next(new Error('Unauthorized'));
        // }
        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName);
  
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          'inline; filename="' + invoiceName + '"'
        );
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);
  
        pdfDoc.fontSize(26).text('Invoice', {
          underline: true
        });
        pdfDoc.text('-----------------------');
        let totalPrice = 0;
        order.products.forEach(prod => {
          totalPrice += prod.quantity * prod.product.price;
          pdfDoc
            .fontSize(14)
            .text(
              prod.product.name +
              ' - ' +
              prod.quantity +
              ' x '+
              prod.product.price
            );
        });
        pdfDoc.text('---');
        pdfDoc.fontSize(20).text('Total Price: ' + totalPrice);
  
        pdfDoc.end();
  
      })
      .catch(err => next(err));
  };
  