/**
 * Scroll-reveal global para todo el sitio.
 *
 * Detecta elementos con class="reveal" y les agrega class="visible"
 * cuando entran al viewport. Las clases CSS correspondientes están
 * definidas en src/styles/global.css (animaciones .reveal y .visible).
 *
 * Soporta también las clases stagger-1 a stagger-6 para escalonar
 * la aparición de elementos relacionados.
 *
 * Se ejecuta una sola vez en todo el sitio, cargado desde BaseLayout.
 */

const REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-right';
const VISIBLE_CLASS = 'visible';

function initScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
