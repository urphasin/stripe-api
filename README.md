# 🛒 Stripe Checkout Store (Node.js + MongoDB)

This project is a simple 2-product online store using:
- HTML + Tailwind CSS + Vanilla JavaScript (frontend)
- Node.js + Express + MongoDB (backend)
- Stripe Checkout (for secure payments)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/stripe-checkout-store.git
cd stripe-checkout-store
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env File
In the project root, create a `.env` file to store sensitive keys:
```bash
touch .env
```

Add the following:
```bash
# MongoDB connection URI
mongodb_uri=mongodb://localhost:27017/stripe-store

# Stripe test secret key
test_secret_key=sk_test_your_stripe_secret_key_here
```

🔐 **Do not commit your .env file. It's already listed in .gitignore.**

### 4. Seed the Database
Run this script to add sample products to MongoDB:
```bash
node seed/seed.js
```

### 5. Start the Server
```bash
node server.js
```

Your backend is now live at:
```
http://localhost:4242
```

You can open the store by navigating to:
```
http://localhost:4242/index.html
```

## ✅ Test Payment Cards

Use this Stripe test card during checkout:
- **Card Number:** 4242 4242 4242 4242
- **Expiry Date:** Any future date
- **CVC:** Any 3 digits
- **ZIP:** Any 5-digit ZIP

## 🧾 Success & Cancel Pages

After a successful payment, you'll be redirected to:
- ✅ `success.html`
- ❌ `cancel.html`

These pages are also in the `/public` folder and use Tailwind via CDN.

## 📁 Folder Structure

```
.
├── models/
│   └── Product.js       # Mongoose schema
├── public/
│   ├── index.html       # Storefront UI
│   ├── success.html     # Payment success page
│   └── cancel.html      # Payment cancelled page
├── seed/
│   └── seed.js          # MongoDB seeder
├── server.js            # Express backend
├── .env                 # Your keys (DO NOT COMMIT)
├── .gitignore
└── package.json
```

## 🙌 Credits

Built with:
- Stripe API
- Tailwind CSS
- MongoDB
- Express.js

## 📜 License

MIT License. Use this freely and make it better!