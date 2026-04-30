# Manual Técnico del Sitio Web

## MAXIPARTES Bolivia

|               |                                             |
| ------------- | ------------------------------------------- |
| **Empresa**   | MAXIPARTES Bolivia                          |
| **Documento** | Manual de Mantenimiento y Uso del Sitio Web |
| **Versión**   | 1.1                                         |
| **Fecha**     | Abril 2026                                  |

---

## Introducción

Este documento centraliza toda la información necesaria para que el equipo de MAXIPARTES pueda **mantener, actualizar y expandir** el sitio web corporativo sin requerir conocimientos avanzados de programación.

El sitio fue desarrollado con enfoque en:

- **Facilidad de mantenimiento:** La base de datos de productos es un único archivo editable.
- **Experiencia de usuario:** Diseño responsivo (móvil, tablet y escritorio), modo oscuro automático.
- **Distribución inteligente de clientes:** Sistema de rotación de vendedores vía WhatsApp.

---

## Páginas del Sitio

| Página                 | Archivo                           | Descripción                                                                 |
| ---------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| Inicio                 | `index.html`                      | Carrusel hero, productos destacados, video corporativo y sección de valores |
| Catálogo               | `pages/catalogo.html`             | Listado completo de productos con filtros por marca y categoría             |
| Quiénes Somos          | `pages/quienes_somos.html`        | Historia, misión, visión y equipo de la empresa                             |
| Contáctenos            | `pages/contactenos.html`          | Formulario de contacto, mapa y datos de la empresa                          |
| Términos y Condiciones | `pages/terminos_condiciones.html` | Página legal                                                                |
| Política de Privacidad | `pages/Politicas_privacidad.html` | Página legal                                                                |

---

## Tecnologías Utilizadas

| Tecnología           | Uso                                                     |
| -------------------- | ------------------------------------------------------- |
| HTML5 + CSS3         | Estructura y estilos de todas las páginas               |
| JavaScript (Vanilla) | Lógica del catálogo, filtros, navbar, footer y WhatsApp |
| Bootstrap 5.3        | Componentes visuales (rejillas, navbar, modales)        |
| Bootstrap Icons 1.12 | Iconografía del sitio                                   |
| Google Fonts (Inter) | Tipografía corporativa                                  |

Bootstrap y Bootstrap Icons se cargan desde CDN (sin instalación local). No se utiliza ningún servidor, base de datos externa ni plataforma de pago. El sitio funciona con archivos estáticos.

---

## Estructura de Archivos

```
/
├── index.html                        ← Página principal
├── pages/
│   ├── catalogo.html
│   ├── quienes_somos.html
│   ├── contactenos.html
│   ├── terminos_condiciones.html
│   └── Politicas_privacidad.html
├── assets/
│   ├── js/
│   │   ├── productos.js              ← BASE DE DATOS de productos ⭐
│   │   ├── main.js                   ← Motor del catálogo y filtros
│   │   ├── navbar.js                 ← Navegación global + WhatsApp Round Robin
│   │   ├── footer.js                 ← Pie de página global
│   │   └── contacto.js              ← Lógica del formulario
│   ├── css/
│   │   ├── diseño.css               ← Estilos globales y paleta de colores
│   │   ├── carusel-marcas.css       ← Carrusel de marcas en el header
│   │   ├── contactenos.css          ← Estilos de la página de contacto
│   │   ├── terminos_condiciones.css ← Estilos de la página de términos
│   │   └── politica_privacidad.css  ← Estilos de la página de privacidad
│   ├── images/
│   │   ├── general/                 ← Logo, favicon, imágenes del hero
│   │   ├── marcas/                  ← Logos de marcas de vehículos
│   │   ├── nosotros/                ← Fotos para "Quiénes Somos"
│   │   └── productos/               ← Imágenes de productos del catálogo
│   └── video/
│       └── C_Maxipartes_video.mp4   ← Video corporativo
```

---

## Cómo Ejecutar el Sitio Localmente

> **Importante:** El sitio usa rutas absolutas (empiezan con `/`), por ejemplo `/assets/js/navbar.js`. Si abres `index.html` haciendo doble clic, el navegador no encontrará ningún archivo y el sitio aparecerá en blanco o sin estilos.

Para verlo correctamente necesitas un servidor web local. La forma más sencilla es con la extensión **Live Server** de VS Code:

1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server** (si no la tienes).
3. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
4. El sitio abrirá en `http://127.0.0.1:5500/` y se actualizará automáticamente al guardar cambios.

---

## 1. Gestión de Productos

**Archivo principal:** `assets/js/productos.js`

Este archivo es la **base de datos** del sitio. Contiene todos los productos que aparecen en el catálogo y en la sección de "Productos Destacados" del inicio.

### Estructura de un producto

```javascript
{
  id: 'susp-001',                    // Código único — NO repetir
  nombre: 'AMORTIGUADOR DELANTERO',
  descripcion: 'Descripción del producto.',
  categoria: 'suspension',           // Ver tabla de categorías abajo
  subcategoria: 'amortiguadores',
  imagen: '/assets/images/productos/suspension/amortiguadores/susp-001.webp',
  marca: 'KYB',                      // Marca del fabricante del repuesto
  codigo: 'KYB-334331',              // Código del proveedor
  compatibilidad: ['Suzuki'],        // Array de marcas de vehículo compatibles
  marcaVehiculo: 'Suzuki',           // Marca principal (usada en la tarjeta)
  modeloVehiculo: ['Grand Vitara'],  // Array de modelos compatibles
  precio: null,                      // null = "Consultar precio" por WhatsApp
  disponibilidad: true,              // true = En stock | false = Bajo pedido
  destacado: false,                  // true = aparece en inicio como destacado
  etiqueta: null                     // null | 'NUEVO' | 'OFERTA' | 'PREMIUM'
}
```

> **Nota sobre compatibilidad universal:** Si un producto es compatible con todas las marcas (aceites, accesorios genéricos, etc.), usa `marcaVehiculo: 'Universal'` y `compatibilidad: ['Universal']`. Estos productos aparecerán en los resultados independientemente del filtro de marca seleccionado.

### Categorías válidas

| Código           | Nombre visible en el sitio |
| ---------------- | -------------------------- |
| `motor`          | Motor                      |
| `suspension`     | Suspensión                 |
| `filtros`        | Filtros                    |
| `frenos`         | Frenos                     |
| `embrague`       | Embrague                   |
| `aceites`        | Aceites                    |
| `electricidad`   | Electricidad               |
| `direccion`      | Dirección                  |
| `refrigeracion`  | Refrigeración              |
| `transmision`    | Transmisión                |
| `carroceria`     | Carrocería                 |
| `accesorios`     | Accesorios                 |
| `iluminacion`    | Iluminación                |

### Imágenes de productos

Las imágenes deben estar en la carpeta correspondiente a su categoría:

```
/assets/images/productos/{categoria}/{subcategoria}/{id}.webp
```

> **Recomendación:** Usar formato `.webp`. Tamaño ideal: 800×800 px.

---

## 2. Productos Destacados

Los productos que aparecen en la sección de inicio son los primeros **4 productos** con `destacado: true` en `productos.js`.

**Para activar un producto como destacado:**

- Abre `assets/js/productos.js`
- Encuentra el producto y cambia `destacado: false` a `destacado: true`

**Para cambiar el número de destacados mostrados**, edita en `assets/js/main.js`:

```js
const featured = productos.filter((p) => p.destacado).slice(0, 4);
// Cambia el número 4 por la cantidad deseada            ↑
```

---

## 3. Catálogo — Configuración de Tarjetas y Paginación

El catálogo muestra **9 productos por página** de forma predeterminada.

Para cambiar esta cantidad, edita en `assets/js/main.js`:

```js
const PRODUCTS_PER_PAGE = 9; // ← cambiar este número
```

Cada tarjeta muestra automáticamente: imagen, categoría, disponibilidad (En stock / Bajo pedido), etiqueta especial si aplica, nombre, descripción, marca, vehículo compatible y botón de consulta por WhatsApp.

### Paginación

Cuando hay más productos que `PRODUCTS_PER_PAGE`, aparece una paginación automática debajo de la grilla. Esta usa una **ventana inteligente**: siempre muestra la primera página, la última y las páginas adyacentes a la actual, con `...` en los saltos para no ocupar espacio.

La paginación también hace scroll automático al inicio de la grilla al cambiar de página.

### Buscador en tiempo real

El campo de búsqueda filtra mientras el usuario escribe (con un retardo de 300 ms para no sobrecargar). Busca simultáneamente en: nombre, código, marca del repuesto, categoría, subcategoría, descripción, marcas compatibles y modelos de vehículo.

---

## 4. Filtros del Catálogo

> **Importante:** Los filtros están duplicados en **dos archivos HTML**. Cualquier cambio (agregar marca, categoría, etc.) debe hacerse en **ambos**:
> - `index.html` — sección catálogo del inicio
> - `pages/catalogo.html` — página dedicada al catálogo

Los filtros permiten buscar por texto, categoría y marca de vehículo.

### Agregar una nueva marca al filtro

En **ambos** archivos HTML, busca el elemento `id="brand-filter-list"` y agrega:

```html
<li>
  <label><input type="checkbox" value="Honda" /> Honda</label>
</li>
```

### Agregar una nueva categoría al filtro

En **ambos** archivos HTML, busca `id="category-select"` y agrega:

```html
<option value="refrigeracion">Refrigeración</option>
```

Luego registra la categoría en `assets/js/main.js` en el objeto `categoryNames`:

```js
'refrigeracion': 'Refrigeración',
```

---

## 5. Sistema de WhatsApp (Round Robin)

El sitio distribuye los mensajes de clientes de forma **aleatoria** entre los vendedores registrados.

### Números actuales

Los números se configuran en `assets/js/navbar.js` (aproximadamente línea 174):

```js
const numbers = ['59177822038', '59177822211', '59177822028'];
```

Para agregar un cuarto vendedor, simplemente añade su número (sin el `+`) al array:

```js
const numbers = ['59177822038', '59177822211', '59177822028', '59177812345'];
```

### Cómo funciona

Cada vez que un cliente hace clic en cualquier botón de WhatsApp del sitio, el sistema elige un número al azar de la lista y redirige al chat de ese vendedor. Esto garantiza una distribución equitativa de consultas.

### Mensajes automáticos según contexto

Dependiendo de desde dónde consulta el cliente, el mensaje que llega al vendedor varía:

| Origen del clic          | Información incluida en el mensaje                                 |
| ------------------------ | ------------------------------------------------------------------ |
| Tarjeta de catálogo      | Código interno, nombre del producto, vehículo, marca del repuesto  |
| Tarjeta de destacados    | Nombre del producto, código del proveedor, marca del repuesto      |
| Formulario de contacto   | Nombre del cliente, correo, asunto y mensaje libre                 |
| Botón general (navbar, footer, etc.) | Sin texto predefinido, abre WhatsApp directamente    |

### Agregar un botón de WhatsApp en cualquier página

Basta con usar la clase `btn-global-whatsapp` en cualquier enlace:

```html
<a href="#" class="btn-global-whatsapp">
  <i class="bi bi-whatsapp"></i> Consultar
</a>
```

El sistema asignará el número automáticamente al hacer clic.

---

## 6. Carrusel de Imágenes (Hero)

El carrusel principal de la página de inicio está en `index.html` (líneas 27–77).

**Para cambiar una imagen del carrusel**, reemplaza el atributo `src` de la etiqueta `<img>` correspondiente:

```html
<img
  src="/assets/images/general/NUEVA_IMAGEN.webp"
  class="d-block w-100"
  alt="..."
/>
```

**Para controlar el enfoque de una imagen** (mostrar la parte superior, inferior, etc.), agrega un `style` con `object-position`:

```html
<!-- Mostrar la parte superior de la imagen -->
<img
  src="..."
  class="d-block w-100"
  style="object-fit:cover; object-position: center top;"
/>

<!-- Mostrar un punto específico (X% horizontal, Y% vertical) -->
<img
  src="..."
  class="d-block w-100"
  style="object-fit:cover; object-position: 50% 30%;"
/>
```

| Valor           | Efecto                                     |
| --------------- | ------------------------------------------ |
| `center top`    | Muestra la parte superior                  |
| `center center` | Centro (predeterminado)                    |
| `center bottom` | Muestra la parte inferior                  |
| `50% 20%`       | 20% desde arriba, centrado horizontalmente |

---

## 7. Video Corporativo

El video está ubicado en `assets/video/C_Maxipartes_video.mp4` y se muestra en la página de inicio como una sección dividida (texto izquierda / video derecha), debajo de los productos.

**Para reemplazar el video**, sustituye el archivo manteniendo exactamente el mismo nombre `C_Maxipartes_video.mp4`, o cambia el atributo `src` en `index.html`:

```html
<video src="/assets/video/NUEVO_VIDEO.mp4" controls ...></video>
```

---

## 8. Navbar y Footer (Componentes Globales)

El menú de navegación y el pie de página son componentes compartidos en todo el sitio. Cualquier cambio en los archivos JS correspondientes se aplica automáticamente en todas las páginas.

| Elemento a modificar              | Archivo                                 |
| --------------------------------- | --------------------------------------- |
| Links del menú                    | `assets/js/navbar.js`                   |
| Logo                              | `assets/js/navbar.js`                   |
| Carrusel de marcas (header)       | `assets/js/navbar.js`                   |
| Redes sociales y links del footer | `assets/js/footer.js`                   |
| Teléfonos en el footer            | `assets/js/footer.js` (aprox. línea 49) |

### Orden de carga de los scripts (importante)

Los scripts deben incluirse en un orden específico para que funcionen correctamente:

```html
<head>
  ...
  <!-- navbar.js va en el <head> para aplicar el modo oscuro antes de que la página se pinte -->
  <script src="/assets/js/navbar.js"></script>
</head>
<body>
  <div id="navbar-container"></div>
  ...contenido de la página...
  <div id="footer-container"></div>

  <!-- Bootstrap JS, productos.js, main.js y footer.js van al final del <body> -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/assets/js/productos.js"></script>
  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
```

> Si `navbar.js` se carga al final, el modo oscuro parpadea al cargar la página porque el HTML ya se pintó antes de que se aplique la clase.

### Footer en móvil

En dispositivos móviles el footer se convierte en un **acordeón** (secciones colapsables) para ahorrar espacio. Esto se gestiona automáticamente dentro de `footer.js` con dos versiones del HTML: una para escritorio (visible solo en `d-none d-md-block`) y otra para móvil (visible solo en `d-md-none`). Si editas el footer, recuerda actualizar **ambas versiones** dentro del archivo.

---

## 9. Modo Oscuro

El sitio incluye un botón en la navbar (ícono de luna/sol) que alterna entre modo claro y oscuro. La preferencia del usuario se guarda automáticamente en su navegador.

### Cómo funciona internamente

- La preferencia se guarda en `localStorage` con la clave `mp-dark-mode` (valor: `'true'` o `'false'`).
- Si el usuario nunca lo activó, se detecta automáticamente la preferencia del sistema operativo (`prefers-color-scheme`).
- Al activar el modo oscuro, se añade la clase `dark` al elemento `<html>`. Todos los estilos del modo oscuro usan el selector `.dark` en `diseño.css`.
- El logo también cambia automáticamente:
  - Modo claro: `assets/images/general/Logo_Maxipartes_light.png`
  - Modo oscuro: `assets/images/general/Logo_Maxipartes_dark.jpg`

### Paleta de colores y variables CSS

La paleta de colores corporativa se gestiona desde las variables en `assets/css/diseño.css`:

| Variable        | Valor       | Uso                                      |
| --------------- | ----------- | ---------------------------------------- |
| `--mp-red`      | `#CF2C2F`   | Rojo corporativo (botones, badges)       |
| `--mp-red-dark` | `#a82224`   | Rojo oscuro (hover de botones)           |
| `--mp-navy`     | `#1E2337`   | Azul marino (navbar, fondos oscuros)     |
| `--mp-bg-light` | `#F9FAFB`   | Fondo en modo claro                      |
| `--mp-slate`    | `#64748b`   | Texto secundario / subtítulos            |
| `--mp-border`   | `#e2e8f0`   | Color de bordes                          |
| `--mp-text`     | `#1e293b`   | Color de texto principal                 |
| `--shadow-sm`   | —           | Sombra sutil para tarjetas               |
| `--shadow-md`   | —           | Sombra media (hover de tarjetas)         |
| `--radius`      | `0.75rem`   | Radio de bordes redondeados              |
| `--transition`  | `all .3s`   | Transición estándar para animaciones     |

---

## 10. Formulario de Contacto

El formulario de la página de Contáctenos envía el mensaje directamente a WhatsApp (al vendedor que asigne el sistema Round Robin).

**Archivo de lógica:** `assets/js/contacto.js`

Para cambiar el texto del mensaje enviado al vendedor, edita en ese archivo:

```js
const fullMessage = `Hola, soy ${name}.\nCorreo: ${email}\nAsunto: ${subject}\nMensaje:\n${message}`;
```

---

## 11. Mapa de Ubicación

El mapa en la página de Contáctenos usa Google Maps incrustado. Para cambiar la ubicación:

1. Ve a [maps.google.com](https://maps.google.com) y ubica la nueva dirección.
2. Clic en **Compartir → Insertar un mapa**.
3. Copia el código `<iframe>` que genera Google.
4. En `pages/contactenos.html`, reemplaza el `<iframe>` existente con el nuevo.

---

## 12. Imágenes de "Quiénes Somos"

Las imágenes de la página corporativa se almacenan en `assets/images/nosotros/`. Para actualizarlas, reemplaza los archivos manteniendo los mismos nombres de archivo que se referencian en `pages/quienes_somos.html`.

---

## 13. Agregar una Nueva Página

Para crear una nueva página dentro del sitio, usa esta plantilla base. Respeta el orden de los scripts para que el navbar, footer y modo oscuro funcionen correctamente.

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Descripción de la página para buscadores.">
  <title>Título de la Página | MAXIPARTES Bolivia</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- CSS propio -->
  <link rel="stylesheet" href="/assets/css/diseño.css">
  <link rel="stylesheet" href="/assets/css/carusel-marcas.css">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/general/favicon-16x16.png">

  <!-- Bootstrap CSS (CDN) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">

  <!-- navbar.js va en el <head> para evitar el parpadeo del modo oscuro -->
  <script src="/assets/js/navbar.js"></script>
</head>
<body>

  <!-- Navbar -->
  <div id="navbar-container"></div>

  <!-- ═══ CONTENIDO DE LA PÁGINA ═══ -->
  <main class="container py-5">
    <h1>Título de la sección</h1>
    <p>Contenido...</p>
  </main>
  <!-- ════════════════════════════════ -->

  <!-- Footer -->
  <div id="footer-container"></div>

  <!-- Bootstrap JS (al final del body) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
  <!-- footer.js al final del body -->
  <script src="/assets/js/footer.js"></script>

  <!-- Si la página usa el catálogo o productos destacados, incluir también: -->
  <!-- <script src="/assets/js/productos.js"></script> -->
  <!-- <script src="/assets/js/main.js"></script>     -->

</body>
</html>
```

Guarda el archivo en la carpeta `pages/` con un nombre descriptivo en minúsculas y sin espacios (por ejemplo `pages/nueva_seccion.html`).

Luego, si quieres que aparezca en el menú de navegación, agrégala en `assets/js/navbar.js` dentro del bloque `<ul class="navbar-nav">`:

```html
<li class="nav-item">
  <a class="nav-link" href="/pages/nueva_seccion.html">Nueva Sección</a>
</li>
```

Y en `assets/js/footer.js`, en la lista de "Enlaces" (tanto en la versión escritorio como en la versión móvil).