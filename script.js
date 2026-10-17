const products = [
  {
    id: 1,
    name: 'Sundown Classic',
    price: 89,
    description: 'Lightweight acetate frames with a timeless silhouette.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Harbor Edge',
    price: 119,
    description: 'Sleek polarized shades for city driving and beach days.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Summit Lens',
    price: 99,
    description: 'A bold statement look with UV400 protection and durability.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Golden Hour',
    price: 129,
    description: 'Warm-toned lenses designed for outdoor adventures and style.',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=80'
  }
];

const cart = [];

const productGrid = document.querySelector('#products');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const cartModal = document.querySelector('#cart-modal');
const cartBtn = document.querySelector('#cart-btn');
const closeCart = document.querySelector('#close-cart');
const checkoutBtn = document.querySelector('#checkout-btn');
const yearEl = document.querySelector('#year');

function renderProducts() {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <div class="product-top">
          <h3>${product.name}</h3>
          <span class="price">$${product.price}</span>
        </div>
        <p>${product.description}</p>
        <button class="add-btn" data-id="${product.id}">Add to cart</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    cartItems.innerHTML = cart.map((item) => `
      <li>
        <span>${item.name} × ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </li>
    `).join('');
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toFixed(2);
}

function toggleCart(open) {
  cartModal.classList.toggle('open', open);
  cartModal.setAttribute('aria-hidden', String(!open));
}

cartBtn.addEventListener('click', () => toggleCart(true));
closeCart.addEventListener('click', () => toggleCart(false));
cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) toggleCart(false);
});

checkoutBtn.addEventListener('click', () => {
  alert('Thanks for shopping with Sunglass Shop!');
  cart.length = 0;
  renderCart();
  toggleCart(false);
});

yearEl.textContent = new Date().getFullYear();
renderProducts();
renderCart();
