"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
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
import { ServiceDetailModal } from "./service-detail-modal";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Gift, Presentation, Calendar, LayoutTemplate, Palette, Stamp,
  Megaphone, ShoppingBag, Trophy, Briefcase, Printer, PenTool,
  ImageIcon, Star, Award, Package, Tag, Heart, Sparkles, Lightbulb,
  Target, Layers, Box, Truck, Shirt, Crown, Gem, Zap,
};

const COLOR_MAP: Record<string, string> = {
  Gift: "bg-blue-500/10 text-blue-600",
  Presentation: "bg-green-500/10 text-green-600",
  Megaphone: "bg-green-500/10 text-green-600",
  Calendar: "bg-purple-500/10 text-purple-600",
  LayoutTemplate: "bg-orange-500/10 text-orange-600",
  Palette: "bg-red-500/10 text-red-600",
  Stamp: "bg-teal-500/10 text-teal-600",
  ShoppingBag: "bg-pink-500/10 text-pink-600",
  Trophy: "bg-amber-500/10 text-amber-600",
  Briefcase: "bg-slate-500/10 text-slate-600",
  Printer: "bg-gray-500/10 text-gray-600",
  PenTool: "bg-indigo-500/10 text-indigo-600",
  ImageIcon: "bg-cyan-500/10 text-cyan-600",
  Star: "bg-yellow-500/10 text-yellow-600",
  Award: "bg-amber-500/10 text-amber-600",
  Package: "bg-brown-500/10 text-orange-700",
  Tag: "bg-lime-500/10 text-lime-600",
  Heart: "bg-rose-500/10 text-rose-600",
  Sparkles: "bg-violet-500/10 text-violet-600",
  Lightbulb: "bg-yellow-500/10 text-yellow-600",
  Target: "bg-red-500/10 text-red-600",
  Layers: "bg-blue-500/10 text-blue-600",
  Box: "bg-orange-500/10 text-orange-600",
  Truck: "bg-emerald-500/10 text-emerald-600",
  Shirt: "bg-sky-500/10 text-sky-600",
  Crown: "bg-amber-500/10 text-amber-600",
  Gem: "bg-purple-500/10 text-purple-600",
  Zap: "bg-yellow-500/10 text-yellow-600",
};

const FALLBACK_IMAGES: Record<string, string> = {
  "Corporate Gifts": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1440&auto=format&fit=crop",
  "Promotional Materials": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
  "Events Giveaways": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1470&auto=format&fit=crop",
  "Booths, Pop-ups & Roll-ups": "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1470&auto=format&fit=crop",
  "Advertising designs, prints & Vip business gifts": "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1400&auto=format&fit=crop",
  "Personalized Logo Printing": "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1471&auto=format&fit=crop",
};

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  images: string[];
  thumbnail?: string | null;
  layout?: unknown[] | null;
}

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const [selected, setSelected] = useState<(ServiceItem & { resolvedImage: string }) | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComp = ICON_MAP[service.icon] || Gift;
          const color = COLOR_MAP[service.icon] || "bg-blue-500/10 text-blue-600";
          const image = service.thumbnail || service.images[0] || FALLBACK_IMAGES[service.title] || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1440&auto=format&fit=crop";

          return (
            <div
              key={service.id || index}
              className="group relative rounded-[2.5rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-[500px]"
            >
              {/* Image Section (Top Half) - clickable to open popup */}
              <div
                className="relative h-1/2 w-full overflow-hidden cursor-pointer"
                onClick={() => setSelected({ ...service, resolvedImage: image })}
              >
                <Image
                  src={image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Floating Icon */}
                <div className={`absolute -bottom-6 right-8 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md bg-white/90 z-10 ${color} group-hover:-translate-y-2 transition-transform duration-300`}>
                  <IconComp size={24} />
                </div>
              </div>

              {/* Content Section (Bottom Half) */}
              <div className="relative h-1/2 p-8 flex flex-col bg-white">
                <h3 className="text-2xl font-bold text-brand-primary mb-3 tracking-tight group-hover:text-[#00A3FF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-neutral/70 leading-relaxed text-sm mb-auto line-clamp-3">
                  {service.description}
                </p>

                {/* Subtle decorative line */}
                <div className="w-full h-px bg-brand-neutral/10 my-4" />

                <Link href="/contact" className="inline-flex items-center justify-between w-full text-sm font-bold text-brand-primary group/btn mt-auto">
                  <span>Contact us</span>
                  <div className="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover/btn:bg-brand-primary group-hover/btn:text-white transition-colors">
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service detail modal */}
      <ServiceDetailModal
        service={selected ? {
          id: selected.id || "",
          title: selected.title,
          description: selected.description,
          icon: selected.icon,
          images: selected.images.length > 0 ? selected.images : [selected.resolvedImage],
          thumbnail: selected.thumbnail || null,
          layout: selected.layout,
        } : null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
