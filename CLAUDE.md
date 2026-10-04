# CLAUDE.md — Refugio del Valle (Astro)

Documento de referencia para Claude Code. Consultar antes de cada acción no trivial.

## 1. Identidad del proyecto

- **Nombre:** Refugio del Valle — sitio institucional
- **Cliente:** Alfonso
- **Dominio destino:** `refugiodelvalletandil.com.ar`
- **Canónica oficial:** `https://www.refugiodelvalletandil.com.ar` (con www, con https)
- **Propósito:** Migración SEO desde WordPress. La versión React anterior queda descartada.
- **Visualmente:** prácticamente idéntico al React anterior. Lo que cambia es la infraestructura SEO.
- **Prioridad estratégica:** preservar el posicionamiento orgánico que ya tiene el dominio. Toda decisión arquitectónica se evalúa con esa vara.

## 2. Stack y versiones

- **Astro:** 6.2.2
- **Tailwind CSS:** 4.1.16 (vía `@tailwindcss/vite`, NO el viejo `@astrojs/tailwind`)
- **React:** 19.2.0 (solo para islands interactivos)
- **TypeScript:** strict (vía `astro/tsconfigs/strict`)
- **Gestor de paquetes:** PNPM 10.33.0 (NO npm, NO yarn). Razón: seguridad — PNPM no ejecuta scripts postinstall/preinstall automáticamente.
- **Node:** 22+ (requisito de Astro 6)

## 3. Workflow de trabajo

- **Claude.ai planifica, Claude Code ejecuta.** Toda escritura de código va acá.
- **Un archivo a la vez.** Después de cada cambio, esperar confirmación del usuario antes de pasar al siguiente.
- **No adelantarse.** No escribir prompts del próximo paso ni código adicional sin pedido explícito.
- **Datos no confirmados → preguntar.** Si aparece un dato nuevo (slug, ruta, contenido, credencial, dominio), preguntar y esperar confirmación antes de incorporarlo.
- **Inspección antes de modificación.** Para cambios no triviales: primero leer/inspeccionar, después confirmar plan, después implementar.
- **Si algo falla o aparece algo inesperado:** parar y preguntar.

## 4. Decisiones arquitectónicas cerradas

### 4.1 Layouts en cascada

- **`BaseLayout.astro`** — estructura HTML base, `<head>` con SEO, Navbar, Footer, WhatsAppButton, `<slot />` para contenido. Importa `@/styles/global.css` una sola vez (es el único lugar del proyecto donde se importa).
- **`PageLayout.astro`** — envuelve `BaseLayout`. Agrega `PageHero` arriba + `<main>` con padding consistente bajo navbar + `<slot />` para contenido específico.
- **El home usa solo `BaseLayout`** (porque tiene Hero propio con video que no encaja en el patrón estándar).
- **Todas las demás páginas usan `PageLayout`**, que resuelve el espaciado bajo navbar de una sola vez para todo el sitio.

### 4.2 SEO: objeto `seo` tipado como prop única

- El `BaseLayout` recibe **un solo objeto `seo` tipado** (no muchas props sueltas).
- Tipo `SEOProps` definido en `src/types/seo.ts`. Schemas JSON-LD como prop opcional dentro del mismo objeto (`seo.schemas`).
- TypeScript strict obliga a declarar `title` y `description` en cada página. Es **imposible** publicar una página sin meta tags básicos — el compilador no lo permite.
- Componente `<SEO />` en `src/components/seo/SEO.astro` renderiza meta tags + Open Graph + Twitter Cards + canónica + schemas.
- **NUNCA meta tags directamente en páginas.** Siempre vía componente `<SEO />` invocado desde `BaseLayout`.

### 4.3 Tokens de diseño

- **Reutilizados del proyecto React tal cual.** El archivo `src/styles/global.css` es copia byte-perfect del `index.css` original (aprobado por Alfonso).
- Paleta: 13 colores con nombre semántico (`verde-bosque`, `verde-sierra`, `crema`, `oscuro`, etc.).
- Tipografías: **Playfair Display** (display) + **DM Sans** (body), via Google Fonts `@import`.
- Animaciones, scroll reveal, marquee, texture grain, custom scrollbar — todo definido en el `global.css`.

### 4.4 Carga de fuentes

- **Google Fonts vía `@import`** en `global.css` (como en React). No optimizar a self-hosting por ahora.
- Si en el futuro Lighthouse marca un problema crítico de performance por las fuentes, reevaluar.

### 4.5 Tipado y alias

- **Tipos compartidos** (`SEOProps`, `SchemaConfig`, `LayoutProps`) → en `src/types/`.
- **Tipos locales simples** (props de Button, secciones específicas) → inline en el componente.
- **Alias `@/` apunta a `src/`** (configurado en `tsconfig.json`).
- Imports siempre vía alias: `import X from '@/components/...'`, NO con paths relativos largos.

## 5. Estructura de carpetas (definitiva)
src/
├── components/
│   ├── ui/              (Button, etc.)
│   ├── layout/          (Navbar, Footer, WhatsAppButton, AccesibilidadButton)
│   ├── sections/        (secciones del home y otras páginas)
│   │   ├── accesibilidad/   (Introduccion, NormasCumplidas, AreaCardioProtegida)
│   │   └── parque-aereo/    (Introduccion, Stats, ExperienciaUnica, ...)
│   └── seo/             (SEO.astro, SchemaJsonLd.astro)
├── layouts/
│   ├── BaseLayout.astro
│   └── PageLayout.astro
├── pages/               (rutas: home, actividades, contacto, el-lugar, english-camp, faq, instituciones, nosotros, parque-aereo, accesibilidad)
├── styles/
│   └── global.css       (tokens, animaciones, reset — copia del index.css del React)
└── types/
├── seo.ts           (SEOProps, SchemaConfig)
└── layout.ts        (PageLayoutProps, etc.)
public/
├── favicon.ico
├── favicon.svg
├── robots.txt           (a crear)
├── .htaccess            (a crear, con redirects 301 desde URLs viejas de WP)
├── videos/
│   ├── hero-horizontal.mp4
│   └── hero-vertical.mp4
└── images/
├── og/
├── 404/
├── home/
│   ├── hero-horizontal-poster.jpg
│   └── hero-vertical-poster.jpg
├── nosotros/
├── el-lugar/
└── actividades/

## 6. Reglas de SEO (críticas)

- **NUNCA meta tags directamente en páginas.** Siempre vía componente `<SEO />`.
- **Schemas JSON-LD** vía componente `<SchemaJsonLd />`. Schemas a implementar: Organization, LodgingBusiness, WebPage, FAQPage, ContactPage, BreadcrumbList.
- **Canónica:** `https://www.refugiodelvalletandil.com.ar` (con www, con https).
- **Idioma HTML:** `es-AR`. **Open Graph locale:** `es_AR`.
- **Fecha de publicación original a preservar en schemas:** `2022-03-07T16:29:55-03:00`.
- **Sitemap:** vía `@astrojs/sitemap` (configurado en `astro.config.mjs`).
- **`robots.txt`:** archivo estático en `public/robots.txt`.
- **`.htaccess`** con redirects 301 desde URLs viejas de WordPress: archivo en `public/.htaccess`.

## 7. Reglas de assets

- Imágenes en `public/images/...`
- Referencias con paths absolutos (`/images/...`).
- **NO usar `import.meta.env.BASE_URL`** (era patrón del proyecto React, no aplica acá: el sitio va en raíz de dominio).
- **OG images:** 1200×630, formato JPG.

## 8. Deploy

- **Build:** `pnpm build` → genera `dist/`.
- **Upload:** FileZilla a Ferozo.
- **Sin staging intermedio.** De local va directo a producción cuando esté listo y validado.
- **Sitio en raíz** de `refugiodelvalletandil.com.ar`. El `astro.config.mjs` tiene `site: 'https://www.refugiodelvalletandil.com.ar'`.

## 9. Datos del cliente confirmados

- **GPS del predio:** `-37.37241, -59.11571`
- **Instagram:** `https://www.instagram.com/refugiodelvalletandil/`
- **Facebook:** `https://www.facebook.com/refugiodelvalletandil`
- **HTTPS:** ya configurado a nivel servidor en Ferozo.

## 10. Lo que NO se hace en este proyecto

- **No usar `astro-seo`** (paquete de la comunidad). Componentes propios.
- **No usar `@astrojs/rss`.** No hay blog/feed.
- **No instalar paquetes adicionales sin acuerdo previo.**
- **No tocar el WordPress vivo** ni el repo React anterior. Son referencias intactas.
- **No usar self-hosting de fuentes** por ahora. Google Fonts vía `@import`.
- **No usar paths relativos largos** (`../../../`). Siempre alias `@/`.
- **No usar clases de Tailwind v4 poco comunes sin verificar que se generan.** Tailwind v4 es estricto con el escaneo: si una clase como `p-7`, `gap-9` o `mt-13` no aparece literalmente en ningún archivo del proyecto, **no se genera** y no aplica nada. Usar la escala estándar (`p-6`, `p-8`, `p-10`, etc.) o clases que ya estén en uso en otros componentes del proyecto.

## 11. Hero del home — patrón de video

### 11.1 Estructura

- **Dos videos por orientación:**
  - `public/videos/hero-horizontal.mp4` → tablet/desktop (≥640px)
  - `public/videos/hero-vertical.mp4` → mobile (<640px)
- **Posters obligatorios:**
  - `public/images/home/hero-horizontal-poster.jpg`
  - `public/images/home/hero-vertical-poster.jpg`
- Los posters son el primer frame del video correspondiente, para que la transición poster → video sea invisible.

### 11.2 Carga condicional

- Un solo `<video>` en el DOM, sin `src` ni `poster` en el HTML.
- Un script inline (con `is:inline`) detecta el viewport vía `matchMedia('(min-width: 640px)')` y setea `video.src` y `video.poster` según corresponda.
- Después de setear el `src`, llama a `video.load()`.
- Esto evita que el navegador descargue ambos videos simultáneamente (problema del approach anterior con dos `<video>` ocultos por CSS).

### 11.3 Atributos del video

- `autoplay muted loop playsinline`
- `preload="metadata"` (no descarga el video entero hasta estar listo para reproducir)
- `aria-hidden="true"` (es decorativo)

### 11.4 Overlay

- Gradient: `from-oscuro/70 via-oscuro/40 to-transparent`.
- **No usar `via-verde-bosque/...`**: tiñe el video y compite con el verde natural del paisaje. Decisión tomada con el cliente.

### 11.5 Compresión de los videos

- Todos los videos del sitio (hero del home, hero de parque-aéreo, videos de contenido) se comprimen con **HandBrake** antes de subir.
- Parámetros de referencia: **RF 22-24**, preset **Slower**, codec **H.264 High@4.1**, **Optimizar para Web**, **sin audio** (los videos son decorativos y van `muted`).
- Para videos verticales: en HandBrake, pestaña **Dimensions** → "Límite de resolución" en `Ninguno` (sino te recorta el video vertical a cuadrado). Verificar que "Dimensiones finales" muestre el aspect ratio correcto antes de exportar.
- Apuntar a **10-15 MB por video de hero** y **15-25 MB por video de contenido**. Si baja la calidad notablemente, priorizar la calidad y aceptar más peso.
- Para videos de contenido largos (>30s), evaluar **recortar la duración** antes que seguir bajando bitrate — un video más corto pesa menos y rinde mejor en web.

## 12. Página El Lugar — recorridos virtuales

### 12.1 Tours embebidos

La sección "Recorridos virtuales" muestra tres iframes apilados verticalmente, en este orden:
1. **espacios360.com.ar/refugio** — recorrido general del predio (preexistente)
2. **Matterport — Salón Refugio del Valle** (`m=ihoNSUqdSBn`)
3. **Matterport — Edificio Mirador** (`m=rHh24wBEsM5`)

### 12.2 Atributos de los iframes

- Los iframes de Matterport llevan `loading="lazy"` para no penalizar la carga inicial de la página.
- Atributos: `allow="xr-spatial-tracking; fullscreen"`, `allowfullscreen`, `height="520"`, `width="100%"`.

### 12.3 Decisión pendiente

- Hoy los tres tours están embebidos directos, por pedido del cliente para ver el resultado rápido.
- **Patrón recomendado a futuro (a discutir con cliente):** imagen previa + botón "Iniciar tour 3D" + modal a pantalla completa. Esto evita cargar ~15-45 MB de assets 3D en la página El Lugar.