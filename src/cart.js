const cartItemsDiv = document.getElementById('cart-items');
const totalSpan = document.getElementById('total');

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function renderCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'border p-2 mb-2';
    div.innerHTML = `${item.name} x ${item.quantity} - $${item.price * item.quantity}
      <button class="ml-2 bg-red-500 text-white px-2 rounded remove">Remove</button>`;
    div.querySelector('.remove').onclick = () => {
      cart = cart.filter(c => c.id !== item.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
    cartItemsDiv.appendChild(div);
  });
  totalSpan.textContent = total.toFixed(2);
}

renderCart();
