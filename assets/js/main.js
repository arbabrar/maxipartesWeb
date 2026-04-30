/**
 * main.js — Lógica principal del catálogo de MAXIPARTES Bolivia.
 * Renderiza: Productos Destacados + Catálogo con filtros y paginación.
 */

document.addEventListener('DOMContentLoaded', function () {

  // ── Configuración ──────────────────────────────────────────────
  const PRODUCTS_PER_PAGE = 9;
  let currentPage    = 1;
  let activeCategory = 'all';
  let searchQuery    = '';
  let activeBrands   = new Set(); // marcas de vehículo seleccionadas

  const categoryNames = {
    'motor':           'Motor',
    'suspension':      'Suspensión',
    'filtros':         'Filtros',
    'frenos':          'Frenos',
    'embrague':        'Embrague',
    'aceites':         'Aceites',
    'direccion':       'Dirección',
    'refrigeracion':   'Refrigeración',
    'electricidad':    'Electricidad',
    'transmision':     'Transmisión',
    'accesorios':      'Accesorios',
    'carroceria':      'Carrocería',
    'iluminacion':  'Iluminación',
  };

  // DOM refs
  const featuredGrid       = document.getElementById('featured-grid');
  const productsGrid       = document.getElementById('products-grid');
  const noResults          = document.getElementById('no-results');
  const buscador           = document.getElementById('buscador-productos');
  const categorySelect     = document.getElementById('category-select');
  const brandCheckboxes    = document.querySelectorAll('#brand-filter-list input[type="checkbox"]');
  const btnApply           = document.getElementById('btn-apply-filter');
  const btnClear           = document.getElementById('btn-clear-filter');
  const categoryButtons    = document.querySelectorAll('.categoria-scroll .btn-group [data-category]');
  const paginationContainer = document.getElementById('pagination-container');


  // ══════════════════════════════════════════════════════════════
  // 1. PRODUCTOS DESTACADOS (4 tarjetas grandes)
  // ══════════════════════════════════════════════════════════════
  function renderFeatured() {
    if (!featuredGrid) return;
    const featured = productos.filter(p => p.destacado).slice(0, 4);

    featuredGrid.innerHTML = featured.map(p => {
      const catLabel = categoryNames[p.categoria] || p.categoria.toUpperCase();
      
      let badgeHTML = '';
      if (p.etiqueta) {
          let cls = 'fc-badge-premium';
          if (p.etiqueta.toUpperCase() === 'NUEVO') cls = 'fc-badge-new';
          if (p.etiqueta.toUpperCase() === 'OFERTA') cls = 'fc-badge-sale';
          badgeHTML = `<span class="fc-badge ${cls}">${p.etiqueta.toUpperCase()}</span>`;
      }

      return `
        <div class="col-sm-6 col-lg-3">
          <div class="featured-card h-100">
            <div class="fc-img-wrap">
              <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
              ${badgeHTML}
            </div>
            <div class="fc-body d-flex flex-column h-100">
              <span class="fc-category">${catLabel}</span>
              <h3 class="fc-title">${p.nombre}</h3>
              <p class="fc-desc flex-grow-1">${p.descripcion}</p>
              <div class="fc-footer">
                <button class="btn-fc-whatsapp" data-id="${p.id}">
                  <i class="bi bi-whatsapp"></i> Consultar
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // WhatsApp handlers
    featuredGrid.querySelectorAll('.btn-fc-whatsapp').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = productos.find(x => x.id === btn.dataset.id);
        if (!p) return;
        const msg = `Hola, quisiera información sobre:\n*${p.nombre}*\nCódigo: ${p.codigo}\nMarca: ${p.marca}`;
        const waNum = window.getWhatsAppNumber ? window.getWhatsAppNumber() : '59177822038';
        window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, '_blank');
      });
    });
  }


  // ══════════════════════════════════════════════════════════════
  // 2. FILTRADO
  // ══════════════════════════════════════════════════════════════
  function removeAccents(str) {
    if (!str) return '';
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function getFilteredProducts() {
    const rawQ = searchQuery.toLowerCase().trim();
    const q = removeAccents(rawQ);

    return productos.filter(p => {
      // Categoría
      const matchCat = activeCategory === 'all' || p.categoria === activeCategory;
      
      const nameObj = removeAccents(p.nombre ? p.nombre.toLowerCase() : '');
      const codeObj = removeAccents(p.codigo ? p.codigo.toLowerCase() : '');
      const brandObj = removeAccents(p.marca ? p.marca.toLowerCase() : '');
      const catObj = removeAccents(p.categoria ? p.categoria.toLowerCase() : '');
      const subCatObj = removeAccents(p.subcategoria ? p.subcategoria.toLowerCase() : '');
      const descObj = removeAccents(p.descripcion ? p.descripcion.toLowerCase() : '');

      // Búsqueda texto (compatibilidad y modeloVehiculo son arrays ahora)
      const isCompatMatch = (p.compatibilidad && Array.isArray(p.compatibilidad)) 
                              ? p.compatibilidad.some(c => removeAccents(c.toLowerCase()).includes(q)) 
                              : false;
      const isModelMatch  = (p.modeloVehiculo && Array.isArray(p.modeloVehiculo)) 
                              ? p.modeloVehiculo.some(m => removeAccents(m.toLowerCase()).includes(q)) 
                              : false;

      const matchQ = !q ||
        nameObj.includes(q) ||
        codeObj.includes(q) ||
        brandObj.includes(q) ||
        catObj.includes(q) ||
        subCatObj.includes(q) ||
        isCompatMatch ||
        isModelMatch ||
        descObj.includes(q);
        
      const matchBrand = activeBrands.size === 0 ||
        (p.marcaVehiculo === 'Universal') ||
        Array.from(activeBrands).some(brand => 
            p.marcaVehiculo === brand || 
            (p.compatibilidad && Array.isArray(p.compatibilidad) && p.compatibilidad.includes(brand)) ||
            (p.compatibilidad && Array.isArray(p.compatibilidad) && p.compatibilidad.includes('Universal'))
        );

      return matchCat && matchQ && matchBrand;
    });
  }


  // ══════════════════════════════════════════════════════════════
  // 3. TARJETA DE PRODUCTO (catálogo)
  // ══════════════════════════════════════════════════════════════
  function createProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col-sm-6 col-lg-4 mb-4';
  col.setAttribute('data-category', product.categoria);

  const catLabel = categoryNames[product.categoria] || product.categoria.toUpperCase();
  const available = product.disponibilidad;
  const badgeColor = available ? '#16a34a' : '#d97706';
  const badgeText = available ? 'En stock' : 'Bajo pedido';
  
  let extraBadgeHTML = '';
  if (product.etiqueta) {
      let cls = 'bg-danger';
      if (product.etiqueta.toUpperCase() === 'NUEVO') cls = 'bg-primary';
      if (product.etiqueta.toUpperCase() === 'PREMIUM') cls = 'bg-dark';
      extraBadgeHTML = `<span class="badge rounded-pill ${cls} ms-1" style="font-size:.65rem;">${product.etiqueta.toUpperCase()}</span>`;
  }
  
  // Procesamos los modelos para que se vean bien
  const modelosStr = Array.isArray(product.modeloVehiculo) 
    ? product.modeloVehiculo.join(', ') 
    : product.modeloVehiculo;

  col.innerHTML = `
    <div class="product-card h-100 d-flex flex-column border rounded-3 shadow-sm bg-white">
      <div class="product-image-container p-3 d-flex align-items-center justify-content-center" style="height: 180px;">
        <img src="${product.imagen}" alt="${product.nombre}" loading="lazy" style="max-height: 100%; object-fit: contain;">
      </div>
      
      <div class="product-details flex-grow-1 px-3 pb-3">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="product-category-label text-muted fw-bold" style="font-size: 0.65rem;">${catLabel}</span>
          <div>
              <span class="badge rounded-pill" style="background:${badgeColor}; color:#fff; font-size:.65rem;">${badgeText}</span>
              ${extraBadgeHTML}
          </div>
        </div>

        <h5 class="mt-1 mb-1 fw-bold h6">${product.nombre}</h5>
        
        <p class="card-text mb-2 text-muted small description-text" 
           style="cursor: pointer; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
           onclick="this.style.display='block'; this.style.webkitLineClamp='initial';">
          ${product.descripcion}
        </p>

        <div class="product-meta mb-3 p-2 rounded bg-light" style="font-size: 0.85rem;">
          <div class="mb-1"><i class="bi bi-tag-fill me-1" style="color:var(--mp-red)"></i><strong>Marca:</strong> ${product.marca}</div>
          <div class="mb-1"><i class="bi bi-car-front-fill me-1"></i><strong>Para:</strong> ${product.marcaVehiculo}: ${modelosStr}</div>
          <div class="product-ref text-secondary"><i class="bi bi-upc-scan me-1"></i><strong>Cód:</strong> ${product.id}</div>
        </div>

        <button class="btn-whatsapp-card w-100 justify-content-center btn-whatsapp">
          <i class="bi bi-whatsapp"></i> Consultar precio
        </button>
      </div>
    </div>
  `;

  // Lógica de WhatsApp con los datos necesarios para cerrar la venta
  col.querySelector('.btn-whatsapp').addEventListener('click', () => {
    // Datos esenciales para el vendedor: Nombre, Código y para qué auto es.
    const msg = `Hola Maxipartes! 👋\nConsulto precio para:\n` +
                `🔢 *Código Interno:* ${product.id}\n` +
                `📦 *${product.nombre}*\n` +
                `🚗 *Vehículo:* ${product.marcaVehiculo} ${modelosStr}\n` +
                `🏗️ *Marca repuesto:* ${product.marca}`;
    
    const waNum = window.getWhatsAppNumber ? window.getWhatsAppNumber() : '59177822038';
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  return col;
}


  // ══════════════════════════════════════════════════════════════
  // 4. RENDERIZAR PÁGINA DEL CATÁLOGO
  // ══════════════════════════════════════════════════════════════
  function renderPage(page) {
    const filtered    = getFilteredProducts();
    const totalPages  = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
    currentPage       = Math.min(page, totalPages);

    const start        = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const pageProducts = filtered.slice(start, start + PRODUCTS_PER_PAGE);

    productsGrid.innerHTML = '';
    if (noResults) noResults.classList.add('d-none');

    if (pageProducts.length === 0) {
      if (noResults) noResults.classList.remove('d-none');
    } else {
      pageProducts.forEach(p => productsGrid.appendChild(createProductCard(p)));
    }

    renderPagination(totalPages);
    
    // Auto-scroll al inicio de la grilla si el usuario cambia de página
    if (productsGrid && window.scrollY > productsGrid.offsetTop - 150) {
        window.scrollTo({
            top: productsGrid.offsetTop - 150,
            behavior: 'smooth'
        });
    }
  }


  // ══════════════════════════════════════════════════════════════
  // 5. PAGINACIÓN
  // ══════════════════════════════════════════════════════════════
  // function renderPagination(totalPages) {
  //   if (!paginationContainer) return;
  //   paginationContainer.innerHTML = '';
  //   if (totalPages <= 1) return;

  //   const ul = document.createElement('ul');
  //   ul.className = 'pagination';

  //   // Prev
  //   const prev = document.createElement('li');
  //   prev.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  //   prev.innerHTML = `<button class="page-link">&laquo;</button>`;
  //   prev.querySelector('button').addEventListener('click', () => { if (currentPage > 1) renderPage(currentPage - 1); });
  //   ul.appendChild(prev);

  //   // Pages
  //   for (let i = 1; i <= totalPages; i++) {
  //     const li = document.createElement('li');
  //     li.className = `page-item ${i === currentPage ? 'active' : ''}`;
  //     li.innerHTML = `<button class="page-link">${i}</button>`;
  //     li.querySelector('button').addEventListener('click', () => renderPage(i));
  //     ul.appendChild(li);
  //   }

  //   // Next
  //   const next = document.createElement('li');
  //   next.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
  //   next.innerHTML = `<button class="page-link">&raquo;</button>`;
  //   next.querySelector('button').addEventListener('click', () => { if (currentPage < totalPages) renderPage(currentPage + 1); });
  //   ul.appendChild(next);

  //   paginationContainer.appendChild(ul);
  // }

  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-center'; // Centrado para Bootstrap

    // Función auxiliar para crear botones más rápido
    const createPageItem = (label, targetPage, status = '') => {
      const li = document.createElement('li');
      li.className = `page-item ${status}`;
      li.innerHTML = `<button class="page-link" data-page="${targetPage}">${label}</button>`;
      return li;
    };

    // Botón Anterior
    ul.appendChild(createPageItem('&laquo;', currentPage - 1, currentPage === 1 ? 'disabled' : ''));

    // Lógica de páginas (Ventana inteligente)
    // Mostramos siempre la primera, la última y 1 alrededor de la actual
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        ul.appendChild(createPageItem(i, i, i === currentPage ? 'active' : ''));
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        // Agregamos puntos suspensivos para estética
        const dots = document.createElement('li');
        dots.className = 'page-item disabled';
        dots.innerHTML = '<span class="page-link">...</span>';
        ul.appendChild(dots);
      }
    }

    // Botón Siguiente
    ul.appendChild(createPageItem('&raquo;', currentPage + 1, currentPage === totalPages ? 'disabled' : ''));

    // Delegación de eventos: un solo listener para todos los botones
    ul.addEventListener('click', (e) => {
      const btn = e.target.closest('.page-link');
      if (!btn || btn.parentElement.classList.contains('disabled') || btn.parentElement.classList.contains('active')) return;
      
      const targetPage = parseInt(btn.getAttribute('data-page'));
      if (!isNaN(targetPage)) renderPage(targetPage);
    });

    paginationContainer.appendChild(ul);
  }

  // ══════════════════════════════════════════════════════════════
  // 6. EVENTOS — Panel de filtros lateral
  // ══════════════════════════════════════════════════════════════

  // Búsqueda en tiempo real (con debounce)
  let searchTimer;
  if (buscador) {
    buscador.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        searchQuery = buscador.value;
        currentPage = 1;
        renderPage(1);
      }, 300);
    });
  }

  // Aplicar filtros (botón)
  if (btnApply) {
    btnApply.addEventListener('click', () => {
      // Categoría del select
      if (categorySelect) {
        activeCategory = categorySelect.value;
      }
      // Marcas de vehículo (checkboxes)
      activeBrands.clear();
      brandCheckboxes.forEach(cb => {
        if (cb.checked) activeBrands.add(cb.value);
      });
      currentPage = 1;
      renderPage(1);
    });
  }

  // Limpiar filtros
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      searchQuery    = '';
      activeCategory = 'all';
      activeBrands.clear();
      if (buscador)       buscador.value       = '';
      if (categorySelect) categorySelect.value = 'all';
      brandCheckboxes.forEach(cb => cb.checked = false);
      // Sync mobile buttons
      categoryButtons.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.categoria-scroll [data-category="all"]');
      if (allBtn) allBtn.classList.add('active');
      currentPage = 1;
      renderPage(1);
    });
  }

  // Sincronizar select de categoría con botones móvil
  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      activeCategory = categorySelect.value;
      // sync mobile pills
      categoryButtons.forEach(b => {
        b.classList.toggle('active', b.dataset.category === activeCategory);
      });
    });
  }

  // Botones de categoría (versión móvil)
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      // Sync select
      if (categorySelect) categorySelect.value = activeCategory;
      currentPage = 1;
      renderPage(1);
    });
  });


  // ══════════════════════════════════════════════════════════════
  // 7. EVENTOS — Cards de Categorías (sección "Productos Destacados"
  //    antigua — ahora "Categorías") si existieran
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.destacado-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-filter-category');
      if (!category) return;

      activeCategory = category;
      if (categorySelect) categorySelect.value = category;
      categoryButtons.forEach(b => b.classList.toggle('active', b.dataset.category === category));

      currentPage = 1;
      renderPage(1);

      const productsSection = document.querySelector('#productos');
      if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });


  // ══════════════════════════════════════════════════════════════
  // 8. INICIALIZACIÓN
  // ══════════════════════════════════════════════════════════════
  renderFeatured();
  renderPage(1);

});
