/**
 * footer.js — Componente de footer compartido para MAXIPARTES Bolivia.
 *
 * Para usar en cualquier página:
 *   1. Agrega <div id="footer-container"></div> donde quieras el footer.
 *   2. Incluye este script DESPUÉS de Bootstrap JS:
 *      <script src="/assets/js/footer.js"></script>
 *
 * Para modificar el footer (textos, links, redes sociales), edita SOLO este archivo.
 */

(function () {
  const footerHTML = `
  <footer class="bg-dark text-white pt-5 pb-4">
    <div class="container">

      <!-- Vista Desktop -->
      <div class="d-none d-md-block">
        <div class="row gy-4 text-md-start text-center">

          <div class="col-lg-3 col-md-6">
            <h5 class="text-uppercase fw-bold mb-4" style="color: #17a2b8;">MAXIPARTES Bolivia</h5>
            <p>Tu proveedor confiable de repuestos y accesorios automotrices en toda Bolivia. Calidad y servicio garantizado.</p>
          </div>

          <div class="col-lg-2 col-md-6">
            <h5 class="text-uppercase fw-bold mb-4" style="color: #17a2b8;">Enlaces</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="/index.html" class="text-white text-decoration-none">Inicio</a></li>
              <li class="mb-2"><a href="/pages/catalogo.html" class="text-white text-decoration-none">Catálogo</a></li>
              <li class="mb-2"><a href="/pages/quienes_somos.html" class="text-white text-decoration-none">Sobre Nosotros</a></li>
              <li class="mb-2"><a href="/pages/contactenos.html" class="text-white text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6">
            <h5 class="text-uppercase fw-bold mb-4" style="color: #17a2b8;">Soporte</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="/pages/Politicas_privacidad.html" class="text-white text-decoration-none">Política de Privacidad</a></li>
              <li class="mb-2"><a href="/pages/terminos_condiciones.html" class="text-white text-decoration-none">Términos y Condiciones</a></li>
              <li class="mb-2"><a href="https://maps.app.goo.gl/1pzHQBytZRtGEmf29" class="text-white text-decoration-none" target="_blank">Mapa del Sitio</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6">
            <h5 class="text-uppercase fw-bold mb-4" style="color: #17a2b8;">Contacto</h5>
            <p><i class="bi bi-geo-alt-fill me-2"></i> Av. 4to. anillo, entre Av. canal Isuto y Av. Oriental. Santa Cruz, Bolivia</p>
            <p><i class="bi bi-envelope-fill me-2"></i> info@maxipartes.bo</p>
            <p><i class="bi bi-telephone-fill me-2"></i> +591 77822038, +591 77822211</p>
            <div class="mt-4">
              <strong class="d-block mb-2">Síguenos:</strong>
              <a href="https://www.facebook.com/Maxipartesbolivia" target="_blank" class="text-white me-3"><i class="bi bi-facebook" style="font-size: 1.8rem;"></i></a>
              <a href="https://www.instagram.com/maxipartes_bolivia" target="_blank" class="text-white me-3"><i class="bi bi-instagram" style="font-size: 1.8rem;"></i></a>
              <a href="https://www.tiktok.com/@repuestos.maxipartes" target="_blank" class="text-white me-3"><i class="bi bi-tiktok" style="font-size: 1.8rem;"></i></a>
              <a href="#" class="text-white btn-global-whatsapp"><i class="bi bi-whatsapp" style="font-size: 1.8rem;"></i></a>
            </div>
          </div>

        </div>
      </div>

      <!-- Vista Mobile -->
      <div class="d-md-none">
        <div class="accordion accordion-flush" id="footerAccordion">

          <div class="accordion-item bg-dark text-white border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1">
                MAXIPARTES Bolivia
              </button>
            </h2>
            <div id="flush-collapse1" class="accordion-collapse collapse" data-bs-parent="#footerAccordion">
              <div class="accordion-body">
                Tu proveedor confiable de repuestos y accesorios automotrices en toda Bolivia. Calidad y servicio garantizado.
              </div>
            </div>
          </div>

          <div class="accordion-item bg-dark text-white border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse2">
                Enlaces
              </button>
            </h2>
            <div id="flush-collapse2" class="accordion-collapse collapse" data-bs-parent="#footerAccordion">
              <div class="accordion-body">
                <ul class="list-unstyled">
                  <li><a href="/index.html" class="text-white text-decoration-none">Inicio</a></li>
                  <li><a href="/pages/catalogo.html" class="text-white text-decoration-none">Catálogo</a></li>
                  <li><a href="/pages/quienes_somos.html" class="text-white text-decoration-none">Sobre Nosotros</a></li>
                  <li><a href="/pages/contactenos.html" class="text-white text-decoration-none">Contacto</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item bg-dark text-white border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse3">
                Soporte
              </button>
            </h2>
            <div id="flush-collapse3" class="accordion-collapse collapse" data-bs-parent="#footerAccordion">
              <div class="accordion-body">
                <ul class="list-unstyled">
                  <li><a href="/pages/Politicas_privacidad.html" class="text-white text-decoration-none">Política de Privacidad</a></li>
                  <li><a href="/pages/terminos_condiciones.html" class="text-white text-decoration-none">Términos y Condiciones</a></li>
                  <li><a href="https://maps.app.goo.gl/1pzHQBytZRtGEmf29" class="text-white text-decoration-none" target="_blank">Mapa del Sitio</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item bg-dark text-white border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4">
                Contacto
              </button>
            </h2>
            <div id="flush-collapse4" class="accordion-collapse collapse" data-bs-parent="#footerAccordion">
              <div class="accordion-body">
                <p><i class="bi bi-geo-alt-fill me-2"></i> Av. 4to. anillo, entre Av. canal Isuto y Av. Oriental. Santa Cruz, Bolivia</p>
                <p><i class="bi bi-envelope-fill me-2"></i> info@maxipartes.bo</p>
                <p><i class="bi bi-telephone-fill me-2"></i> +591 77822038, +591 77822211</p>
                <div class="mt-2">
                  <strong class="d-block mb-2">Síguenos:</strong>
                  <a href="https://www.facebook.com/Maxipartesbolivia" target="_blank" class="text-white me-3"><i class="bi bi-facebook" style="font-size: 1.6rem;"></i></a>
                  <a href="https://www.instagram.com/maxipartes_bolivia" target="_blank" class="text-white me-3"><i class="bi bi-instagram" style="font-size: 1.6rem;"></i></a>
                  <a href="https://www.tiktok.com/@repuestos.maxipartes" target="_blank" class="text-white me-3"><i class="bi bi-tiktok" style="font-size: 1.6rem;"></i></a>
                  <a href="#" class="text-white btn-global-whatsapp"><i class="bi bi-whatsapp" style="font-size: 1.6rem;"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <hr class="my-4 text-white">

      <div class="text-center">
        <p class="mb-0">MAXIPARTES Bolivia - Todos los derechos reservados &copy; 2025</p>
      </div>

    </div>
  </footer>
  `;

  const container = document.getElementById('footer-container');
  if (container) {
    container.innerHTML = footerHTML;
  }
})();
