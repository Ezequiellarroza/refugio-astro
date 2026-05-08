import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  aspect?: string;
  className?: string;
}

export default function ImageSlider({
  images,
  aspect = 'aspect-[4/3]',
  className = '',
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, images.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const prev = () =>
    setCurrentIndex((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((c) => (c + 1) % images.length);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${aspect} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Imagen ${i + 1}`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-400"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        />
      ))}

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50 transition-colors cursor-pointer"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50 transition-colors cursor-pointer"
        aria-label="Imagen siguiente"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 w-2 rounded-full transition-opacity cursor-pointer ${
              i === currentIndex
                ? 'bg-white opacity-100'
                : 'bg-white opacity-50'
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
