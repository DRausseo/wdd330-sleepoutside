let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function updateCart() {
  const list = document.getElementById('cart-list');
  const totalEl = document.getElementById('cart-total');
  list.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)} `;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Eliminar';
    removeBtn.onclick = () => removeFromCart(item.name);

    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

function sortProducts() {
  const sortValue = document.getElementById('sort').value;
  const container = document.querySelector('.products');
  const items = Array.from(container.getElementsByClassName('product'));

  let sorted = items.slice();

  switch (sortValue) {
    case 'price-asc':
      sorted.sort((a, b) => getPrice(a) - getPrice(b));
      break;
    case 'price-desc':
      sorted.sort((a, b) => getPrice(b) - getPrice(a));
      break;
    case 'name-asc':
      sorted.sort((a, b) => getName(a).localeCompare(getName(b)));
      break;
    case 'name-desc':
      sorted.sort((a, b) => getName(b).localeCompare(getName(a)));
      break;
  }

  container.innerHTML = '';
  sorted.forEach(p => container.appendChild(p));
}

function getPrice(product) {
  return parseFloat(product.querySelector('p').textContent.replace('Precio: $', ''));
}

function getName(product) {
  return product.querySelector('h2').textContent.trim();
}
