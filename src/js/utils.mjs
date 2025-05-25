// wrapper for querySelector...returns matching element 
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * Obtiene el valor de un parámetro desde la URL
 * @param {string} param El nombre del parámetro a buscar
 * @returns {string|null} El valor del parámetro si existe, si no, null
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * Renderiza una lista en el DOM usando una función plantilla.
 */
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

/**
 * Renderiza contenido estático (como el header/footer).
 */
export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

/**
 * Carga un archivo HTML desde una ruta.
 */
export async function loadTemplate(path) {
  const res = await fetch(path);
  const text = await res.text();
  return text;
}

/**
 * Inserta dinámicamente el header y footer.
 */
export async function loadHeaderFooter() {
  const header = await loadTemplate('/partials/header.html');
  const footer = await loadTemplate('/partials/footer.html');
  const headerEl = document.querySelector('header');
  const footerEl = document.querySelector('footer');
  renderWithTemplate(header, headerEl);
  renderWithTemplate(footer, footerEl);
}
