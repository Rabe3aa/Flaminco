import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  // Await the params before accessing its properties.
  // Next.js 15+ recommends treating `params` and `searchParams` as Promises in dynamic routes.
  const { slug } = await params;
  
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      {/* Top Navigation */}
      <div className="container mx-auto px-4 md:px-8 pt-8 relative z-10">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:bg-brand-primary/10 px-4 py-2 rounded-full transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
              {project.category}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.9]">
              {project.title}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-12 mt-12 pt-12 border-t border-brand-neutral/10">
            <div className="flex-1">
               <h3 className="text-sm font-bold text-brand-neutral uppercase tracking-widest mb-4">Client</h3>
               <p className="text-xl font-medium text-brand-primary">{project.client}</p>
            </div>
            <div className="flex-1">
               <h3 className="text-sm font-bold text-brand-neutral uppercase tracking-widest mb-4">Year</h3>
               <p className="text-xl font-medium text-brand-primary">{project.year}</p>
            </div>
            <div className="flex-[2]">
               <h3 className="text-sm font-bold text-brand-neutral uppercase tracking-widest mb-4">Services</h3>
               <div className="flex flex-wrap gap-2">
                 {project.services.map((service) => (
                   <span key={service} className="px-3 py-1 rounded-full border border-brand-primary/20 text-brand-primary text-sm font-medium">
                     {service}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-12 relative z-10">
         <div className="container mx-auto px-4 md:px-8">
            <div className="w-full h-[60vh] md:h-[80vh] relative rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
         </div>
      </section>

      {/* Overview & Content */}
      <section className="py-20 relative z-10 bg-white border-y border-brand-neutral/10">
        <div className="container mx-auto px-4 md:px-8">
           <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-brand-primary mb-6 tracking-tight">
                Project Overview
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-brand-neutral/90 mb-12">
                {project.fullDescription}
              </p>

              <div className="bg-brand-bg rounded-[2.5rem] p-8 md:p-12 border border-brand-neutral/10">
                <h3 className="text-2xl font-bold text-brand-primary mb-6 tracking-tight">Key Deliverables</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.services.map((service, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-neutral">
                      <CheckCircle2 size={20} className="text-[#0072BB] shrink-0" />
                      <span className="font-medium">{service}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 text-brand-neutral">
                      <CheckCircle2 size={20} className="text-[#0072BB] shrink-0" />
                      <span className="font-medium">Performance Tracking</span>
                  </li>
                  <li className="flex items-center gap-3 text-brand-neutral">
                      <CheckCircle2 size={20} className="text-[#0072BB] shrink-0" />
                      <span className="font-medium">Strategic Roadmap</span>
                  </li>
                </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-black text-brand-primary mb-12 tracking-tight text-center">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {project.gallery.map((img, index) => (
               <div key={index} className={`relative w-full rounded-[2.5rem] overflow-hidden shadow-lg aspect-square ${index === 0 && project.gallery.length % 2 !== 0 ? 'md:col-span-2 aspect-[21/9]' : ''}`}>
                 <Image 
                   src={img} 
                   alt={`${project.title} gallery image ${index + 1}`}
                   fill
                   className="object-cover hover:scale-105 transition-transform duration-700"
                 />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="pb-32 pt-12 relative z-10">
        <div className="container mx-auto px-4 md:px-8 text-center">
           <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-8">
             Have a similar project?
           </h2>
           <Link 
             href="/contact"
             className="inline-flex items-center justify-center rounded-full pl-8 pr-2 py-2 h-auto bg-brand-primary hover:bg-[#0065A6] text-white font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group gap-4 text-lg"
           >
             <span>Let&apos;s talk</span>
             <div className="bg-white text-brand-primary w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-brand-bg transition-colors">
               <ArrowLeft size={20} className="rotate-135 group-hover:rotate-180 transition-transform duration-300" />
             </div>
           </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
