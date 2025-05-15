import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      console.error('Producto no encontrado');
      return;
    }
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    let cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    document.getElementById('brandName').textContent = this.product.Brand;
    document.getElementById('productName').textContent = this.product.NameWithoutBrand;
    document.getElementById('productImage').src = this.product.Image;
    document.getElementById('productImage').alt = this.product.Name;
    document.getElementById('productPrice').textContent = `$${this.product.FinalPrice}`;
    document.getElementById('productColor').textContent = this.product.Colors;
    document.getElementById('productDescription').textContent = this.product.Description;
  }
}
