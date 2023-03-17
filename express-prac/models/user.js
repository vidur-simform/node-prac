const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product){
    //finding index of already product in cart
    const ind = this.cart.items.findIndex(p => p.productId.toString()==product._id.toString());
    console.log("p_id",product._id);
    console.log(this.cart.items);
    if(ind >= 0){
        this.cart.items[ind].quantity++;
    }else{
        this.cart.items.push({
            productId: product._id,
            quantity: 1
        });
    }
    return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
