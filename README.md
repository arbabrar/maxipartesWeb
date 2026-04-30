# MAXIPARTES Bolivia — Sitio Web Corporativo

Sitio web estático para **MAXIPARTES Bolivia**, empresa distribuidora de repuestos y autopartes para vehículos de las principales marcas del mercado boliviano.

---

## Características principales

- **Catálogo de productos** con buscador en tiempo real, filtros por marca y categoría, paginación automática y tarjetas con enlace directo a WhatsApp.
- **Modo oscuro / claro** con detección automática de preferencia del sistema operativo y persistencia en `localStorage`. Los logos del carrusel cambian automáticamente entre versiones light y dark.
- **Carrusel de marcas infinito** en el navbar con logos de 17 marcas (Changan, Chery, Chevrolet, Foton, JAC, Mitsubishi, Great Wall, Honda, Hyundai, Kia, Mazda, Nissan, Renault, Subaru, Suzuki, Toyota, Mini).
- **WhatsApp Round Robin** — distribuye las consultas de los clientes de forma aleatoria entre los vendedores registrados. Un solo clic en cualquier botón del sitio redirige al vendedor disponible.
- **Diseño 100% responsivo** — adaptado para móvil, tablet y escritorio con Bootstrap 5.3.
- **Sin servidor ni base de datos** — todo el contenido se gestiona desde un único archivo `productos.js`.

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| HTML5 + CSS3 | — | Estructura y estilos |
| JavaScript (Vanilla) | — | Lógica de catálogo, filtros, navbar, WhatsApp |
| Bootstrap | 5.3.5 | Componentes UI, grilla responsiva |
| Bootstrap Icons | 1.12.1 | Iconografía |
| Google Fonts (Inter) | — | Tipografía corporativa |

Bootstrap y Bootstrap Icons se cargan desde CDN. No requiere instalación de dependencias.

---

## Estructura del proyecto

```
/
├── index.html                         ← Página principal
├── pages/
│   ├── catalogo.html                  ← Catálogo completo
│   ├── quienes_somos.html             ← Historia y equipo
│   ├── contactenos.html               ← Formulario y mapa
│   ├── terminos_condiciones.html      ← Página legal
│   └── Politicas_privacidad.html      ← Página legal
└── assets/
    ├── js/
    │   ├── productos.js               ← ⭐ Base de datos de productos
    │   ├── main.js                    ← Motor del catálogo y filtros
    │   ├── navbar.js                  ← Navbar global + dark mode + WhatsApp RR
    │   ├── footer.js                  ← Footer global
    │   └── contacto.js                ← Lógica del formulario de contacto
    ├── css/
    │   ├── diseño.css                 ← Estilos globales y variables de color
    │   ├── carusel-marcas.css         ← Carrusel de logos en el header
    │   ├── contactenos.css
    │   ├── terminos_condiciones.css
    │   └── politica_privacidad.css
    ├── images/
    │   ├── general/                   ← Logos, favicon, imágenes hero
    │   ├── marcas/                    ← Logos de marcas (light .webp + dark .png)
    │   ├── nosotros/                  ← Fotos de "Quiénes Somos"
    │   └── productos/                 ← Imágenes del catálogo
    └── video/
        └── C_Maxipartes_video.mp4     ← Video corporativo
```

---

## Ejecutar localmente

El sitio usa rutas absolutas (`/assets/...`), por lo que **no funciona abriéndolo directamente** con doble clic. Necesitas un servidor local:

**Opción 1 — VS Code + Live Server (recomendado)**
1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server**.
3. Clic derecho en `index.html` → **Open with Live Server**.
4. Accede en `http://127.0.0.1:5500/`.

**Opción 2 — Python**
```bash
python -m http.server 5500
```
Luego abre `http://localhost:5500/`.

**Opción 3 — Node.js**
```bash
npx serve .
```

---

## Gestión de contenido

### Agregar o editar productos

Abre `assets/js/productos.js` y agrega un objeto al array `productos`:

```js
{
  id: 'susp-001',
  nombre: 'AMORTIGUADOR DELANTERO',
  descripcion: 'Compatible con modelos 2015–2022.',
  categoria: 'suspension',
  subcategoria: 'amortiguadores',
  imagen: '/assets/images/productos/suspension/amortiguadores/susp-001.webp',
  marca: 'KYB',
  codigo: 'KYB-334331',
  compatibilidad: ['Suzuki'],
  marcaVehiculo: 'Suzuki',
  modeloVehiculo: ['Grand Vitara'],
  precio: null,           // null = "Consultar precio"
  disponibilidad: true,   // true = En stock | false = Bajo pedido
  destacado: false,       // true = aparece en la página de inicio
  etiqueta: null          // null | 'NUEVO' | 'OFERTA' | 'PREMIUM'
}
```

### Categorías disponibles

`motor` · `suspension` · `filtros` · `frenos` · `embrague` · `aceites` · `electricidad` · `direccion` · `refrigeracion` · `transmision` · `carroceria` · `accesorios` · `iluminacion`

### Actualizar vendedores de WhatsApp

En `assets/js/navbar.js`, busca el array `numbers` y edita los números (formato: código de país + número, sin el `+`):

```js
const numbers = ['59177822038', '59177822211', '59177822028'];
```

### Agregar una nueva página

Usa la plantilla base del archivo `DOCUMENTACION.md` y guarda el archivo en `pages/`. Recuerda añadir el enlace al navbar en `navbar.js` y al footer en `footer.js`.

---

## Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--mp-red` | `#CF2C2F` | Rojo corporativo |
| `--mp-navy` | `#1E2337` | Azul marino (navbar dark) |
| `--mp-bg-light` | `#F9FAFB` | Fondo modo claro |
| `--mp-slate` | `#64748b` | Texto secundario |

Todas las variables están definidas en `:root` dentro de `assets/css/diseño.css`.

---

## Modo oscuro — logos de marcas

Los logos del carrusel del navbar tienen dos versiones:

- **`*.webp`** — versión original para modo claro.
- **`*-dark.png`** — versión con fondo transparente extraída y procesada para modo oscuro.

El intercambio es automático vía `data-light-src` / `data-dark-src` en cada `<img>`, gestionado por `navbar.js`.

---

## Documentación completa

Ver [`DOCUMENTACION.md`](./DOCUMENTACION.md) para el manual técnico completo con instrucciones detalladas sobre cada sección del sitio.

---

## Licencia

Proyecto privado desarrollado para uso exclusivo de **MAXIPARTES Bolivia**.
