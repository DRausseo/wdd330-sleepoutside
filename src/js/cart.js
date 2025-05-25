import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage, setLocalStorage, removeItemFromCart } from "./utils.mjs";
import { updateCartCounter } from "./utils.mjs";

loadHeaderFooter();

function renderCartItem(product) {
  const total = (product.price * product.quantity).toFixed(2);
  return `
    <tr data-id="${product.Id}">
      <td>${product.Name}</td>
      <td><img src="${product.Images.PrimaryMedium}" alt="${product.Name}"></td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>$${total}</td>
      <td><button class="remove-item">Remove</button></td>
    </tr>
  `;
}

function calculateCartTotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
}

function renderCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartTableBody = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  cartTableBody.innerHTML = "";

  if (cartItems.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="6">Your cart is empty</td></tr>`;
    totalElement.textContent = "0.00";
    return;
  }

  cartItems.forEach((item) => {
    cartTableBody.innerHTML += renderCartItem(item);
  });

  totalElement.textContent = calculateCartTotal(cartItems);

  addRemoveItemListeners();
}

function addRemoveItemListeners() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      const itemId = row.getAttribute("data-id");
      removeItemFromCart(itemId);
      renderCart();
      updateCartCounter();
    });
  });
}

document.getElementById("clear-cart").addEventListener("click", () => {
  setLocalStorage("so-cart", []);
  renderCart();
  updateCartCounter();
});

document.getElementById("checkout").addEventListener("click", () => {
  alert("Checkout is not implemented yet.");
});

renderCart();
