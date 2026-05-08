/**
 * Tipos para el sistema de SEO del proyecto.
 *
 * Consumidos por:
 * - src/components/seo/SEO.astro
 * - src/layouts/BaseLayout.astro
 * - Cada página .astro que use BaseLayout
 *
 * Defaults asociados en: src/lib/seo-defaults.ts
 */

// ============================================================
// SCHEMAS JSON-LD (Discriminated Unions)
// ============================================================

/**
 * Schema para la organización (Refugio del Valle como entidad).
 * Se usa típicamente en el home y propaga autoridad al dominio.
 */
export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[]; // URLs de redes sociales
  description?: string;
}

/**
 * Schema específico para alojamiento/hospedaje.
 * Es el más relevante para el SEO local del Refugio (rich results).
 */
export interface LodgingBusinessSchema {
  '@type': 'LodgingBusiness';
  name: string;
  url: string;
  image?: string | string[];
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  priceRange?: string;
  amenityFeature?: Array<{
    name: string;
    value: boolean | string;
  }>;
}

/**
 * Schema genérico para páginas internas.
 */
export interface WebPageSchema {
  '@type': 'WebPage';
  name: string;
  url: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
}

/**
 * Schema para páginas de preguntas frecuentes.
 * Google puede mostrar las FAQ directamente en los resultados.
 */
export interface FAQPageSchema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

/**
 * Schema para la página de contacto.
 */
export interface ContactPageSchema {
  '@type': 'ContactPage';
  name: string;
  url: string;
  description?: string;
}

/**
 * Schema de migas de pan. Google las muestra en los resultados como
 * "Inicio > Nosotros > El Lugar".
 */
export interface BreadcrumbListSchema {
  '@type': 'BreadcrumbList';
  items: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Unión discriminada de todos los schemas soportados.
 * El campo `@type` discrimina cuál es y TypeScript guía el resto.
 */
export type SchemaConfig =
  | OrganizationSchema
  | LodgingBusinessSchema
  | WebPageSchema
  | FAQPageSchema
  | ContactPageSchema
  | BreadcrumbListSchema;

// ============================================================
// SEO PROPS (objeto único pasado al BaseLayout)
// ============================================================

/**
 * Props de SEO que cada página declara y pasa al BaseLayout.
 *
 * - title y description son OBLIGATORIOS (TypeScript no compila si faltan).
 * - El resto es opcional con defaults sensatos en seo-defaults.ts.
 */
export interface SEOProps {
  /** Título de la página. Aparece en pestaña, Google y previews. */
  title: string;

  /** Descripción de la página. Aparece debajo del título en Google. */
  description: string;

  /** URL canónica. Si se omite, se calcula desde Astro.url. */
  canonical?: string;

  /** Imagen Open Graph (1200x630, JPG). Default: og-home.jpg. */
  ogImage?: string;

  /** Tipo de Open Graph. Default: 'website'. */
  ogType?: 'website' | 'article';

  /** Si true, agrega <meta name="robots" content="noindex">. Default: false. */
  noindex?: boolean;

  /** Keywords (Google las ignora pero algunos buscadores menores las usan). */
  keywords?: string[];

  /** Schemas JSON-LD a renderizar en la página. */
  schemas?: SchemaConfig[];
}
