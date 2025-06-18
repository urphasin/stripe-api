// seed.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.mongodb_uri)
.then(async () => {
  await Product.deleteMany({}); // clear existing
  await Product.insertMany([
    { productId: "prod_A", name: "Product A", price: 1000 },
    { productId: "prod_B", name: "Product B", price: 2000 },
  ]);
  console.log("Products seeded.");
  process.exit();
})
.catch(console.error);
