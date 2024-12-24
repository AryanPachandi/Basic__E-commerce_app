const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const usersINFO = new Schema({  //user could be seller or consumer
    name: { type: String, required: true },          
    emailID: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },      
    role: { type: String, enum: ['seller', 'consumer'], required: true } 
});


const productsINFO = new Schema({
    name: { type: String, required: true },          // Product name
    description: { type: String, required: true },   // Product description
    price: { type: Number, required: true, min: 0 }, 
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the seller (usersINFO collection)
    is_available: { type: Boolean, default: true }  
});


const orderSchema = new mongoose.Schema({
    consumer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        price: { type: Number, required: true }
      }
    ],
    total_price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
  });
  


  const usersINFOModel = mongoose.model('User',usersINFO);
  const ProductINFOModel = mongoose.model('Product',productsINFO);
  const OrdersModel = mongoose.model('Orders',orderSchema);

  module.exports = {
    usersINFOModel,
    ProductINFOModel,
    OrdersModel,
  }

  