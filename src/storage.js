// Simple persistent storage using localStorage
export function saveImage(dataUrl) {
  const existing = JSON.parse(localStorage.getItem("images") || "[]");
  existing.push(dataUrl);
  localStorage.setItem("images", JSON.stringify(existing));
}

export function loadImages() {
  return JSON.parse(localStorage.getItem("images") || "[]");
}
