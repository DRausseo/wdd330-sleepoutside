// src/js/checkout.js
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Cargar encabezado y pie de página
loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.getElementById("checkout-form").addEventListener("submit", async e => {
  e.preventDefault();

  const form = document.forms["checkout-form"];
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  checkout.calculateOrderTotal();
  const result = await checkout.checkout("checkout-form");

  if (result && result.success) {
    localStorage.removeItem("so-cart");
    // Redirigir a la página de confirmación si el pedido fue exitoso
    window.location.href = "/checkout/success.html";
  } else {
    // Mostrar error si algo sale mal
    alert("Something went wrong. Please try again.");
  }
});

