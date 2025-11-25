import { supabase } from './supabase.js';

const grid = document.getElementById('product-grid');
const cart = JSON.parse(localStorage.getItem('cart') || '[]');

async function fetchProducts() {
  const { data: products, error } = await supabase.from('products').select('*');
  if(error) return console.error(error);

  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'border p-4 rounded shadow';
    card.innerHTML = `
      <img src="${p.image_url}" class="w-full h-48 object-cover mb-2">
      <h2 class="font-bold">${p.name}</h2>
      <p>${p.description}</p>
      <p>$${p.price}</p>
      <button class="mt-2 px-2 py-1 bg-blue-500 text-white rounded add-to-cart">Add to Cart</button>
    `;
    card.querySelector('.add-to-cart').onclick = () => {
      const existing = cart.find(c => c.id === p.id);
      if(existing) existing.quantity += 1;
      else cart.push({ ...p, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart');
    };
    grid.appendChild(card);
  });
}

fetchProducts();
