// src/js/CheckoutProcess.mjs
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
    this.displayOrderTotals(); // optional for preview
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((acc, item) => acc + item.FinalPrice * item.quantity, 0);
    document.querySelector(`${this.outputSelector} #subtotal`).textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const itemCount = this.list.reduce((acc, item) => acc + item.quantity, 0);
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (itemCount - 1) * 2;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #shipping`).textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #orderTotal`).textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems() {
    return this.list.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity
    }));
  }

  async checkout(form) {
    const formElement = document.forms[form];
    const formData = new FormData(formElement);
    const order = {};

    formData.forEach((value, key) => {
      order[key] = value;
    });

    order.orderDate = new Date().toISOString();
    order.items = this.packageItems();
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    order.orderTotal = this.orderTotal.toFixed(2);

    try {
      const response = await this.services.checkout(order);
      return response;
    } catch (err) {
      console.error("Checkout failed", err);
    }
  }
}
