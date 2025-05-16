function showMenu(cuisine) {
  document.querySelectorAll('.menu-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(cuisine).classList.add('active');
  const buttons = ['italian', 'chinese', 'mexican', 'indian'];
  document.querySelectorAll('nav button')[buttons.indexOf(cuisine)].classList.add('active');
}

// Cart logic
let cart = [];
function addToCart(name, price) {
  const idx = cart.findIndex(item => item.name === name);
  if (idx !== -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
}
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  renderCart();
}
function changeQty(name, delta) {
  const idx = cart.findIndex(item => item.name === name);
  if (idx !== -1) {
    cart[idx].qty += delta;
    if (cart[idx].qty < 1) removeFromCart(name);
  }
  renderCart();
}
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = '<em>Your cart is empty.</em>';
  } else {
    cart.forEach(item => {
      total += item.price * item.qty;
      cartItems.innerHTML += `
        <div class="cart-item">
          <span>${item.name} x${item.qty}</span>
          <span>
            ₹${item.price * item.qty}
            <button class="remove-btn" onclick="changeQty('${item.name}', -1)">-</button>
            <button class="remove-btn" onclick="changeQty('${item.name}', 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">x</button>
          </span>
        </div>
      `;
    });
  }
  cartTotal.textContent = `Total: ₹${total}`;
}
// Payment logic
function handlePayment(event) {
  event.preventDefault();
  if (cart.length === 0) {
    document.getElementById('success-message').textContent = "Please add items to your cart!";
    return false;
  }
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  document.getElementById('success-message').textContent =
    `Payment successful! Method: ${paymentMethod}. Thank you for your order!`;
  cart = [];
  renderCart();
  setTimeout(() => {
    document.getElementById('success-message').textContent = '';
  }, 4000);
  return false;
}
// Initial render
renderCart();
