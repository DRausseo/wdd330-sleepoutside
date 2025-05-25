async function loadTemplate(selector, filePath) {
  const element = document.querySelector(selector);
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    element.innerHTML = html;
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err);
  }
}

// Inyectar el header y el footer
loadTemplate('header', '/partials/header.html');
loadTemplate('footer', '/partials/footer.html');

