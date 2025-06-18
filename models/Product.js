const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: String,
  price: Number, // in cents
});

module.exports = mongoose.model('Product', productSchema);