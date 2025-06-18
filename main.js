const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const Stripe = require('stripe')
const cors = require("cors");
const Product = require("./models/Product")


dotenv.config()

const app = express();
const stripe = Stripe(process.env.test_secret_key)

app.use(cors({
  origin: "https://stripe-api-theta.vercel.app",
  credentials: true,
}));
app.use(express.static('public'))
app.use(express.json())


// Connect to MongoDb
mongoose.connect(process.env.mongodb_uri)
  .then(() => {
    console.log('\x1b[32mMongoDB connected\x1b[0m');
  })
  .catch(err => {
    console.error('\x1b[31mMongoDB connection error:\x1b[0m', err);
  });



const calculateOrderAmount = async (items) => {
  let total = 0;

  for (const item of items) {
    const product = await Product.findOne({ productId: item.id });
    if (!product) throw new Error(`Invalid product: ${item.id}`);
    total += product.price * item.quantity;
  }

  return total;
}

app.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;

  try {
    const line_items = [];

    for (const item of cart) {
      const product = await Product.findOne({ productId: item.id });
      if (!product) throw new Error(`Invalid product: ${item.id}`);

      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://stripe-4z4io9sjm-otito-amugas-projects.vercel.app/success.html',
      cancel_url: 'https://stripe-4z4io9sjm-otito-amugas-projects.vercel.app/cancel.html',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create checkout session.' });
  }
});

app.listen(4242, () => console.log("\x1b[34mNode server listening on port 4242\x1b[0m"))