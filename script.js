/* ============================================================
   15 VUELTAS AL SOL — script.js
   Olympus Estudio Fotográfico
   ============================================================

   📁 ESTRUCTURA DE CARPETAS (junto al index.html):
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── CATERING/
   ├── CEREMONIA/
   ├── DECORACIÓN/    ← con tilde (o ajusta CATEGORY_META si no la tiene)
   ├── FIESTA/
   ├── FOTOS PASTEL/  ← con espacio
   ├── INVITADOS/
   └── PRE-FIESTA/    ← con guión
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   CONFIGURACIÓN DE FOTOS
   Todos los archivos detectados en las imágenes aportadas.
   Si algún nombre tiene espacio o carácter especial está
   incluido exactamente como aparece en el explorador.
══════════════════════════════════════════════════════════ */
const FOTOS_CONFIG = {

  /* ── CATERING (5 fotos) ─────────────────────────────── */
  CATERING: [
    'IMG_6747.jpg',
    'IMG_6749.jpg',
    'IMG_6750.jpg',
    'IMG_6753.jpg',
    'IMG_6754.jpg',
  ],

  /* ── CEREMONIA (50 fotos) ───────────────────────────── */
  CEREMONIA: [
    
  ],

  /* ── DECORACIÓN (30 fotos) ──────────────────────────── */
  DECORACION: [
    'IMG_6336.jpg',
    'IMG_6337.jpg',
    'IMG_6338.jpg',
    'IMG_6341.jpg',
    'IMG_6344.jpg',
    'IMG_6346.jpg',
    'IMG_6347.jpg',
    'IMG_6348.jpg',
    'IMG_6349.jpg',
    'IMG_6350.jpg',
    'IMG_6352.jpg',
    'IMG_6356.jpg',
    'IMG_6358.jpg',
    'IMG_6359.JPG',
    'IMG_6361.JPG',
    'IMG_6362.JPG',
    'IMG_6364.JPG',
    'IMG_6366.JPG',
    'IMG_6370.JPG',
    'IMG_6371.JPG',
    'IMG_6372.JPG',
    'IMG_6373.JPG',
    'IMG_6374.JPG',
    'IMG_6378.JPG',
    'IMG_6381.JPG',
    'IMG_6383.JPG',
    'IMG_6384.JPG',
    'IMG_6388.JPG',
    'IMG_6391.JPG',
    'IMG_6394.JPG',
  ],

  /* ── FIESTA (33 fotos) ──────────────────────────────── */
  FIESTA: [
    
  ],

  /* ── FOTOS PASTEL (38 fotos) ────────────────────────── */
  FOTOS_PASTEL: [
    'IMG_6782 copia.jpg',   /* ← nombre con espacio, tal como está en disco */
    'IMG_6790.JPG',
    'IMG_6792.JPG',
    'IMG_6800.JPG',
    'IMG_6810.JPG',
    'IMG_6814.JPG',
    'IMG_6815.JPG',
    'IMG_6817.JPG',
    'IMG_6818.JPG',
    'IMG_6820.JPG',
    'IMG_6821.JPG',
    'IMG_6822.JPG',
    'IMG_6823.JPG',
    'IMG_6824.JPG',
    'IMG_6825.JPG',
    'IMG_6826.JPG',
    'IMG_6829.JPG',
    'IMG_6830.JPG',
    'IMG_6831.JPG',
    'IMG_6832.JPG',
    'IMG_6835.JPG',
    'IMG_6835a.jpg',        /* ← variante "a" */
    'IMG_6836.JPG',
    'IMG_6837.JPG',
    'IMG_6838.JPG',
    'IMG_6839.JPG',
    'IMG_6841.JPG',
    'IMG_6843.JPG',
    'IMG_6844.JPG',
    'IMG_6845.JPG',
    'IMG_6846 copia 2.jpg', /* ← nombre con espacios */
    'IMG_6847.JPG',
    'IMG_6850.JPG',
    'IMG_6851.JPG',
    'IMG_6852.JPG',
    'IMG_6853.JPG',
    'IMG_6855.JPG',
    'IMG_6860.JPG',
  ],

  /* ── INVITADOS (12 fotos) ───────────────────────────── */
  INVITADOS: [
    'IMG_6471.JPG',
    'IMG_6473.JPG',
    'IMG_6474.JPG',
    'IMG_6475.JPG',
    'IMG_6477.JPG',
    'IMG_6485.JPG',
    'IMG_6486.JPG',
    'IMG_6827.JPG',
    'IMG_6834.JPG',
    'IMG_6917.JPG',
    'IMG_6918.JPG',
    'IMG_6920.JPG',
  ],

  /* ── PRE-FIESTA (25 fotos) ──────────────────────────── */
  PRE_FIESTA: [
    
  ],
};

/* ══════════════════════════════════════════════════════════
   METADATOS DE CATEGORÍAS
   'folder' = nombre exacto de la carpeta en disco
══════════════════════════════════════════════════════════ */
const CATEGORY_META = {
  CATERING:     { label: 'Catering',     folder: 'CATERING',      icon: '🍽' },
  CEREMONIA:    { label: 'Ceremonia',    folder: 'CEREMONIA',     icon: '🌸' },
  DECORACION:   { label: 'Decoración',   folder: 'DECORACION',    icon: '🎀' },
  FIESTA:       { label: 'Fiesta',       folder: 'FIESTA',        icon: '✨' },
  FOTOS_PASTEL: { label: 'Fotos Pastel', folder: 'FOTOS_PASTEL',  icon: '🎂' },
  INVITADOS:    { label: 'Invitados',    folder: 'INVITADOS',     icon: '💛' },
  PRE_FIESTA:   { label: 'Pre-Fiesta',   folder: 'PRE-FIESTA',    icon: '🌟' },
};

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL
══════════════════════════════════════════════════════════ */
let allPhotos    = [];
let filtered     = [];
let currentIndex = 0;

/* ══════════════════════════════════════════════════════════
   CONSTRUCCIÓN DEL LISTADO
══════════════════════════════════════════════════════════ */
function buildPhotoList() {
  allPhotos = [];
  Object.entries(FOTOS_CONFIG).forEach(([catKey, files]) => {
    const meta = CATEGORY_META[catKey];
    files.forEach(filename => {
      allPhotos.push({
        src:      `${meta.folder}/${filename}`,
        category: catKey,
        label:    meta.label,
        filename,
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   RENDERIZADO DE GALERÍA
══════════════════════════════════════════════════════════ */
function renderGallery(category) {
  const grid       = document.getElementById('masonryGrid');
  const emptyState = document.getElementById('emptyState');
  const countEl    = document.getElementById('photoCount');

  filtered = category === 'all'
    ? [...allPhotos]
    : allPhotos.filter(p => p.category === category);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    countEl.textContent = '0 fotografías';
    return;
  }

  emptyState.style.display = 'none';
  countEl.textContent = `${filtered.length} fotografía${filtered.length !== 1 ? 's' : ''}`;

  filtered.forEach((photo, idx) => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.style.animationDelay = `${Math.min(idx * 30, 700)}ms`;

    const img = document.createElement('img');
    img.src      = photo.src;
    img.alt      = `${photo.label} — foto ${idx + 1}`;
    img.loading  = 'lazy';
    img.decoding = 'async';

    const overlay = document.createElement('div');
    overlay.className = 'masonry-item__overlay';
    overlay.innerHTML = `
      <div class="masonry-item__overlay-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      </div>`;

    item.appendChild(img);
    item.appendChild(overlay);
    item.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(item);
  });
}

/* ══════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════ */
const lightbox = document.getElementById('lightbox');
const lbImage  = document.getElementById('lbImage');
const lbLoader = document.getElementById('lbLoader');
const lbCat    = document.getElementById('lbCategory');
const lbIdx    = document.getElementById('lbIndex');

function openLightbox(index) {
  currentIndex = index;
  showPhoto(currentIndex);
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

function showPhoto(index) {
  const photo = filtered[index];
  if (!photo) return;

  lbImage.classList.add('is-loading');
  lbLoader.classList.add('is-spinning');

  const tmp = new Image();
  tmp.onload = () => {
    lbImage.src = photo.src;
    lbImage.alt = `${photo.label} — foto ${index + 1}`;
    lbImage.classList.remove('is-loading');
    lbLoader.classList.remove('is-spinning');
  };
  tmp.onerror = () => {
    lbImage.classList.remove('is-loading');
    lbLoader.classList.remove('is-spinning');
  };
  tmp.src = photo.src;

  lbCat.textContent = photo.label;
  lbIdx.textContent = `${index + 1} / ${filtered.length}`;
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
  showPhoto(currentIndex);
}
function nextPhoto() {
  currentIndex = (currentIndex + 1) % filtered.length;
  showPhoto(currentIndex);
}

/* Eventos */
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); prevPhoto(); });
document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); nextPhoto(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
});

/* Swipe táctil */
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 48) dx < 0 ? nextPhoto() : prevPhoto();
});

/* ══════════════════════════════════════════════════════════
   NAVEGACIÓN DE CATEGORÍAS
══════════════════════════════════════════════════════════ */
document.getElementById('categoryNav').addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;

  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  renderGallery(btn.dataset.category);

  document.getElementById('galeria').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ══════════════════════════════════════════════════════════
   AÑO EN FOOTER
══════════════════════════════════════════════════════════ */
document.getElementById('currentYear').textContent = new Date().getFullYear();

/* ══════════════════════════════════════════════════════════
   CANVAS DE ESTRELLAS
══════════════════════════════════════════════════════════ */
(function initStars() {
  const canvas = document.getElementById('starsCanvas');
  const ctx    = canvas.getContext('2d');
  let stars    = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    stars = Array.from({ length: 200 }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.3 + 0.2,
      a:    Math.random(),
      da:   (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      gold: Math.random() < 0.14,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a = Math.max(0.05, Math.min(1, s.a + s.da));
      if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? `rgba(245,196,48,${s.a * 0.75})`
        : `rgba(250,248,242,${s.a * 0.55})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
})();

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
buildPhotoList();
renderGallery('all');

/* ── Resumen en consola ─────────────────────────────────── */
const total = Object.values(FOTOS_CONFIG).reduce((a, b) => a + b.length, 0);
console.info(
  `%c✦ 15 Vueltas al Sol — Olympus Estudio%c\n${total} fotografías cargadas en ${Object.keys(FOTOS_CONFIG).length} categorías.`,
  'color:#F5C430;font-weight:bold;font-size:13px;',
  'color:#9B59D6;font-size:11px;'
);
