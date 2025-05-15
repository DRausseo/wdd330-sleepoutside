// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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
 * @param {Function} templateFn - Función que devuelve HTML para cada elemento
 * @param {HTMLElement} parentElement - Elemento en el DOM donde insertar la lista
 * @param {Array} list - Lista de objetos a renderizar
 * @param {String} position - Dónde insertar el HTML ("afterbegin", "beforeend", etc.)
 * @param {Boolean} clear - Si se debe limpiar el contenido del elemento antes
 */
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

