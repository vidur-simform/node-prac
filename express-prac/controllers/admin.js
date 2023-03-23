const Product = require("../models/product");
const Order = require("../models/order");
const { validationResult } = require('express-validator/check');
const fileHelper = require('../utils/file');

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "add-product",
    pageTitle: "Add Product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  if (!image) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: 'add-product',
      editing: false,
      hasError: true,
      product: {
        name: name,
        price: price,
        description: description
      },
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: 'add-product',
      editing: false,
      hasError: true,
      product: {
        name: name,
        price: price,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = '/' + image.path;

  const user = req.body.user;
  const product = new Product({
    name,
    imageUrl,
    price,
    description,
    userId: user
  });
  product.save()
    .then((result) => {
      console.log("PRODUCT CREATED");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        path: "edit-product",
        pageTitle: "Edit Product",
        editing: true,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const name = req.body.name;
  const image = req.file;

  // const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;


  const errors = validationResult(req);

  Product.findById(id)
    .then((product) => {
      product.name = name;
      if (image) {
        const filename = product.imageUrl.toString().substring(1);
        fileHelper.deleteFile(filename);
        product.imageUrl = '/' + image.path;
      }
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      const filename = product.imageUrl.toString().substring(1);
      fileHelper.deleteFile(filename);
      return Product.findByIdAndDelete(prodId);
    })
    .then(() => {
      console.log("PRODUCT DELETED!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/list-products", {
        path: "list-products",
        products: products,
        pageTitle: "Admin Product List",
      });
    })
    .catch((err) => console.log(err));
};


