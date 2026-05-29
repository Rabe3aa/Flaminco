"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface GalleryCarouselProps {
  images: string[];
  title: string;
}

export function GalleryCarousel({ images, title }: GalleryCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-loop
  useEffect(() => {
    if (paused || total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, total]);

  // Keyboard navigation — lightbox-aware
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox !== null) { setLightbox(null); return; }
      if (e.key === "ArrowLeft") lightbox !== null ? setLightbox((i) => ((i! - 1 + total) % total)) : prev();
      if (e.key === "ArrowRight") lightbox !== null ? setLightbox((i) => ((i! + 1) % total)) : next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, lightbox, total]);

  if (total === 0) return null;

  return (
    <>
    <div
      className="relative group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main image */}
      <div
        className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden bg-brand-neutral/5 shadow-lg cursor-zoom-in"
        onClick={() => setLightbox(current)}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`${title} — image ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20 pointer-events-none" />
        {/* Zoom hint */}
        <div className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn size={16} />
        </div>
      </div>

      {/* Left arrow */}
      {total > 1 && (
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg flex items-center justify-center text-brand-primary hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Right arrow */}
      {total > 1 && (
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg flex items-center justify-center text-brand-primary hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dots / counter */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
          {total <= 20 ? (
            images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-white shadow-md"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))
          ) : (
            <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
              {current + 1} / {total}
            </div>
          )}
        </div>
      )}

      {/* Thumbnail strip for many images */}
      {total > 4 && (
        <div className="mt-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2" style={{ minWidth: "max-content" }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === current
                    ? "border-brand-primary ring-2 ring-brand-primary/30 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

      {/* Fullscreen lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          style={{ animation: "fadeIn 0.2s ease forwards" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          {total > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-medium z-10">
              {lightbox + 1} / {total}
            </div>
          )}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto px-16 flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox]}
              alt={`${title} — image ${lightbox + 1}`}
              fill
              className="object-contain"
              unoptimized={images[lightbox].startsWith("/")}
            />
          </div>
          {total > 1 && (
            <>
              <button
                className="absolute left-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i! - 1 + total) % total)); }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i! + 1) % total)); }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
