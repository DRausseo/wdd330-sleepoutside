// utils.mjs

// Select element shortcut
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Get data from local storage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Set data in local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Add click/touchend listener
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get URL parameter by name
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a list using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = '';
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Render static HTML template into a container
export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

// Load template HTML from a path
export async function loadTemplate(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Error loading template: ${path}`);
    return await res.text();
  } catch (err) {
    console.error(err);
    return `<p>Error loading ${path}</p>`;
  }
}

// Load and render header and footer dynamically
export async function loadHeaderFooter() {
  const header = await loadTemplate('/partials/header.html');
  const footer = await loadTemplate('/partials/footer.html');
  const headerEl = document.querySelector('header');
  const footerEl = document.querySelector('footer');
  renderWithTemplate(header, headerEl);
  renderWithTemplate(footer, footerEl);
}

/**
 * Elimina un producto del carrito basado en su ID.
 * @param {string} id - El ID del producto a eliminar
 */
export function removeItemFromCart(id) {
  const cart = getLocalStorage("so-cart") || [];
  const updatedCart = cart.filter(item => item.Id !== id);
  setLocalStorage("so-cart", updatedCart);
}

/**
 * Actualiza el número de ítems del carrito mostrado en el ícono.
 */
export function updateCartCounter() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector(".cart span");

  if (badge) {
    badge.textContent = count;
  } else {
    const span = document.createElement("span");
    span.textContent = count;
    document.querySelector(".cart").appendChild(span);
  }
}

/**
 * Display a styled alert message at the top of the main content.
 * @param {string} message - The message to display
 * @param {boolean} scroll - Scroll to top of page (default true)
 */
export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");
  const existing = document.querySelector(".alert");

  if (existing) existing.remove();

  const div = document.createElement("div");
  div.classList.add("alert");
  div.innerHTML = `<p>${message}</p>`;
  main.prepend(div);

  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });

  // Optional: auto-remove after a few seconds
  setTimeout(() => div.remove(), 6000);
}
