import { saveImage, loadImages } from './storage.js';
import { fileToDataURL } from './upload.js';

const input = document.getElementById('fileInput');
const saveBtn = document.getElementById('saveBtn');
const gallery = document.getElementById('gallery');

function renderGallery() {
  gallery.innerHTML = "";
  loadImages().forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "w-full rounded shadow";
    gallery.appendChild(img);
  });
}

saveBtn.onclick = async () => {
  if (!input.files.length) return alert("Choose a file first");
  const dataUrl = await fileToDataURL(input.files[0]);
  saveImage(dataUrl);
  renderGallery();
};

renderGallery();
