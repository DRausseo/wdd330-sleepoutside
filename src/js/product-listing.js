import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category'); // toma la categoría desde la URL
const dataSource = new ProductData(); // ya no necesita categoría en constructor
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();
document.getElementById("category-title").textContent = `Top Products: ${category}`;
