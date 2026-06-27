import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { BlockRenderer } from "@/components/layout/block-renderer";
import { GalleryCarousel } from "@/components/layout/gallery-carousel";
import { getProjectBySlugForDisplay } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import type { Block } from "@/lib/page-builder/types";

export const revalidate = 3600;

// Pre-render every published project at build time so first visits are instant.
// Slugs created later still render on-demand (and then cache) via ISR.
export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugForDisplay(slug);

  if (!project) {
    notFound();
  }

  const hasCustomLayout =
    "layout" in project &&
    Array.isArray(project.layout) &&
    project.layout.length > 0;

  const hasGallery = project.gallery.length > 0;
  const hasDeliverables = project.services.length > 0;

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />

      {/* ── Hero Image ── */}
      <section className="relative z-10 pt-6">
        <div className="container mx-auto px-4 md:px-8">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10 px-4 py-2 rounded-full transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          {/* Main image */}
          <div className="relative w-full aspect-[21/9] md:aspect-[2.4/1] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20 mb-4">
                <Tag size={12} />
                {project.category}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.95] max-w-4xl">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Info Strip ── */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-stretch gap-4 md:gap-0 md:divide-x md:divide-brand-neutral/10 bg-white rounded-2xl shadow-sm border border-brand-neutral/5 p-1">
            {project.client && (
              <div className="flex items-center gap-3 px-6 py-4 flex-1 min-w-[180px]">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center shrink-0">
                  <User size={18} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-brand-neutral/40 uppercase tracking-widest">Client</p>
                  <p className="text-sm font-semibold text-brand-primary">{project.client}</p>
                </div>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-3 px-6 py-4 flex-1 min-w-[180px]">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-brand-neutral/40 uppercase tracking-widest">Year</p>
                  <p className="text-sm font-semibold text-brand-primary">{project.year}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 px-6 py-4 flex-1 min-w-[180px]">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center shrink-0">
                <Tag size={18} className="text-brand-primary" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-brand-neutral/40 uppercase tracking-widest">Category</p>
                <p className="text-sm font-semibold text-brand-primary">{project.category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Layout OR Default Content ── */}
      {hasCustomLayout ? (
        <section className="relative z-10 py-8">
          <BlockRenderer blocks={project.layout as Block[]} />
        </section>
      ) : (
        <>
          {/* ── Overview + Deliverables ── */}
          <section className="relative z-10 py-8 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
              <div className={`grid gap-10 ${hasDeliverables ? "lg:grid-cols-5" : "lg:grid-cols-1 max-w-4xl mx-auto"}`}>
                {/* Description */}
                <div className={hasDeliverables ? "lg:col-span-3" : ""}>
                  <h2 className="text-sm font-bold text-brand-neutral/40 uppercase tracking-[0.2em] mb-4">
                    About this project
                  </h2>
                  <div className="bg-white rounded-2xl border border-brand-neutral/5 shadow-sm p-8 md:p-10">
                    <p className="text-base md:text-lg leading-relaxed text-brand-neutral/80 whitespace-pre-line">
                      {project.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Key Deliverables */}
                {hasDeliverables && (
                  <div className="lg:col-span-2">
                    <h2 className="text-sm font-bold text-brand-neutral/40 uppercase tracking-[0.2em] mb-4">
                      Key Deliverables
                    </h2>
                    <div className="bg-white rounded-2xl border border-brand-neutral/5 shadow-sm p-8 md:p-10">
                      <ul className="space-y-4">
                        {project.services.map((service, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 size={14} className="text-brand-primary" />
                            </div>
                            <span className="text-brand-neutral/80 font-medium leading-snug">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── Gallery ── */}
          {hasGallery && (
            <section className="relative z-10 py-8 md:py-16">
              <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-brand-neutral/10" />
                  <h2 className="text-sm font-bold text-brand-neutral/40 uppercase tracking-[0.2em]">
                    Project Gallery
                  </h2>
                  <div className="h-px flex-1 bg-brand-neutral/10" />
                </div>

                <GalleryCarousel images={project.gallery} title={project.title} />
              </div>
            </section>
          )}
        </>
      )}

      {/* ── CTA Banner ── */}
      <section className="pb-24 pt-8 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-brand-primary rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-3">
                  Have a similar project in mind?
                </h2>
                <p className="text-white/60 text-lg font-light">
                  Let&apos;s bring your vision to life with our expertise.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all"
                >
                  <ArrowLeft size={16} />
                  More projects
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full pl-6 pr-2 py-2 bg-white hover:bg-brand-bg text-brand-primary font-bold shadow-xl hover:scale-105 transition-all group items-center gap-3"
                >
                  <span>Let&apos;s talk</span>
                  <div className="bg-brand-primary text-white w-9 h-9 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
