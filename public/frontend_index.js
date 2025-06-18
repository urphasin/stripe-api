const stripe = Stripe(
  "pk_test_51QpaRu4CkA0hR3oOwNNjIvNDP5QusN84MvnvHkkkEC6rZNy4TNXn5NhO3zF2je0u0pzt1RWKgHtlSGgMBzfc1sZe00l5MuRf7e"
);

// Local cart state
let cart = [];

function addToCart(productId, name, price) {
  const qty = parseInt(
    document.getElementById(`qty_${productId}`).value
  );
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: productId, name, price, quantity: qty });
  }

  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} = $${(
      (item.price * item.quantity) /
      100
    ).toFixed(2)}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = (total / 100).toFixed(2);
}

async function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  try {
    const res = await fetch(
      "https://stripe-api-zk62.onrender.com/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      }
    );

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // 🔁 Redirect to Stripe Checkout
    } else {
      alert("Something went wrong.");
    }
  } catch (err) {
    console.error(err);
    alert("Checkout failed");
  }
}
