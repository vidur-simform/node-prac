const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);
const getDataFromFile = cb => {
    fs.readFile(p, (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    })
};

module.exports = class Product {
    constructor(id, name, imageUrl, description, price) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = Number(price);
    }
    save() {
        getDataFromFile((products)=>{
            if(this.id){
                const ind = products.findIndex((p)=>this.id===p.id);
                products[ind] = this;

            }else{
                this.id = Date.now();
                products.push(this);
            }
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if(err){
                    console.log(err);
                }
            });
        })
    }
    static deleteById(id) {
        getDataFromFile((products)=>{
            id = Number(id);
            const updatedProducts = products.filter((prod) => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(err){
                    console.log(err);
                }
            });
        });
    }
    static findById(id, cb) {
        getDataFromFile((products)=>{
            id = Number(id);
            const product = products.find((p) => p.id===id);
            cb(product);
        });
    }
    static fetchAllProducts(cb){
        getDataFromFile(cb);
    }
}