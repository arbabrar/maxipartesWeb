/**
 * navbar.js — Componente de navegación compartido para MAXIPARTES Bolivia.
 *
 * Para usar en cualquier página:
 *   1. Agrega <div id="navbar-container"></div> al inicio del <body>.
 *   2. Incluye este script ANTES de Bootstrap JS:
 *      <script src="/assets/js/navbar.js"></script>
 *
 * El botón de modo oscuro guarda la preferencia en localStorage.
 * Los logos de marcas tienen versión dark (PNG con fondo transparente)
 * y versión light (WEBP original), y se intercambian automáticamente.
 */

(function () {
  // Logos: [archivo-light, archivo-dark, alt]
  const BRAND_LOGOS = [
    ['Logo-Changan.webp',    'Logo-Changan-dark.png',    'Changan'],
    ['Logo-Chery.webp',      'Logo-Chery-dark.png',      'Chery'],
    ['logo-Chevrolet.webp',  'logo-Chevrolet-dark.png',  'Chevrolet'],
    ['logo-Foton.webp',      'logo-Foton-dark.png',      'Foton'],
    ['logo-JAC.webp',        'logo-JAC-dark.png',        'JAC'],
    ['logo-Mitsubishi.webp', 'logo-Mitsubishi-dark.png', 'Mitsubishi'],
    ['Logo-Great-Wall.webp', 'Logo-Great-Wall-dark.png', 'Great Wall'],
    ['Logo-Honda.webp',      'Logo-Honda-dark.png',      'Honda'],
    ['Logo-Hyundai.webp',    'Logo-Hyundai-dark.png',    'Hyundai'],
    ['Logo-Kia.webp',        'Logo-Kia-dark.png',        'Kia'],
    ['Logo-Mazda.webp',      'Logo-Mazda-dark.png',      'Mazda'],
    ['Logo-Nissan.webp',     'Logo-Nissan-dark.png',     'Nissan'],
    ['Logo-Renault.webp',    'Logo-Renault-dark.png',    'Renault'],
    ['Logo-Subaru.webp',     'Logo-Subaru-dark.png',     'Subaru'],
    ['Logo-Suzuki.webp',     'Logo-Suzuki-dark.png',     'Suzuki'],
    ['Logo-Toyota.webp',     'Logo-Toyota-dark.png',     'Toyota'],
    ['Logo_Mini.webp',       'Logo_Mini-dark.png',       'Mini'],
  ];

  const BASE = '/assets/images/marcas/';

  function buildLogoSlides() {
    return BRAND_LOGOS.map(([light, dark, alt]) =>
      `<div class="slide-logo"><img src="${BASE}${light}" data-light-src="${BASE}${light}" data-dark-src="${BASE}${dark}" alt="${alt}"></div>`
    ).join('\n            ');
  }

  const navbarHTML = `
  <nav class="navbar mp-navbar navbar-expand-lg sticky-top border-bottom glass-nav" id="mainNavbar">
    <div class="container align-items-center">
      <a class="navbar-brand fw-bold p-0 me-2" href="/index.html" style="line-height: 1;">
        <img id="navbar-logo" src="/assets/images/general/Logo_Maxipartes_light.png" height="40"
             class="d-inline-block align-text-top" alt="Logo MAXIPARTES">
      </a>

      <!-- Carrusel Aliadas en línea -->
      <div class="SliderInfinito flex-grow-1 mx-2" style="min-width: 0; height: 40px; display: flex; align-items: center;">
        <div class="slider-track" style="height: 100%;">
            ${buildLogoSlides()}

            <!-- Duplicados para efecto infinito -->
            ${buildLogoSlides()}
        </div>
      </div>

      <div class="d-flex align-items-center gap-1 flex-shrink-0 order-lg-last">
        <!-- Dark mode toggle -->
        <button class="btn-darkmode" id="darkModeToggle" title="Cambiar modo oscuro/claro"
                aria-label="Toggle dark mode">
          <i class="bi bi-moon-fill" id="darkModeIcon"></i>
        </button>
        <!-- Toggler mobile -->
        <button class="navbar-toggler border-0 px-2" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list" style="font-size: 2rem;"></i>
        </button>
      </div>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-lg-center gap-lg-1">
          <li class="nav-item">
            <a class="nav-link" href="/index.html">
              <i class="bi bi-house-fill me-1 d-lg-none"></i>Inicio
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pages/catalogo.html">
              <i class="bi bi-grid-fill me-1 d-lg-none"></i>Catálogo
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pages/quienes_somos.html">
              <i class="bi bi-people-fill me-1 d-lg-none"></i>Quiénes Somos
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pages/contactenos.html">
              <i class="bi bi-telephone-fill me-1 d-lg-none"></i>Contáctenos
            </a>
          </li>
          <li class="nav-item ms-lg-2">
            <a class="nav-link btn-nav-whatsapp btn-global-whatsapp" href="#" title="WhatsApp Ventas">
              <i class="bi bi-whatsapp me-1"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `;

  // ── Dark mode logic ──────────────────────────────────────────────

  /** Intercambia los logos de marcas del carrusel según el modo. */
  function switchBrandLogos(isDark) {
    document.querySelectorAll('.slide-logo img[data-dark-src]').forEach(img => {
      img.src = isDark
        ? img.getAttribute('data-dark-src')
        : img.getAttribute('data-light-src');
    });
  }

  function applyDarkMode(isDark) {
    document.documentElement.classList.toggle('dark', isDark);

    // Switch icono sol/luna
    const icon = document.getElementById('darkModeIcon');
    if (icon) {
      icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }

    // Switch logo principal Maxipartes
    const logo = document.getElementById('navbar-logo');
    if (logo) {
      logo.src = isDark
        ? '/assets/images/general/Logo_Maxipartes_dark.jpg'
        : '/assets/images/general/Logo_Maxipartes_light.png';
    }

    // Switch logos de marcas en el carrusel
    switchBrandLogos(isDark);
  }

  // Read preference from localStorage (or OS preference)
  const saved = localStorage.getItem('mp-dark-mode');
  const prefersDark = saved !== null
    ? saved === 'true'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyDarkMode(prefersDark);

  // Toggle on click — wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function () {
    // Inject navbar HTML now that the body is parsed
    const container = document.getElementById('navbar-container');
    if (container) {
      container.innerHTML = navbarHTML;
    }

    // Ahora que el navbar está en el DOM, aplicar estado dark correcto
    const isDarkNow = document.documentElement.classList.contains('dark');

    // Logo principal Maxipartes — corrige el src hardcodeado en el template
    const navLogo = document.getElementById('navbar-logo');
    if (navLogo && isDarkNow) {
      navLogo.src = '/assets/images/general/Logo_Maxipartes_dark.jpg';
    }

    // Logos de marcas del carrusel
    switchBrandLogos(isDarkNow);

    // Icono sol/luna
    const icon = document.getElementById('darkModeIcon');
    if (icon) {
      icon.className = isDarkNow ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }

    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        localStorage.setItem('mp-dark-mode', isDark);
        applyDarkMode(isDark);
      });
    }

    // Mark active nav link based on current URL
    document.querySelectorAll('#mainNavbar .nav-link').forEach(link => {
      if (link.href && window.location.pathname.endsWith(
        link.getAttribute('href').replace(/^\//, '')
      )) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // GLOBAL WHATSAPP ROUND ROBIN INTERCEPTOR
  // ==========================================
  window.getWhatsAppNumber = function() {
      const numbers = ['59177822038', '59177822211', '59177822028'];
      const randomIndex = Math.floor(Math.random() * numbers.length);
      return numbers[randomIndex];
  };

  document.addEventListener('click', function(e) {
      const link = e.target.closest('.btn-global-whatsapp');
      if (link) {
          e.preventDefault();
          const newNum = window.getWhatsAppNumber();
          window.open('https://wa.me/' + newNum, '_blank');
      }
  });

})();

