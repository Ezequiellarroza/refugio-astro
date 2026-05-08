import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'El Lugar', to: '/el-lugar' },
  { label: 'Actividades', to: '/actividades' },
  { label: 'English Camp', to: '/english-camp' },
  { label: 'FAQ', to: '/faq' },
];

interface NavbarProps {
  pathname: string;
}

export default function Navbar({ pathname }: NavbarProps) {
  const isHome = pathname === '/';
  const [scrolledPastTop, setScrolledPastTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isScrolled = !isHome || scrolledPastTop;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolledPastTop(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-md backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/">
          <img
            src="/images/logo.png"
            alt="Refugio del Valle"
            style={
              isScrolled
                ? {
                    filter:
                      'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(500%) hue-rotate(103deg) brightness(90%)',
                  }
                : {}
            }
            className="h-16 w-auto transition-all duration-300"
          />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <a
                href={to}
                className={`text-sm font-medium transition-colors duration-300 hover:text-ambar ${
                  isScrolled ? 'text-oscuro-suave' : 'text-white/90'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="/contacto"
            className={`!flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
              isScrolled
                ? 'bg-verde-sierra text-white hover:bg-verde-bosque hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-white text-verde-sierra hover:bg-piedra-clara hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            <Phone size={16} />
            Contactanos
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer lg:hidden transition-colors duration-300 ${
            isScrolled ? 'text-verde-bosque' : 'text-white'
          }`}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-oscuro/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-piedra-clara">
          <img
            src="/images/logo.png"
            alt="Refugio del Valle"
            className="h-12 w-auto"
          />
          <button
            onClick={closeMenu}
            className="cursor-pointer text-oscuro-suave"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-4 py-6">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <a
                href={to}
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-oscuro-suave font-medium transition-colors duration-200 hover:bg-verde-sierra/10 hover:text-verde-sierra"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto px-6 pb-8">
          <a
            href="/contacto"
            onClick={closeMenu}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium cursor-pointer transition-all duration-300 bg-verde-sierra text-white hover:bg-verde-bosque hover:shadow-lg hover:-translate-y-0.5"
          >
            <Phone size={16} />
            Contactanos
          </a>
        </div>
      </div>
    </nav>
  );
}
