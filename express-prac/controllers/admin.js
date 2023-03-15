const { findById } = require("../models/product");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "add-product",
    pageTitle: "Add Product",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  req.body.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        path: "edit-product",
        pageTitle: "Edit Product",
        editing: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = Number(req.body.productId);
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findById(id)
    .then((product) => {
      product.name = name;
      product.imageUrl = imageUrl;
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

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const user = req.body.user;
  user
    .createProduct({
      name,
      imageUrl,
      price,
      description,
    })
    .then((result) => {
      console.log("PRODUCT CREATED");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("PRODUCT DELETED!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.body.user.getProducts().then((products) => {
    res
      .render("admin/list-products", {
        path: "list-products",
        products: products,
        pageTitle: "Admin Product List",
      })
      .catch((err) => console.log(err));
  });
};