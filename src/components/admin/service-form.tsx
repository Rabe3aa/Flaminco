"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import {
  Save,
  Loader2,
  CheckCircle2,
  Gift,
  Presentation,
  Calendar,
  LayoutTemplate,
  Palette,
  Stamp,
  Megaphone,
  ShoppingBag,
  Trophy,
  Briefcase,
  Printer,
  PenTool,
  Image as ImageIcon,
  Star,
  Award,
  Package,
  Tag,
  Heart,
  Sparkles,
  Lightbulb,
  Target,
  Layers,
  Box,
  Truck,
  Shirt,
  Crown,
  Gem,
  Zap,
} from "lucide-react";
import { ImageUploader } from "./image-uploader";

const ICON_OPTIONS = [
  { value: "Gift", label: "Gift", Icon: Gift },
  { value: "Presentation", label: "Presentation", Icon: Presentation },
  { value: "Calendar", label: "Calendar / Events", Icon: Calendar },
  { value: "LayoutTemplate", label: "Layout / Booths", Icon: LayoutTemplate },
  { value: "Palette", label: "Palette / Design", Icon: Palette },
  { value: "Stamp", label: "Stamp / Printing", Icon: Stamp },
  { value: "Megaphone", label: "Megaphone / Marketing", Icon: Megaphone },
  { value: "ShoppingBag", label: "Shopping Bag", Icon: ShoppingBag },
  { value: "Trophy", label: "Trophy / Awards", Icon: Trophy },
  { value: "Briefcase", label: "Briefcase / Business", Icon: Briefcase },
  { value: "Printer", label: "Printer", Icon: Printer },
  { value: "PenTool", label: "Pen Tool / Creative", Icon: PenTool },
  { value: "ImageIcon", label: "Image / Photo", Icon: ImageIcon },
  { value: "Star", label: "Star / Premium", Icon: Star },
  { value: "Award", label: "Award / Recognition", Icon: Award },
  { value: "Package", label: "Package / Shipping", Icon: Package },
  { value: "Tag", label: "Tag / Pricing", Icon: Tag },
  { value: "Heart", label: "Heart / Favorite", Icon: Heart },
  { value: "Sparkles", label: "Sparkles / Special", Icon: Sparkles },
  { value: "Lightbulb", label: "Lightbulb / Ideas", Icon: Lightbulb },
  { value: "Target", label: "Target / Goals", Icon: Target },
  { value: "Layers", label: "Layers / Multi-service", Icon: Layers },
  { value: "Box", label: "Box / Packaging", Icon: Box },
  { value: "Truck", label: "Truck / Delivery", Icon: Truck },
  { value: "Shirt", label: "Shirt / Apparel", Icon: Shirt },
  { value: "Crown", label: "Crown / VIP", Icon: Crown },
  { value: "Gem", label: "Gem / Luxury", Icon: Gem },
  { value: "Zap", label: "Zap / Fast", Icon: Zap },
];

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  images: string;
  thumbnail: string;
  order: number;
  published: boolean;
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-[#0072BB] hover:bg-[#005a94] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Save className="w-5 h-5" />
      )}
      {pending ? "Saving..." : "Save Service"}
    </button>
  );
}

export function ServiceForm({
  initialData,
  action,
}: {
  initialData?: ServiceFormData;
  action: (formData: FormData) => Promise<void>;
}) {
  const defaults: ServiceFormData = initialData || {
    title: "",
    description: "",
    icon: "",
    images: "",
    thumbnail: "",
    order: 0,
    published: true,
  };

  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    defaults.images ? defaults.images.split("\n").filter(Boolean) : []
  );
  const [selectedIcon, setSelectedIcon] = useState(defaults.icon || "Gift");
  const [thumbnail, setThumbnail] = useState<string>(defaults.thumbnail || "");

  // Auto-select first gallery image as thumbnail if none is set
  useEffect(() => {
    if (!thumbnail && galleryUrls.length > 0) {
      setThumbnail(galleryUrls[0]);
    }
  }, [galleryUrls, thumbnail]);

  return (
    <form
      action={async (formData) => {
        formData.set("images", galleryUrls.join("\n"));
        formData.set("thumbnail", thumbnail);
        await action(formData);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Service Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <input
                name="title"
                defaultValue={defaults.title}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                placeholder="Service title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                defaultValue={defaults.description}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all resize-none"
                placeholder="Service description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                    {(() => {
                      const match = ICON_OPTIONS.find((o) => o.value === selectedIcon);
                      if (match) {
                        const Ic = match.Icon;
                        return <Ic size={22} className="text-[#0072BB]" />;
                      }
                      return <Gift size={22} className="text-gray-500" />;
                    })()}
                  </div>
                  <select
                    name="icon"
                    value={selectedIcon}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#111] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={defaults.order}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                />
              </div>
            </div>

            <div>
              <ImageUploader
                label="Gallery Images"
                value={galleryUrls}
                onChange={(urls) => {
                  setGalleryUrls(urls);
                  // If current thumbnail is removed, reset to first remaining
                  if (thumbnail && !urls.includes(thumbnail)) {
                    setThumbnail(urls[0] || "");
                  }
                }}
                multiple={true}
              />
            </div>

            {/* Thumbnail / Card Image picker */}
            {galleryUrls.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Card Image <span className="text-gray-500 font-normal">(shown on the service card)</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {galleryUrls.map((url) => {
                    const isSelected = thumbnail === url;
                    return (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setThumbnail(url)}
                        className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                          isSelected
                            ? "border-[#0072BB] ring-2 ring-[#0072BB]/40"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#0072BB]/20 flex items-center justify-center">
                            <CheckCircle2 className="text-white drop-shadow" size={22} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* hidden input so it's always submitted */}
                <input type="hidden" name="thumbnail" value={thumbnail} />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Publish</h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                name="published"
                type="checkbox"
                defaultChecked={defaults.published}
                className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#0072BB] focus:ring-[#0072BB]"
              />
              <span className="text-gray-300 text-sm">Published</span>
            </label>
          </div>

          <SaveButton />
        </div>
      </div>
    </form>
  );
}
