const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);
const getDataFromFile = cb =>{
    fs.readFile()
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {

    }
    static findById(id) {

    }
    static deleteById(id) {

    }
}