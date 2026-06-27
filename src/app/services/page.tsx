import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ServicesGrid } from "@/components/layout/services-grid";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export default async function ServicesPage() {
  const raw = await prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" } });
  const services = raw.map(s => ({
    id: s.id,
    title: s.title,
    description: s.description || "",
    icon: s.icon || "Gift",
    images: s.images,
    thumbnail: (s as unknown as { thumbnail?: string | null }).thumbnail || null,
    layout: s.layout as unknown[] | null,
  }));

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
            Our Expertise
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-primary tracking-tighter mb-6 leading-tight">
            Premium printing & corporate branding.
          </h1>
          <p className="text-xl text-brand-neutral/80 font-light max-w-2xl mx-auto">
            From high-end corporate gifts to striking exhibition booths, we provide end-to-end tangible branding solutions that make your business stand out.
          </p>
        </div>
      </section>

      {/* Services Visual Grid */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <ServicesGrid services={services} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-brand-primary rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                Ready to scale your business?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-10 font-light">
                Let&apos;s discuss how our tailored strategies can drive measurable growth for your brand.
              </p>
              <Link 
                href="/contact"
                className="inline-flex rounded-full pl-8 pr-2 py-2 h-auto bg-white hover:bg-brand-bg text-brand-primary font-bold shadow-xl hover:scale-105 transition-all group items-center gap-4"
              >
                <span>Start a Project</span>
                <div className="bg-brand-primary text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
                  <ArrowRight size={18} />
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
