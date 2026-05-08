/**
 * Defaults y constantes de configuración SEO del proyecto.
 *
 * Una sola fuente de verdad para valores que se reutilizan en todo el sitio.
 * Si necesitás cambiar uno, se cambia acá y se propaga a todas las páginas.
 *
 * Tipos asociados en: src/types/seo.ts
 */

/**
 * URL base canónica del sitio (con www y https).
 * Coincide con `site` en astro.config.mjs.
 */
export const SITE_URL = 'https://www.refugiodelvalletandil.com.ar';

/**
 * Nombre del sitio. Usado en og:site_name y en algunos schemas.
 */
export const SITE_NAME = 'Refugio del Valle';

/**
 * Locale para Open Graph y atributo lang del HTML.
 */
export const SITE_LOCALE = 'es_AR'; // formato Open Graph
export const SITE_LANG = 'es-AR';   // formato HTML lang

/**
 * Imagen Open Graph por default cuando una página no declara la suya.
 * Temporal: usamos og-home.jpg hasta tener una og-default.jpg dedicada.
 */
export const DEFAULT_OG_IMAGE = '/images/og/og-home.jpg';

/**
 * Tipo de Twitter Card. 'summary_large_image' es el formato con imagen
 * grande arriba (mejor CTR para sitios visuales).
 */
export const TWITTER_CARD_TYPE = 'summary_large_image';

/**
 * Tipo de Open Graph por default.
 */
export const DEFAULT_OG_TYPE = 'website';

/**
 * Fecha de publicación original del sitio (preservada del WordPress).
 * Se usa en schemas WebPage para mantener la antigüedad del dominio
 * a ojos de Google.
 */
export const SITE_PUBLISHED_DATE = '2022-03-07T16:29:55-03:00';

/**
 * Coordenadas GPS del predio (para schemas de tipo LodgingBusiness).
 */
export const SITE_GEO = {
  latitude: -37.37241,
  longitude: -59.11571,
} as const;

/**
 * URLs de redes sociales (para schema Organization → sameAs).
 */
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/refugiodelvalletandil/',
  facebook: 'https://www.facebook.com/refugiodelvalletandil',
} as const;
