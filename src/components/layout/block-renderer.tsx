import Image from "next/image";
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
  if (!block.data.src) return null;

  return (
    <div className={`${block.data.fullWidth ? "" : "container mx-auto px-4 md:px-8"} py-6`}>
      <div
        className={`relative w-full overflow-hidden shadow-lg ${
          block.data.fullWidth ? "aspect-[21/9] md:aspect-[2.4/1]" : "aspect-[16/9] max-w-5xl mx-auto"
        } ${block.data.rounded ? "rounded-2xl md:rounded-[2rem]" : ""}`}
      >
        <Image
          src={block.data.src}
          alt={block.data.alt || ""}
          fill
          className="object-cover"
        />
      </div>
      {block.data.caption && (
        <p className="text-center text-sm text-brand-neutral/50 mt-3 italic">
          {block.data.caption}
        </p>
      )}
    </div>
  );
}

function RenderGallery({ block }: { block: GalleryBlock }) {
  if (block.data.images.length === 0) return null;

  const colsClass =
    block.data.columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : block.data.columns === 4
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className={`grid gap-4 md:gap-6 ${colsClass}`}>
        {block.data.images.map((img, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group">
            <Image
              src={img.src}
              alt={img.alt || `Image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
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
      <div
        className={`container mx-auto px-4 md:px-8`}
      >
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
  if (column.type === "image" && column.content) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
        <Image src={column.content} alt="" fill className="object-cover" />
      </div>
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
