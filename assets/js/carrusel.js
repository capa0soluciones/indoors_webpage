document.addEventListener('DOMContentLoaded', function() {
  // Cargar imágenes de la galería desde el JSON
  fetch('assets/images/galeria/imagenes.json')
    .then(response => response.json())
    .then(data => {
      const galeriaContainer = document.getElementById('galeria-container');
      data.imagenes.forEach(imagen => {
        const link = document.createElement('a');
        link.href = imagen.fullsize;
        link.setAttribute('data-lightbox', 'galeria');
        link.setAttribute('data-title', imagen.caption);

        const img = document.createElement('img');
        img.src = imagen.thumbnail;
        img.alt = imagen.caption;

        link.appendChild(img);
        galeriaContainer.appendChild(link);
      });
    })
    .catch(error => console.error('Error al cargar las imágenes:', error));

  // Funcionalidad del carrusel de la galería
  const galeriaContainer = document.getElementById('galeria-container');
  const prevButton = document.querySelector('.galeria-prev');
  const nextButton = document.querySelector('.galeria-next');

  nextButton.addEventListener('click', () => {
    galeriaContainer.scrollBy({ left: galeriaContainer.clientWidth, behavior: 'smooth' });
  });

  prevButton.addEventListener('click', () => {
    galeriaContainer.scrollBy({ left: -galeriaContainer.clientWidth, behavior: 'smooth' });
  });

  // Funcionalidad del carrusel de integrantes
  const integrantesCarousel = document.getElementById('integrantes-carousel');
  const integrantesPrevButton = document.querySelector('.integrantes-prev');
  const integrantesNextButton = document.querySelector('.integrantes-next');

  integrantesNextButton.addEventListener('click', () => {
    integrantesCarousel.scrollBy({ left: integrantesCarousel.clientWidth, behavior: 'smooth' });
  });

  integrantesPrevButton.addEventListener('click', () => {
    integrantesCarousel.scrollBy({ left: -integrantesCarousel.clientWidth, behavior: 'smooth' });
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