// src/js/checkout.js
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.getElementById("checkout-form").addEventListener("submit", async e => {
  e.preventDefault();
  checkout.calculateOrderTotal();
  const result = await checkout.checkout("checkout-form");

  if (result && result.success) {
    alert("Order placed successfully!");
    localStorage.removeItem("so-cart");
    window.location.href = "/index.html";
  } else {
    alert("Something went wrong. Please try again.");
  }
});
