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
│   ├── layout/          (Navbar, Footer, WhatsAppButton)
│   ├── sections/        (secciones del home y otras páginas)
│   └── seo/             (SEO.astro, SchemaJsonLd.astro)
├── layouts/
│   ├── BaseLayout.astro
│   └── PageLayout.astro
├── pages/               (rutas)
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
└── images/
├── og/
├── 404/
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