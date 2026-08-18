"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn, FileText, Download } from "lucide-react";
import { BlockRenderer } from "./block-renderer";
import type { Block } from "@/lib/page-builder/types";
import Image from "next/image";

interface Brochure {
  url: string;
  name: string;
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  images: string[];
  thumbnail?: string | null;
  layout?: unknown[] | null;
  brochures?: Brochure[];
}

export function ServiceDetailModal({
  service,
  onClose,
}: {
  service: ServiceData | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"details" | "content">("details");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasLayout =
    service != null &&
    Array.isArray(service.layout) &&
    service.layout.length > 0;

  // Reset tab when a new service is opened
  useEffect(() => {
    if (service) setActiveTab("details");
  }, [service]);

  const handleClose = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = "translateY(40px) scale(0.97)";
    }
    setTimeout(onClose, 250);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [service]);

  const galleryImages = service ? service.images.filter(Boolean) : [];

  // Escape key — closes lightbox first, then modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          handleClose();
        }
      }
      if (e.key === "ArrowRight" && lightboxIndex !== null && galleryImages.length > 1) {
        setLightboxIndex((i) => (i! + 1) % galleryImages.length);
      }
      if (e.key === "ArrowLeft" && lightboxIndex !== null && galleryImages.length > 1) {
        setLightboxIndex((i) => (i! - 1 + galleryImages.length) % galleryImages.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose, lightboxIndex, galleryImages.length]);

  if (!service) return null;

  const blocks = hasLayout
    ? (service.layout as unknown as Block[])
    : [];
  const heroImage =
    service.thumbnail ||
    service.images[0] ||
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1440&auto=format&fit=crop";

  return createPortal(
    <>
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ animation: "fadeIn 0.3s ease forwards" }}
      />

      {/* Modal content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        style={{ animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Hero image header */}
        <div className="relative h-56 sm:h-72 w-full shrink-0 overflow-hidden">
          <Image
            src={heroImage}
            alt={service.title}
            fill
            className="object-cover"
            unoptimized={heroImage.startsWith("/")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all z-20"
          >
            <X size={20} />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        {hasLayout && (
          <div className="flex border-b border-brand-neutral/10 shrink-0">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all relative ${
                activeTab === "details"
                  ? "text-brand-primary"
                  : "text-brand-neutral/50 hover:text-brand-neutral/70"
              }`}
            >
              Details
              {activeTab === "details" && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-brand-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all relative ${
                activeTab === "content"
                  ? "text-brand-primary"
                  : "text-brand-neutral/50 hover:text-brand-neutral/70"
              }`}
            >
              Content
              {activeTab === "content" && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-brand-primary rounded-full" />
              )}
            </button>
          </div>
        )}

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {activeTab === "content" && hasLayout ? (
            <div className="py-6">
              <BlockRenderer blocks={blocks} />
            </div>
          ) : (
            <div className="p-6 sm:p-8 space-y-6">
              {service.description && (
                <p className="text-base sm:text-lg leading-relaxed text-brand-neutral/80 whitespace-pre-line">
                  {service.description}
                </p>
              )}

              {/* Brochure downloads */}
              {service.brochures && service.brochures.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-brand-neutral/40 uppercase tracking-widest mb-3">
                    {service.brochures.length > 1 ? "Brochures & Catalogues" : "Brochure"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.brochures.map((brochure, i) => {
                      const label = brochure.name.replace(/\.pdf$/i, "");
                      return (
                        <a
                          key={`${brochure.url}-${i}`}
                          href={brochure.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-4 bg-white border border-brand-neutral/10 rounded-2xl shadow-sm hover:shadow-lg hover:border-brand-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-primary to-[#0072BB] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                            <FileText size={18} className="text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-brand-primary truncate">{label}</p>
                            <p className="text-xs text-brand-neutral/40 mt-0.5">PDF Document</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                            <Download size={14} />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Gallery images — click to open fullscreen */}
              {galleryImages.length > 0 && (
                <div className={`grid gap-4 ${
                  galleryImages.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}>
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    >
                      <Image
                        src={img}
                        alt={`${service.title} — ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={img.startsWith("/")}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" size={32} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Fullscreen image lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
          style={{ animation: "fadeIn 0.2s ease forwards" }}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
          >
            <X size={20} />
          </button>

          {/* Image counter */}
          {galleryImages.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-medium">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          )}

          {/* Main image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-auto px-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex]}
              alt={`${service.title} — ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              unoptimized={galleryImages[lightboxIndex].startsWith("/")}
            />
          </div>

          {/* Prev / Next */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i! - 1 + galleryImages.length) % galleryImages.length);
                }}
                className="absolute left-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i! + 1) % galleryImages.length);
                }}
                className="absolute right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      )}
    </>,
    document.body
  );
}
