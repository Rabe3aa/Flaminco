"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers, Star, FolderOpen } from "lucide-react";

type ProjectDisplay = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  featured: boolean;
  colSpan?: string;
  client: string;
  year: string;
  services: string[];
};

export function ProjectsClient({
  projects,
  categories,
}: {
  projects: ProjectDisplay[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />

      {/* ── Hero ── */}
      <section className="pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
                <Layers size={14} />
                Our Portfolio
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter mb-6 leading-[0.95]">
                Crafted with precision,<br />
                <span className="text-brand-neutral/30">delivered with impact.</span>
              </h1>
              <p className="text-lg text-brand-neutral/70 font-light max-w-xl leading-relaxed">
                Explore our work — from premium corporate gifts and exhibition booths to branded merchandise and advertising design.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 lg:gap-12 shrink-0">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-brand-primary tracking-tight">{projects.length}</p>
                <p className="text-xs font-bold text-brand-neutral/50 uppercase tracking-widest mt-1">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-brand-primary tracking-tight">{categories.length - 1}</p>
                <p className="text-xs font-bold text-brand-neutral/50 uppercase tracking-widest mt-1">Categories</p>
              </div>
            </div>
          </div>

          {/* ── Filter Bar ── */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                    ${isActive
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]"
                      : "bg-white text-brand-neutral/70 hover:text-brand-primary hover:bg-white border border-brand-neutral/10 hover:border-brand-primary/20 hover:shadow-md"
                    }
                  `}
                >
                  <span>{cat}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-brand-neutral/5"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Showcase ── */}
      {featured.length > 0 && (
        <section className="py-8 relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className={`grid gap-6 ${
              featured.length === 1
                ? "grid-cols-1"
                : featured.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}>
              {featured.map((project, i) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.id}
                  className={`
                    group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10
                    transition-all duration-500 hover:-translate-y-1
                    ${featured.length >= 3 && i === 0 ? "md:col-span-2 md:row-span-2" : ""}
                  `}
                >
                  <div className={`relative w-full ${featured.length >= 3 && i === 0 ? "h-[500px] md:h-full md:min-h-[520px]" : "h-[340px]"}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Featured badge */}
                    <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                      <Star size={12} className="fill-current" />
                      Featured
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                      <div className="flex items-end justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                            {project.category}
                          </p>
                          <h3 className={`font-bold text-white tracking-tight leading-tight ${
                            featured.length >= 3 && i === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                          }`}>
                            {project.title}
                          </h3>
                          {project.client && (
                            <p className="text-white/50 text-sm mt-2 font-medium">
                              {project.client}{project.year ? ` · ${project.year}` : ""}
                            </p>
                          )}
                        </div>
                        <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-brand-primary transition-all duration-300 shrink-0 group-hover:scale-110">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Projects Grid ── */}
      <section className="py-12 pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          {featured.length > 0 && regular.length > 0 && (
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-brand-neutral/10" />
              <span className="text-xs font-bold text-brand-neutral/40 uppercase tracking-[0.2em]">All Projects</span>
              <div className="h-px flex-1 bg-brand-neutral/10" />
            </div>
          )}

          {regular.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
              {regular.map((project) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.id}
                  className="group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-brand-neutral/5 ring-1 ring-brand-neutral/5 group-hover:ring-brand-primary/20 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-brand-primary/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/60 transition-all duration-500 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white text-brand-primary flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-lg">
                        <ArrowUpRight size={22} />
                      </div>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-bold text-brand-primary/80 uppercase tracking-[0.15em] px-2.5 py-1 rounded-md bg-brand-primary/5">
                      {project.category}
                    </span>
                    {project.year && (
                      <span className="text-[11px] font-medium text-brand-neutral/40">{project.year}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-brand-primary mb-2 tracking-tight group-hover:text-[#005a94] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-neutral/60 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Service tags */}
                  {project.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.services.slice(0, 3).map((svc) => (
                        <span
                          key={svc}
                          className="text-[10px] font-semibold text-brand-neutral/50 px-2 py-0.5 rounded-full border border-brand-neutral/10 bg-white"
                        >
                          {svc}
                        </span>
                      ))}
                      {project.services.length > 3 && (
                        <span className="text-[10px] font-semibold text-brand-neutral/40 px-2 py-0.5">
                          +{project.services.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-brand-neutral/10 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-8 h-8 text-brand-primary/40" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">No projects found</h3>
              <p className="text-brand-neutral/50 mb-6 text-sm">
                There are no projects in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="px-6 py-2.5 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-[#005a94] transition-all shadow-md"
              >
                View all projects
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-brand-primary rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                Have a project in mind?
              </h2>
              <p className="text-white/70 text-lg mb-10 font-light">
                Let&apos;s bring your vision to life with our expertise.
              </p>
              <Link
                href="/contact"
                className="inline-flex rounded-full pl-8 pr-2 py-2 h-auto bg-white hover:bg-brand-bg text-brand-primary font-bold shadow-xl hover:scale-105 transition-all group items-center gap-4"
              >
                <span>Start a conversation</span>
                <div className="bg-brand-primary text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
                  <ArrowUpRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
