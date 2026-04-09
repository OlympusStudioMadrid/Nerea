/* ═══════════════════════════════════════════════════════════
   15 VUELTAS AL SOL  ·  app.js
   Galería desde servidor local · PHP API · Lightbox animado
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────────────────────────
   CONFIGURACIÓN
   ───────────────────────────────────────────────────────── */
const CFG = {
  API:        'api.php',           // Ruta al script PHP
  DRIVE_LINK: 'https://drive.google.com/drive/folders/1iWrt7DtsMPYcUYqSPUvTNIkNl_tuytnj?usp=sharing',
};

/* ─────────────────────────────────────────────────────────
   DEFINICIÓN DE CATEGORÍAS
   SVG icons originales (temática celestial / celebración)
   ───────────────────────────────────────────────────────── */
const CATS_DEF = [
  {
    name: 'CATERING',
    label: 'Catering',
    color: '#FFB347',
    icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Plato sol -->
      <circle cx="30" cy="34" r="14" stroke="#FFB347" stroke-width="1.5" opacity=".6"/>
      <circle cx="30" cy="34" r="9" fill="rgba(255,179,71,0.15)" stroke="#FFB347" stroke-width="1.5"/>
      <!-- Rayos como cubiertos -->
      <line x1="30" y1="6" x2="30" y2="14" stroke="#FFB347" stroke-width="2" stroke-linecap="round"/>
      <line x1="30" y1="54" x2="30" y2="62" stroke="#FFB347" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      <line x1="8"  y1="22" x2="14" y2="26" stroke="#FFB347" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
      <line x1="46" y1="42" x2="52" y2="46" stroke="#FFB347" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
      <line x1="8"  y1="46" x2="14" y2="42" stroke="#FFB347" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
      <line x1="46" y1="26" x2="52" y2="22" stroke="#FFB347" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
      <!-- Tenedor -->
      <path d="M27 26 L27 30 M29 26 L29 30 M31 26 L31 30 M28 30 L28 34 L30 34" stroke="#FFB347" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    name: 'CEREMONIA',
    label: 'Ceremonia',
    color: '#C792EA',
    icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Corona con órbita -->
      <ellipse cx="30" cy="30" rx="22" ry="7" stroke="#C792EA" stroke-width="1" opacity=".4"/>
      <!-- Base corona -->
      <path d="M14 36 L14 42 L46 42 L46 36" stroke="#C792EA" stroke-width="1.5" fill="rgba(199,146,234,0.08)"/>
      <!-- Puntas corona -->
      <path d="M14 36 L19 26 L24 33 L30 18 L36 33 L41 26 L46 36" stroke="#C792EA" stroke-width="1.8" stroke-linejoin="round" fill="rgba(199,146,234,0.1)"/>
      <!-- Joya central -->
      <circle cx="30" cy="18" r="3" fill="#C792EA" opacity=".8"/>
      <circle cx="30" cy="18" r="1.5" fill="#F0D9FF"/>
      <!-- Detalles laterales -->
      <circle cx="19" cy="26" r="2" fill="#C792EA" opacity=".6"/>
      <circle cx="41" cy="26" r="2" fill="#C792EA" opacity=".6"/>
      <!-- Línea base -->
      <line x1="14" y1="44" x2="46" y2="44" stroke="#C792EA" stroke-width="1" opacity=".4"/>
    </svg>`,
  },
  {
    name: 'DECORACIÓN',
    label: 'Decoración',
    color: '#89D4CF',
    icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Flor con órbitas -->
      <ellipse cx="30" cy="30" rx="24" ry="8" stroke="#89D4CF" stroke-width="0.8" opacity=".3" transform="rotate(-30 30 30)"/>
      <ellipse cx="30" cy="30" rx="24" ry="8" stroke="#89D4CF" stroke-width="0.8" opacity=".3" transform="rotate(30 30 30)"/>
      <!-- Pétalos -->
      <ellipse cx="30" cy="16" rx="5" ry="9"   fill="rgba(137,212,207,0.2)" stroke="#89D4CF" stroke-width="1.3" transform="rotate(0 30 30)"/>
      <ellipse cx="30" cy="16" rx="5" ry="9"   fill="rgba(137,212,207,0.2)" stroke="#89D4CF" stroke-width="1.3" transform="rotate(60 30 30)"/>
      <ellipse cx="30" cy="16" rx="5" ry="9"   fill="rgba(137,212,207,0.2)" stroke="#89D4CF" stroke-width="1.3" transform="rotate(120 30 30)"/>
      <ellipse cx="30" cy="16" rx="5" ry="9"   fill="rgba(137,212,207,0.2)" stroke="#89D4CF" stroke-width="1.3" transform="rotate(180 30 30)"/>
      <ellipse cx="30" cy="16" rx="5" ry="9"   fill="rgba(137,212,207,0.2)" stroke="#89D4CF" stroke-width="1.3" transform="rotate(240 30 30)"/>
      <ellipse cx="30" cy="16" rx="5" ry="9"   fill="rgba(137,212,207,0.2)" stroke="#89D4CF" stroke-width="1.3" transform="rotate(300 30 30)"/>
      <!-- Centro flor -->
      <circle cx="30" cy="30" r="6" fill="rgba(137,212,207,0.25)" stroke="#89D4CF" stroke-width="1.5"/>
      <circle cx="30" cy="30" r="2.5" fill="#89D4CF" opacity=".8"/>
    </svg>`,
  },
  {
    name: 'FIESTA',
    label: 'Fiesta',
    color: '#FFD700',
    icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Figura bailando -->
      <circle cx="30" cy="14" r="5" stroke="#FFD700" stroke-width="1.5" fill="rgba(255,215,0,0.1)"/>
      <!-- Cuerpo -->
      <path d="M30 19 L28 32 L24 42" stroke="#FFD700" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M30 19 L32 32 L36 42" stroke="#FFD700" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
      <!-- Brazos extendidos -->
      <path d="M28 24 L18 20" stroke="#FFD700" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M32 24 L44 28" stroke="#FFD700" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>
      <!-- Estrellitas / confeti orbitando -->
      <polygon points="12,14 13.3,18.1 17.6,18.1 14.2,20.6 15.5,24.7 12,22.2 8.5,24.7 9.8,20.6 6.4,18.1 10.7,18.1" fill="#FFD700" opacity=".7" transform="scale(0.55) translate(10,0)"/>
      <circle cx="46" cy="18" r="2" fill="#FFD700" opacity=".6"/>
      <circle cx="50" cy="30" r="1.5" fill="#FFD700" opacity=".5"/>
      <circle cx="14" cy="38" r="1.5" fill="#FFD700" opacity=".5"/>
      <polygon points="48,44 49,47 52,47 49.5,49 50.5,52 48,50 45.5,52 46.5,49 44,47 47,47" fill="#FFD700" opacity=".5" transform="scale(0.5) translate(48,40)"/>
    </svg>`,
  },
  {
    name: 'FOTOS PASTEL',
    label: 'Fotos Pastel',
    color: '#FF9BB5',
    icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Pastel como planeta con anillo -->
      <ellipse cx="30" cy="36" rx="22" ry="6" stroke="#FF9BB5" stroke-width="1" opacity=".35"/>
      <!-- Base pastel -->
      <rect x="12" y="36" width="36" height="10" rx="4" fill="rgba(255,155,181,0.15)" stroke="#FF9BB5" stroke-width="1.4"/>
      <!-- Capas pastel -->
      <rect x="15" y="28" width="30" height="10" rx="3" fill="rgba(255,155,181,0.12)" stroke="#FF9BB5" stroke-width="1.4"/>
      <rect x="18" y="20" width="24" height="10" rx="3" fill="rgba(255,155,181,0.1)" stroke="#FF9BB5" stroke-width="1.4"/>
      <!-- Velas -->
      <line x1="22" y1="20" x2="22" y2="12" stroke="#FF9BB5" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="30" y1="20" x2="30" y2="10" stroke="#FF9BB5" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="38" y1="20" x2="38" y2="12" stroke="#FF9BB5" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Llamas -->
      <ellipse cx="22" cy="11" rx="1.5" ry="2.5" fill="#FFD700" opacity=".9"/>
      <ellipse cx="30" cy="9"  rx="1.5" ry="2.5" fill="#FFD700" opacity=".9"/>
      <ellipse cx="38" cy="11" rx="1.5" ry="2.5" fill="#FFD700" opacity=".9"/>
      <!-- Glaseado ondulado -->
      <path d="M18 20 Q21 17 24 20 Q27 17 30 20 Q33 17 36 20 Q39 17 42 20" stroke="#FF9BB5" stroke-width="1.2" fill="none"/>
    </svg>`,
  },
  {
    name: 'INVITADOS',
    label: 'Invitados',
    color: '#82AAFF',
    icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Constelación de personas -->
      <!-- Figura central -->
      <circle cx="30" cy="20" r="5" stroke="#82AAFF" stroke-width="1.5" fill="rgba(130,170,255,0.12)"/>
      <path d="M26 30 Q30 38 34 30" stroke="#82AAFF" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Figura izquierda -->
      <circle cx="12" cy="25" r="3.5" stroke="#82AAFF" stroke-width="1.2" fill="rgba(130,170,255,0.08)" opacity=".8"/>
      <path d="M10 33 Q12 38 14 33" stroke="#82AAFF" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".8"/>
      <!-- Figura derecha -->
      <circle cx="48" cy="25" r="3.5" stroke="#82AAFF" stroke-width="1.2" fill="rgba(130,170,255,0.08)" opacity=".8"/>
      <path d="M46 33 Q48 38 50 33" stroke="#82AAFF" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".8"/>
      <!-- Líneas constelación -->
      <line x1="15" y1="25" x2="25" y2="22" stroke="#82AAFF" stroke-width="0.8" opacity=".4" stroke-dasharray="2 2"/>
      <line x1="35" y1="22" x2="45" y2="25" stroke="#82AAFF" stroke-width="0.8" opacity=".4" stroke-dasharray="2 2"/>
      <!-- Puntos constelación extra -->
      <circle cx="22" cy="46" r="2" fill="#82AAFF" opacity=".5"/>
      <circle cx="38" cy="46" r="2" fill="#82AAFF" opacity=".5"/>
      <circle cx="30" cy="50" r="1.5" fill="#82AAFF" opacity=".4"/>
      <line x1="12" y1="38" x2="22" y2="46" stroke="#82AAFF" stroke-width="0.7" opacity=".3" stroke-dasharray="2 2"/>
      <line x1="48" y1="38" x2="38" y2="46" stroke="#82AAFF" stroke-width="0.7" opacity=".3" stroke-dasharray="2 2"/>
    </svg>`,
  },
  {
    name: 'PRE-FIESTA',
    label: 'Pre-Fiesta',
    color: '#C3E88D',
    icon: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Amanecer / horizonte orbital -->
      <!-- Semicírculo sol naciente -->
      <path d="M8 38 A22 22 0 0 1 52 38" stroke="#C3E88D" stroke-width="1.5" fill="rgba(195,232,141,0.08)"/>
      <!-- Sol emergente -->
      <circle cx="30" cy="38" r="10" fill="rgba(195,232,141,0.15)" stroke="#C3E88D" stroke-width="1.5"/>
      <circle cx="30" cy="38" r="5.5" fill="rgba(195,232,141,0.3)"/>
      <!-- Rayos del amanecer -->
      <line x1="30" y1="22" x2="30" y2="17" stroke="#C3E88D" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="42" y1="26" x2="45" y2="22" stroke="#C3E88D" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
      <line x1="18" y1="26" x2="15" y2="22" stroke="#C3E88D" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
      <line x1="46" y1="38" x2="52" y2="38" stroke="#C3E88D" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>
      <line x1="14" y1="38" x2="8"  y2="38" stroke="#C3E88D" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>
      <!-- Horizonte -->
      <line x1="4" y1="42" x2="56" y2="42" stroke="#C3E88D" stroke-width="1" opacity=".3"/>
      <!-- Estrella matutina -->
      <polygon points="30,8 31,11.5 34.5,11.5 31.8,13.5 32.8,17 30,15 27.2,17 28.2,13.5 25.5,11.5 29,11.5"
               fill="#C3E88D" opacity=".7" transform="scale(0.6) translate(20,-8)"/>
    </svg>`,
  },
];


const STATIC_DATA = {
  'CATERING': [
    { name: 'IMG_6747.JPG', url: 'fotos/CATERING/IMG_6747.JPG' },
    { name: 'IMG_6749.JPG', url: 'fotos/CATERING/IMG_6749.JPG' },
    { name: 'IMG_6750.JPG', url: 'fotos/CATERING/IMG_6750.JPG' },
    { name: 'IMG_6753.JPG', url: 'fotos/CATERING/IMG_6753.JPG' },
    { name: 'IMG_6754.JPG', url: 'fotos/CATERING/IMG_6754.JPG' }
  ],
  'CEREMONIA': [],
  'DECORACIÓN': [],
  'FIESTA': [],
  'FOTOS PASTEL': [],
  'INVITADOS': [],
  'PRE-FIESTA': []
};




/* ─────────────────────────────────────────────────────────
   ESTADO
   ───────────────────────────────────────────────────────── */
const S = {
  photos:    [],
  idx:       0,
  catName:   '',
  catDef:    null,
};

/* ─────────────────────────────────────────────────────────
   UTILS
   ───────────────────────────────────────────────────────── */
const $  = (id) => document.getElementById(id);
const qs = (sel, ctx = document) => ctx.querySelector(sel);

async function api(params) {
  const url = new URL(CFG.API, location.href);
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Error desconocido');
  return data;
}

/* ─────────────────────────────────────────────────────────
   INICIALIZACIÓN
   ───────────────────────────────────────────────────────── */
async function init() {
  initCosmos();
  initSolarSystem();
  initKeyboard();
  await renderCategories();
}

/* ─────────────────────────────────────────────────────────
   CATEGORÍAS
   ───────────────────────────────────────────────────────── */
async function renderCategories() {
  const grid = $('catsGrid');

  // Intentar obtener counts desde el servidor
  let serverCats = {};
  try {
    const data = await api({ action: 'categories' });
    (data.categories || []).forEach(c => { serverCats[c.name.toUpperCase()] = c.count; });
  } catch (e) {
    console.warn('No se pudo conectar con api.php:', e.message);
  }

  grid.innerHTML = '';

  CATS_DEF.forEach((cat, i) => {
    const count = serverCats[cat.name] ?? null;
    const card  = document.createElement('div');
    card.className = 'cat-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.dataset.name = cat.name;
    card.innerHTML = `
      <div class="cat-icon-wrap">${cat.icon}</div>
      <span class="cat-label-text">${cat.label}</span>
      ${count !== null ? `<span class="cat-count-badge">${count} foto${count !== 1 ? 's' : ''}</span>` : ''}
    `;
    card.addEventListener('click', () => openCategory(cat));
    grid.appendChild(card);
  });
}

/* ─────────────────────────────────────────────────────────
   ABRIR CATEGORÍA
   ───────────────────────────────────────────────────────── */
async function openCategory(cat) {
  // Marcar activo
  document.querySelectorAll('.cat-card').forEach(c =>
    c.classList.toggle('active', c.dataset.name === cat.name)
  );

  S.catName = cat.name;
  S.catDef  = cat;
  S.photos  = [];

  // Mostrar barra
  $('galleryBar').classList.add('show');
  $('barIcon').textContent = '';
  $('barTitle').textContent = cat.label;
  $('barCount').textContent = '';

  showState('loading');

  setTimeout(() =>
    $('gallerySection').scrollIntoView({ behavior: 'smooth', block: 'start' })
  , 80);

  try {
    const data = await api({ action: 'photos', folder: cat.name });
    S.photos = data.photos || [];

    if (S.photos.length === 0) {
      showState('empty');
      $('emptyMsg').textContent = `No hay fotografías en "${cat.label}" aún.`;
      return;
    }

    showState('none');
    $('barCount').textContent = `${S.photos.length} fotografía${S.photos.length !== 1 ? 's' : ''}`;
    renderMasonry(S.photos);

  } catch (err) {
    showState('empty');
    $('emptyMsg').textContent = `Error al cargar las fotos: ${err.message}`;
  }
}

/* ─────────────────────────────────────────────────────────
   MASONRY
   ───────────────────────────────────────────────────────── */
function renderMasonry(photos) {
  const grid = $('masonry');
  grid.innerHTML = '';

  photos.forEach((ph, idx) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.style.animationDelay = `${Math.min(idx * 0.03, 0.9)}s`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Abrir ${ph.name}`);

    const img = document.createElement('img');
    img.src     = ph.url;
    img.alt     = ph.name.replace(/\.[^.]+$/, '');
    img.loading = 'lazy';
    img.decoding = 'async';

    const hint = document.createElement('div');
    hint.className = 'zoom-hint';
    hint.innerHTML = `<div class="zoom-hint-inner">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    </div>`;

    card.appendChild(img);
    card.appendChild(hint);
    card.addEventListener('click', () => lbOpen(idx));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbOpen(idx); } });
    grid.appendChild(card);
  });
}

/* ─────────────────────────────────────────────────────────
   VOLVER
   ───────────────────────────────────────────────────────── */
function goBack() {
  $('masonry').innerHTML = '';
  showState('empty');
  $('emptyMsg').textContent = 'Selecciona una categoría para ver las fotografías.';
  $('galleryBar').classList.remove('show');
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  $('galeria').scrollIntoView({ behavior: 'smooth', block: 'start' });
  S.photos = [];
}

/* ─────────────────────────────────────────────────────────
   ESTADOS UI
   ───────────────────────────────────────────────────────── */
function showState(st) {
  $('stateLoading').style.display = st === 'loading' ? 'flex'  : 'none';
  $('stateEmpty').style.display   = st === 'empty'   ? 'flex'  : 'none';
}

/* ─────────────────────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────────────────────── */
function lbOpen(idx) {
  S.idx = idx;
  const lb = $('lightbox');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Rellenar tira de miniaturas (primera vez)
  buildStrip();

  lbLoad(idx, 'none');
}

function lbClose() {
  $('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lbPrev() {
  if (!S.photos.length) return;
  const next = (S.idx - 1 + S.photos.length) % S.photos.length;
  lbLoad(next, 'prev');
}

function lbNext() {
  if (!S.photos.length) return;
  const next = (S.idx + 1) % S.photos.length;
  lbLoad(next, 'next');
}

function lbLoad(idx, dir) {
  const img  = $('lbImg');
  const spin = $('lbSpin');

  // Animación de salida
  if (dir !== 'none') {
    img.classList.add('fade-out');
  }

  setTimeout(() => {
    S.idx = idx;
    const ph = S.photos[idx];

    // Actualizar topbar
    $('lbCat').textContent = S.catDef?.label || S.catName;
    $('lbNum').textContent = `${idx + 1} / ${S.photos.length}`;

    // Botón descarga
    const dlBtn = $('lbDownload');
    dlBtn.href     = ph.url;
    dlBtn.download = ph.name;

    // Cargar imagen
    img.classList.add('fade-out');
    spin.classList.remove('hidden');

    const tmp = new Image();
    tmp.onload = () => {
      img.src = tmp.src;
      img.alt = ph.name.replace(/\.[^.]+$/, '');
      spin.classList.add('hidden');
      img.classList.remove('fade-out');
      img.classList.add('fade-in');
      setTimeout(() => img.classList.remove('fade-in'), 300);
    };
    tmp.onerror = () => {
      spin.classList.add('hidden');
      img.classList.remove('fade-out');
    };
    tmp.src = ph.url;

    // Actualizar tira activa
    updateStrip(idx);

  }, dir === 'none' ? 0 : 200);
}

function buildStrip() {
  const strip = $('lbStrip');
  strip.innerHTML = '';
  S.photos.forEach((ph, i) => {
    const t = document.createElement('img');
    t.className = 'strip-thumb';
    t.src     = ph.url;
    t.alt     = ph.name;
    t.loading = 'lazy';
    t.dataset.idx = i;
    t.addEventListener('click', () => lbLoad(i, i > S.idx ? 'next' : 'prev'));
    strip.appendChild(t);
  });
  updateStrip(S.idx);
}

function updateStrip(idx) {
  const strip = $('lbStrip');
  strip.querySelectorAll('.strip-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
  // Auto-scroll la tira
  const active = strip.querySelector('.strip-thumb.active');
  if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

/* ─────────────────────────────────────────────────────────
   TECLADO
   ───────────────────────────────────────────────────────── */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (!$('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape')     lbClose();
    if (e.key === 'ArrowLeft')  lbPrev();
    if (e.key === 'ArrowRight') lbNext();
  });

  // Swipe táctil
  let tx = 0;
  const panel = $('lbPanel');
  panel.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  panel.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? lbNext() : lbPrev();
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   SISTEMA SOLAR (15 planetas)
   ───────────────────────────────────────────────────────── */
function initSolarSystem() {
  const wrap = $('planetsWrap');
  if (!wrap) return;

  const container = qs('.solar-system');
  if (!container) return;

  const cx = container.offsetWidth  / 2;
  const cy = container.offsetHeight / 2;

  // 15 planetas en 4 órbitas
  const orbits = [
    { rx: 0.155, ry: 0.048, count: 3, color: '#FFD700', size: [5,7],    speed: [12,18] },
    { rx: 0.200, ry: 0.062, count: 4, color: '#C792EA', size: [4,6],    speed: [18,25] },
    { rx: 0.260, ry: 0.080, count: 5, color: '#89D4CF', size: [3,5.5],  speed: [25,35] },
    { rx: 0.320, ry: 0.095, count: 3, color: '#FF9BB5', size: [3.5,5],  speed: [35,50] },
  ];

  const planets = [];
  let planetNum = 0;

  orbits.forEach(orbit => {
    for (let p = 0; p < orbit.count; p++) {
      planetNum++;
      const angle = (p / orbit.count) * Math.PI * 2;
      const size  = orbit.size[0] + Math.random() * (orbit.size[1] - orbit.size[0]);
      const speed = orbit.speed[0] + Math.random() * (orbit.speed[1] - orbit.speed[0]);
      const dir   = Math.random() > 0.3 ? 1 : -1; // Mayoría en sentido horario

      // Wrapper que rota
      const el = document.createElement('div');
      el.className = 'planet';
      Object.assign(el.style, {
        width:  '0px', height: '0px',
        top: '50%', left: '50%',
        transform: `translate(-50%, -50%)`,
      });

      // El punto visible
      const dot = document.createElement('div');
      dot.className = 'planet-dot';
      Object.assign(dot.style, {
        width:  `${size}px`,
        height: `${size}px`,
        background: orbit.color,
        color: orbit.color,
      });

      // Etiqueta del año (planeta principal)
      if (planetNum <= 15) {
        dot.title = `Año ${planetNum}`;
      }

      el.appendChild(dot);
      wrap.appendChild(el);

      planets.push({ el, dot, orbit, angle, speed, dir, size });
    }
  });

  // Animar con requestAnimationFrame
  let last = 0;
  function animate(ts) {
    const dt = (ts - last) / 1000;
    last = ts;

    const W = container.offsetWidth;
    const H = container.offsetHeight;

    planets.forEach(pl => {
      pl.angle += (Math.PI * 2 / pl.speed) * dt * pl.dir;

      const rx = W * pl.orbit.rx;
      const ry = H * pl.orbit.ry;
      const x  = W / 2 + rx * Math.cos(pl.angle);
      const y  = H / 2 + ry * Math.sin(pl.angle);

      pl.dot.style.position  = 'absolute';
      pl.dot.style.left      = `${x}px`;
      pl.dot.style.top       = `${y}px`;
      pl.dot.style.transform = 'translate(-50%, -50%)';

      // Opacidad por posición (simula profundidad)
      const depth = (Math.sin(pl.angle) + 1) / 2; // 0 a 1
      pl.dot.style.opacity = 0.4 + depth * 0.6;
      pl.dot.style.transform = `translate(-50%,-50%) scale(${0.7 + depth * 0.55})`;
    });

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* ─────────────────────────────────────────────────────────
   COSMOS CANVAS (estrellas + nebulosas + fugaces)
   ───────────────────────────────────────────────────────── */
function initCosmos() {
  const canvas = $('cosmosCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const STARS  = 280;
  const NEBULA = 6;

  let stars = [], nebulas = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    makeNebulas();
  }

  function makeStars() {
    stars = Array.from({ length: STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      gold: Math.random() < 0.12,
      green: Math.random() < 0.06,
    }));
  }

  function makeNebulas() {
    nebulas = Array.from({ length: NEBULA }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      rx: 80 + Math.random() * 200,
      ry: 40 + Math.random() * 120,
      a: Math.random() * Math.PI,
      color: ['rgba(61,20,120,', 'rgba(39,174,96,', 'rgba(212,160,23,'][Math.floor(Math.random() * 3)],
      opacity: 0.03 + Math.random() * 0.06,
    }));
  }

  window.addEventListener('resize', () => { resize(); makeStars(); });
  resize();
  makeStars();

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Nebulosas
    nebulas.forEach(nb => {
      ctx.save();
      ctx.translate(nb.x, nb.y);
      ctx.rotate(nb.a);
      const g = ctx.createRadialGradient(0,0,0, 0,0, nb.rx);
      g.addColorStop(0, nb.color + nb.opacity + ')');
      g.addColorStop(1, nb.color + '0)');
      ctx.scale(1, nb.ry / nb.rx);
      ctx.beginPath();
      ctx.arc(0, 0, nb.rx, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    });

    // Estrellas
    stars.forEach(s => {
      s.a += s.da;
      if (s.a > 1 || s.a < 0.05) s.da *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      let color = `rgba(255,255,255,${s.a * 0.8})`;
      if (s.gold)  color = `rgba(212,160,23,${s.a})`;
      if (s.green) color = `rgba(72,199,142,${s.a * 0.85})`;
      ctx.fillStyle = color;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();

  // Estrellas fugaces
  setInterval(shootingStar, 5500);

  function shootingStar() {
    if (Math.random() > 0.6) return;
    const x0   = Math.random() * W * 0.55;
    const y0   = Math.random() * H * 0.35;
    const len  = 90 + Math.random() * 130;
    const dur  = 650 + Math.random() * 450;
    const t0   = performance.now();

    (function animate(now) {
      const p = (now - t0) / dur;
      if (p >= 1) return;
      const x1 = x0 + len * p;
      const y1 = y0 + len * p * 0.55;
      const x0p = x0 + len * Math.max(0, p - 0.15);
      const y0p = y0 + len * Math.max(0, p - 0.15) * 0.55;
      ctx.save();
      ctx.globalAlpha = (1 - p) * 0.75;
      ctx.strokeStyle = '#F0CE6A';
      ctx.lineWidth   = 1.8;
      ctx.beginPath();
      ctx.moveTo(x0p, y0p);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.restore();
      requestAnimationFrame(animate);
    })(t0);
  }
}

/* ─────────────────────────────────────────────────────────
   API PÚBLICA
   ───────────────────────────────────────────────────────── */
window.G = { goBack, lbClose, lbPrev, lbNext };

/* ── Arrancar ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', init);
