import { supabase } from './supabase.js';

const loginBtn = document.getElementById('login-btn');
const addProductBtn = document.getElementById('add-product-btn');

loginBtn.onclick = () => {
  const password = document.getElementById('password').value;
  if(password === 'admin123') {
    document.getElementById('admin-form').style.display = 'block';
  } else {
    alert('Wrong password');
  }
};

addProductBtn.onclick = async () => {
  const name = document.getElementById('name').value;
  const desc = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const file = document.getElementById('image').files[0];

  if(!name || !desc || !price || !file) return alert('Fill all fields');

  // Upload image to Supabase storage
  const { data, error } = await supabase.storage.from('product-images').upload(file.name, file);
  if(error) return alert(error.message);

  const imageUrl = supabase.storage.from('product-images').getPublicUrl(file.name).data.publicUrl;

  // Insert product into Supabase
  const { error: insertError } = await supabase.from('products').insert([{ name, description: desc, price, image_url: imageUrl }]);
  if(insertError) return alert(insertError.message);

  alert('Product added!');
};
