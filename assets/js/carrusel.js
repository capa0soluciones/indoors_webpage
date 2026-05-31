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
        img.className = 'thumbnail';

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

// Modal de imágenes
(function () {
  const modal    = document.getElementById('img-modal');
  const modalImg = document.getElementById('img-modal-img');
  const btnPrev  = modal.querySelector('.img-modal-prev');
  const btnNext  = modal.querySelector('.img-modal-next');

  let items = [];   // [{ src, alt }]
  let current = 0;

  function getItems(group) {
    return Array.from(document.querySelectorAll('a[data-lightbox="' + group + '"]'))
      .map(a => ({ src: a.href, alt: a.dataset.title || '' }));
  }

  function show(index) {
    current = index;
    modalImg.src = items[current].src;
    modalImg.alt = items[current].alt;
    btnPrev.hidden = items.length <= 1;
    btnNext.hidden = items.length <= 1;
  }

  function openModal(group, index) {
    items = getItems(group);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    show(index);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalImg.src = '';
    items = [];
  }

  function navigate(dir) {
    show((current + dir + items.length) % items.length);
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[data-lightbox]');
    if (link) {
      e.preventDefault();
      const group = link.dataset.lightbox;
      const all   = Array.from(document.querySelectorAll('a[data-lightbox="' + group + '"]'));
      openModal(group, all.indexOf(link));
      return;
    }
    if (e.target.classList.contains('img-modal-close') || e.target === modal) {
      closeModal();
      return;
    }
    if (e.target.classList.contains('img-modal-prev')) { navigate(-1); return; }
    if (e.target.classList.contains('img-modal-next')) { navigate(+1); return; }
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(+1);
  });
})();

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