import { getParam, loadHeaderFooter } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL;
const productId = getParam('product');

loadHeaderFooter();

async function getProductById(id) {
  const response = await fetch(`${baseURL}product/${id}`);
  if (!response.ok) throw new Error('Product not found');
  const data = await response.json();
  return data.Result;
}

function renderProduct(product) {
  document.getElementById('brandName').textContent = product.Brand.Name;
  document.getElementById('productName').textContent = product.NameWithoutBrand;
  document.getElementById('productImage').src = product.Images.PrimaryLarge;
  document.getElementById('productImage').alt = product.Description;
  document.getElementById('productPrice').textContent = `$${product.ListPrice}`;
  document.getElementById('productColor').textContent = product.Colors?.[0]?.ColorName || 'N/A';
  document.getElementById('productDescription').textContent = product.Description;
}

getProductById(productId).then(renderProduct).catch((err) => {
  console.error(err);
  document.querySelector('.product-detail').innerHTML = '<p>Product not found.</p>';
});
