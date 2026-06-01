"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { Block, HeadingBlock, TextBlock, ImageBlock, GalleryBlock, SpacerBlock, BannerBlock, TwoColumnsBlock, QuoteBlock } from "@/lib/page-builder/types";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-0">
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  const total = images.length;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      {total > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-medium z-10">
          {current + 1} / {total}
        </div>
      )}
      <div
        className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto px-4 md:px-16 flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`Image ${current + 1}`}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      {total > 1 && (
        <>
          <button
            className="absolute left-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + total) % total); }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="absolute right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % total); }}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return <RenderHeading block={block} />;
    case "text":
      return <RenderText block={block} />;
    case "image":
      return <RenderImage block={block} />;
    case "gallery":
      return <RenderGallery block={block} />;
    case "spacer":
      return <RenderSpacer block={block} />;
    case "banner":
      return <RenderBanner block={block} />;
    case "two-columns":
      return <RenderTwoColumns block={block} />;
    case "quote":
      return <RenderQuote block={block} />;
    default:
      return null;
  }
}

function RenderHeading({ block }: { block: HeadingBlock }) {
  const alignClass =
    block.data.alignment === "center"
      ? "text-center"
      : block.data.alignment === "right"
        ? "text-right"
        : "text-left";

  const sizeClass =
    block.data.level === "h1"
      ? "text-4xl md:text-5xl lg:text-6xl font-black"
      : block.data.level === "h2"
        ? "text-3xl md:text-4xl font-bold"
        : "text-2xl md:text-3xl font-semibold";

  const Tag = block.data.level;

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      <Tag className={`${sizeClass} ${alignClass} text-brand-primary tracking-tight`}>
        {block.data.text}
      </Tag>
    </div>
  );
}

function RenderText({ block }: { block: TextBlock }) {
  const alignClass =
    block.data.alignment === "center"
      ? "text-center"
      : block.data.alignment === "right"
        ? "text-right"
        : "text-left";

  return (
    <div className="container mx-auto px-4 md:px-8 py-4">
      <div className={`max-w-4xl ${block.data.alignment === "center" ? "mx-auto" : ""}`}>
        <p className={`text-base md:text-lg leading-relaxed text-brand-neutral/80 whitespace-pre-line ${alignClass}`}>
          {block.data.content}
        </p>
      </div>
    </div>
  );
}

function RenderImage({ block }: { block: ImageBlock }) {
  const [open, setOpen] = useState(false);

  if (!block.data.src) return null;

  return (
    <>
      <div className={`${block.data.fullWidth ? "" : "container mx-auto px-4 md:px-8"} py-6`}>
        <div
          className={`relative w-full overflow-hidden shadow-lg cursor-zoom-in group ${
            block.data.fullWidth ? "aspect-[21/9] md:aspect-[2.4/1]" : "aspect-[16/9] max-w-5xl mx-auto"
          } ${block.data.rounded ? "rounded-2xl md:rounded-[2rem]" : ""}`}
          onClick={() => setOpen(true)}
        >
          <Image
            src={block.data.src}
            alt={block.data.alt || ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} />
          </div>
        </div>
        {block.data.caption && (
          <p className="text-center text-sm text-brand-neutral/50 mt-3 italic">
            {block.data.caption}
          </p>
        )}
      </div>
      {open && <Lightbox images={[block.data.src]} index={0} onClose={() => setOpen(false)} />}
    </>
  );
}

function RenderGallery({ block }: { block: GalleryBlock }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (block.data.images.length === 0) return null;

  const colsClass =
    block.data.columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : block.data.columns === 4
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const srcs = block.data.images.map((img) => img.src);

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className={`grid gap-4 md:gap-6 ${colsClass}`}>
          {block.data.images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group cursor-zoom-in"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt || `Image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox !== null && (
        <Lightbox images={srcs} index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

function RenderSpacer({ block }: { block: SpacerBlock }) {
  const heightClass =
    block.data.height === "sm"
      ? "h-4"
      : block.data.height === "md"
        ? "h-8"
        : block.data.height === "lg"
          ? "h-16"
          : "h-24";

  return <div className={heightClass} />;
}

function RenderBanner({ block }: { block: BannerBlock }) {
  const paddingClass =
    block.data.padding === "sm"
      ? "py-8 px-6"
      : block.data.padding === "lg"
        ? "py-20 px-12"
        : "py-12 px-8";

  return (
    <div className="py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`rounded-[2rem] ${paddingClass} text-center`}
          style={{ backgroundColor: block.data.backgroundColor, color: block.data.textColor }}
        >
          <p className="text-xl md:text-2xl font-bold whitespace-pre-line leading-relaxed max-w-3xl mx-auto">
            {block.data.text}
          </p>
        </div>
      </div>
    </div>
  );
}

function RenderTwoColumns({ block }: { block: TwoColumnsBlock }) {
  const splitClass =
    block.data.split === "60-40"
      ? "lg:grid-cols-[3fr_2fr]"
      : block.data.split === "40-60"
        ? "lg:grid-cols-[2fr_3fr]"
        : "lg:grid-cols-2";

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className={`grid grid-cols-1 gap-8 ${splitClass}`}>
        <RenderColumn column={block.data.left} />
        <RenderColumn column={block.data.right} />
      </div>
    </div>
  );
}

function RenderColumn({ column }: { column: { type: "text" | "image"; content: string } }) {
  const [open, setOpen] = useState(false);

  if (column.type === "image" && column.content) {
    return (
      <>
        <div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md cursor-zoom-in group"
          onClick={() => setOpen(true)}
        >
          <Image src={column.content} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} />
          </div>
        </div>
        {open && <Lightbox images={[column.content]} index={0} onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <div className="flex items-center">
      <p className="text-base md:text-lg leading-relaxed text-brand-neutral/80 whitespace-pre-line">
        {column.content}
      </p>
    </div>
  );
}

function RenderQuote({ block }: { block: QuoteBlock }) {
  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <blockquote className="max-w-3xl mx-auto text-center">
        <div className="relative">
          <span className="absolute -top-6 -left-2 text-6xl text-brand-primary/20 font-serif">&ldquo;</span>
          <p className="text-xl md:text-2xl italic text-brand-neutral/80 leading-relaxed pl-6">
            {block.data.text}
          </p>
        </div>
        {block.data.author && (
          <footer className="mt-4 text-sm font-semibold text-brand-primary">
            — {block.data.author}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
