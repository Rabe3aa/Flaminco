"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroContent {
  badge?: string;
  heading?: string;
  subtitle?: string;
  cta1?: string;
  cta2?: string;
  image?: string;
  reviewTitle?: string;
  clientCount?: string;
  clientScore?: string;
  clientLabel?: string;
}

const DEFAULTS: HeroContent = {
  badge: "Advertising Agency",
  heading: "Grow Your Business With Data-Driven Marketing.",
  subtitle: "We craft modern digital experiences, driving ROI through high-performance SEO, targeted campaigns, and elite creative design.",
  cta1: "Start Your Campaign",
  cta2: "View Our Work",
  image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop",
  reviewTitle: "Creating Impactful Digital Experiences",
  clientCount: "150",
  clientScore: "9.6",
  clientLabel: "150+ Clients",
};

export function Hero({ content = {} }: { content?: HeroContent }) {
  const c = { ...DEFAULTS, ...Object.fromEntries(Object.entries(content).filter(([, v]) => v)) };

  return (
    <section className="relative pt-32 pb-20 overflow-visible">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content (Spans 5 columns) */}
          <div className="lg:col-span-5 max-w-2xl relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-8 border-brand-primary/30 text-brand-primary bg-brand-bg/50 backdrop-blur-md px-4 py-1.5 shadow-sm rounded-full tracking-wide uppercase text-[10px] font-bold">
                {c.badge}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-primary leading-[1.05] mb-6 tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {c.heading}
            </motion.h1>

            <motion.p
              className="text-brand-neutral/80 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {c.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="inline-flex rounded-full pl-8 pr-2 py-2 h-auto bg-brand-primary hover:bg-brand-primary/90 text-brand-bg font-bold shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:scale-105 transition-all group border border-brand-primary/20 items-center justify-between min-w-[200px]"
              >
                <span className="mr-4">{c.cta1}</span>
                <div className="bg-brand-bg text-brand-primary w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                  <ArrowRight size={18} />
                </div>
              </Link>
              <Link
                href="/projects"
                className="inline-flex rounded-full pl-8 pr-2 py-2 h-auto bg-white/40 backdrop-blur-md border border-brand-neutral/20 text-brand-primary hover:bg-white/60 font-bold transition-all group items-center justify-between min-w-[200px]"
              >
                <span className="mr-4">{c.cta2}</span>
                <div className="bg-brand-primary text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Modern Image & Glass Card (Spans 7 columns) */}
          <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] w-full">

            {/* Main Image Layer */}
            <motion.div
              className="absolute right-0 top-10 w-[85%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-neutral/10 z-0"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay z-10" />
              <Image
                src={c.image!}
                alt="Digital Marketing Professional"
                fill
                className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                priority
              />
            </motion.div>

            {/* Glass Floating Review Card - Enlarged */}
            <motion.div
              className="absolute left-0 lg:-left-[5%] top-[20%] z-30 w-80 md:w-96"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            >
              <div className="p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/40 bg-white/70 backdrop-blur-xl relative overflow-hidden">
                {/* Glossy shine effect inside card */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

                <h3 className="font-bold text-brand-primary mb-4 leading-tight text-base md:text-lg relative z-10">
                  {c.reviewTitle}
                </h3>
                <div className="flex gap-1.5 mb-5 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < 4 ? "fill-[#FFB800] text-[#FFB800]" : "fill-brand-neutral/20 text-brand-neutral/20"}
                    />
                  ))}
                </div>
                <div className="flex items-end gap-3 mb-6 relative z-10">
                  <span className="text-6xl md:text-7xl font-black text-brand-primary tracking-tighter leading-none">{c.clientScore}</span>
                  <p className="text-xs text-brand-neutral font-medium uppercase tracking-widest mb-1">
                    Client Score
                  </p>
                </div>
                <div className="flex items-center gap-4 relative z-10 pt-5 border-t border-brand-neutral/10">
                  <div className="flex -space-x-3">
                    {[
                      "https://i.pravatar.cc/100?img=4",
                      "https://i.pravatar.cc/100?img=5",
                      "https://i.pravatar.cc/100?img=6",
                    ].map((src, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                        <Image src={src} alt={`Avatar ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-brand-primary">{c.clientLabel}</span>
                    <span className="text-xs text-brand-neutral">Worldwide</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
