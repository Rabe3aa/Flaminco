"use client";

import { useState } from "react";
import type { Block, ImageBlock, TextBlock, HeadingBlock, GalleryBlock, SpacerBlock, BannerBlock, TwoColumnsBlock, QuoteBlock } from "@/lib/page-builder/types";
import { ImageUploader } from "../image-uploader";

interface BlockEditorProps {
  block: Block;
  onChange: (updated: Block) => void;
}

export function BlockEditor({ block, onChange }: BlockEditorProps) {
  switch (block.type) {
    case "heading":
      return <HeadingEditor block={block} onChange={onChange} />;
    case "text":
      return <TextEditor block={block} onChange={onChange} />;
    case "image":
      return <ImageEditor block={block} onChange={onChange} />;
    case "gallery":
      return <GalleryEditor block={block} onChange={onChange} />;
    case "spacer":
      return <SpacerEditor block={block} onChange={onChange} />;
    case "banner":
      return <BannerEditor block={block} onChange={onChange} />;
    case "two-columns":
      return <TwoColumnsEditor block={block} onChange={onChange} />;
    case "quote":
      return <QuoteEditor block={block} onChange={onChange} />;
    default:
      return <div className="text-gray-400 text-sm">Unknown block type</div>;
  }
}

function HeadingEditor({ block, onChange }: { block: HeadingBlock; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-3">
      <input
        value={block.data.text}
        onChange={(e) => onChange({ ...block, data: { ...block.data, text: e.target.value } })}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        placeholder="Heading text"
      />
      <div className="flex gap-2">
        <select
          value={block.data.level}
          onChange={(e) => onChange({ ...block, data: { ...block.data, level: e.target.value as "h1" | "h2" | "h3" } })}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        >
          <option value="h1" className="bg-[#111]">H1 — Large</option>
          <option value="h2" className="bg-[#111]">H2 — Medium</option>
          <option value="h3" className="bg-[#111]">H3 — Small</option>
        </select>
        <select
          value={block.data.alignment}
          onChange={(e) => onChange({ ...block, data: { ...block.data, alignment: e.target.value as "left" | "center" | "right" } })}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        >
          <option value="left" className="bg-[#111]">Left</option>
          <option value="center" className="bg-[#111]">Center</option>
          <option value="right" className="bg-[#111]">Right</option>
        </select>
      </div>
    </div>
  );
}

function TextEditor({ block, onChange }: { block: TextBlock; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-3">
      <textarea
        value={block.data.content}
        onChange={(e) => onChange({ ...block, data: { ...block.data, content: e.target.value } })}
        rows={4}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BB] resize-none"
        placeholder="Enter text content..."
      />
      <select
        value={block.data.alignment}
        onChange={(e) => onChange({ ...block, data: { ...block.data, alignment: e.target.value as "left" | "center" | "right" } })}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
      >
        <option value="left" className="bg-[#111]">Left</option>
        <option value="center" className="bg-[#111]">Center</option>
        <option value="right" className="bg-[#111]">Right</option>
      </select>
    </div>
  );
}

function ImageEditor({ block, onChange }: { block: ImageBlock; onChange: (b: Block) => void }) {
  const [urls, setUrls] = useState<string[]>(block.data.src ? [block.data.src] : []);

  return (
    <div className="space-y-3">
      <ImageUploader
        label=""
        value={urls}
        onChange={(newUrls) => {
          setUrls(newUrls);
          onChange({ ...block, data: { ...block.data, src: newUrls[0] || "" } });
        }}
        multiple={false}
      />
      <input
        value={block.data.alt}
        onChange={(e) => onChange({ ...block, data: { ...block.data, alt: e.target.value } })}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        placeholder="Alt text (accessibility)"
      />
      <input
        value={block.data.caption}
        onChange={(e) => onChange({ ...block, data: { ...block.data, caption: e.target.value } })}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        placeholder="Caption (optional)"
      />
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={block.data.fullWidth}
            onChange={(e) => onChange({ ...block, data: { ...block.data, fullWidth: e.target.checked } })}
            className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#0072BB] focus:ring-[#0072BB]"
          />
          Full width
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={block.data.rounded}
            onChange={(e) => onChange({ ...block, data: { ...block.data, rounded: e.target.checked } })}
            className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#0072BB] focus:ring-[#0072BB]"
          />
          Rounded corners
        </label>
      </div>
    </div>
  );
}

function GalleryEditor({ block, onChange }: { block: GalleryBlock; onChange: (b: Block) => void }) {
  const [urls, setUrls] = useState<string[]>(block.data.images.map((i) => i.src));

  return (
    <div className="space-y-3">
      <ImageUploader
        label="Gallery Images"
        value={urls}
        onChange={(newUrls) => {
          setUrls(newUrls);
          onChange({
            ...block,
            data: { ...block.data, images: newUrls.map((src) => ({ src, alt: "" })) },
          });
        }}
        multiple={true}
      />
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Columns</label>
        <select
          value={block.data.columns}
          onChange={(e) => onChange({ ...block, data: { ...block.data, columns: parseInt(e.target.value) as 2 | 3 | 4 } })}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        >
          <option value="2" className="bg-[#111]">2 Columns</option>
          <option value="3" className="bg-[#111]">3 Columns</option>
          <option value="4" className="bg-[#111]">4 Columns</option>
        </select>
      </div>
    </div>
  );
}

function SpacerEditor({ block, onChange }: { block: SpacerBlock; onChange: (b: Block) => void }) {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">Height</label>
      <select
        value={block.data.height}
        onChange={(e) => onChange({ ...block, data: { ...block.data, height: e.target.value as "sm" | "md" | "lg" | "xl" } })}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
      >
        <option value="sm" className="bg-[#111]">Small (16px)</option>
        <option value="md" className="bg-[#111]">Medium (32px)</option>
        <option value="lg" className="bg-[#111]">Large (64px)</option>
        <option value="xl" className="bg-[#111]">Extra Large (96px)</option>
      </select>
    </div>
  );
}

function BannerEditor({ block, onChange }: { block: BannerBlock; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-3">
      <textarea
        value={block.data.text}
        onChange={(e) => onChange({ ...block, data: { ...block.data, text: e.target.value } })}
        rows={2}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BB] resize-none"
        placeholder="Banner text..."
      />
      <div className="flex gap-3 items-end flex-wrap">
        <div>
          <label className="text-xs text-gray-400 block mb-1">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.data.backgroundColor}
              onChange={(e) => onChange({ ...block, data: { ...block.data, backgroundColor: e.target.value } })}
              className="w-8 h-8 rounded border border-white/10 cursor-pointer"
            />
            <input
              value={block.data.backgroundColor}
              onChange={(e) => onChange({ ...block, data: { ...block.data, backgroundColor: e.target.value } })}
              className="w-24 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.data.textColor}
              onChange={(e) => onChange({ ...block, data: { ...block.data, textColor: e.target.value } })}
              className="w-8 h-8 rounded border border-white/10 cursor-pointer"
            />
            <input
              value={block.data.textColor}
              onChange={(e) => onChange({ ...block, data: { ...block.data, textColor: e.target.value } })}
              className="w-24 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Padding</label>
          <select
            value={block.data.padding}
            onChange={(e) => onChange({ ...block, data: { ...block.data, padding: e.target.value as "sm" | "md" | "lg" } })}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
          >
            <option value="sm" className="bg-[#111]">Small</option>
            <option value="md" className="bg-[#111]">Medium</option>
            <option value="lg" className="bg-[#111]">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function TwoColumnsEditor({ block, onChange }: { block: TwoColumnsBlock; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-gray-400 block mb-1">Split</label>
        <select
          value={block.data.split}
          onChange={(e) => onChange({ ...block, data: { ...block.data, split: e.target.value as "50-50" | "60-40" | "40-60" } })}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        >
          <option value="50-50" className="bg-[#111]">50 / 50</option>
          <option value="60-40" className="bg-[#111]">60 / 40</option>
          <option value="40-60" className="bg-[#111]">40 / 60</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ColumnEditor
          label="Left Column"
          column={block.data.left}
          onChange={(left) => onChange({ ...block, data: { ...block.data, left } })}
        />
        <ColumnEditor
          label="Right Column"
          column={block.data.right}
          onChange={(right) => onChange({ ...block, data: { ...block.data, right } })}
        />
      </div>
    </div>
  );
}

function ColumnEditor({
  label,
  column,
  onChange,
}: {
  label: string;
  column: { type: "text" | "image"; content: string };
  onChange: (col: { type: "text" | "image"; content: string }) => void;
}) {
  const [urls, setUrls] = useState<string[]>(column.type === "image" && column.content ? [column.content] : []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{label}</span>
        <select
          value={column.type}
          onChange={(e) => onChange({ type: e.target.value as "text" | "image", content: "" })}
          className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-white text-[10px] focus:outline-none"
        >
          <option value="text" className="bg-[#111]">Text</option>
          <option value="image" className="bg-[#111]">Image</option>
        </select>
      </div>
      {column.type === "text" ? (
        <textarea
          value={column.content}
          onChange={(e) => onChange({ ...column, content: e.target.value })}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB] resize-none"
          placeholder="Column text..."
        />
      ) : (
        <ImageUploader
          label=""
          value={urls}
          onChange={(newUrls) => {
            setUrls(newUrls);
            onChange({ ...column, content: newUrls[0] || "" });
          }}
          multiple={false}
        />
      )}
    </div>
  );
}

function QuoteEditor({ block, onChange }: { block: QuoteBlock; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-3">
      <textarea
        value={block.data.text}
        onChange={(e) => onChange({ ...block, data: { ...block.data, text: e.target.value } })}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BB] resize-none italic"
        placeholder="Quote text..."
      />
      <input
        value={block.data.author}
        onChange={(e) => onChange({ ...block, data: { ...block.data, author: e.target.value } })}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
        placeholder="Author name (optional)"
      />
    </div>
  );
}
