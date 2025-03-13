document.addEventListener('DOMContentLoaded', function() {
  const galeriaContainer = document.getElementById('galeria-container');
  const imageFolder = 'assets/images/galeria/images/';
  const thumbnailFolder = 'assets/images/galeria/thumbnails/';
  const jsonFile = 'assets/images/galeria/images.json';

  fetch(jsonFile)
    .then(response => response.json())
    .then(images => {
      images.forEach(image => {
        const img = document.createElement('img');
        img.src = thumbnailFolder + image;
        img.alt = 'Galería de imágenes';
        img.classList.add('thumbnail');
        img.addEventListener('click', () => showImage(image));
        galeriaContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error loading images:', error));

  function showImage(image) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    const img = document.createElement('img');
    img.src = imageFolder + image;
    img.alt = 'Imagen grande';
    img.classList.add('large-image');
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
  }

  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  prevButton.addEventListener('click', () => {
    galeriaContainer.scrollBy({
      left: -galeriaContainer.clientWidth,
      behavior: 'smooth'
    });
  });

  nextButton.addEventListener('click', () => {
    galeriaContainer.scrollBy({
      left: galeriaContainer.clientWidth,
      behavior: 'smooth'
    });
  });
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('.fixed-menu');
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});