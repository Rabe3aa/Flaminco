"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, getCategories } from "@/data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = getCategories();

  const featuredProjects = projects.filter((p) => p.featured);
  
  const filteredNormalProjects = projects
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "All" || p.category === activeCategory);

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Header */}
      <section className="pt-20 pb-10 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
              Our Portfolio
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter mb-6 leading-tight">
              Work that speaks for itself.
            </h1>
            <p className="text-xl text-brand-neutral/80 font-light max-w-2xl">
              A curated selection of our finest digital experiences, campaigns, and brand transformations.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Bento Grid */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-brand-primary mb-8 border-b border-brand-neutral/10 pb-4">Featured Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            {featuredProjects.map((project) => (
              <Link 
                href={`/projects/${project.slug}`}
                key={project.id} 
                className={`${project.colSpan} group relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex justify-between items-end">
                  <div>
                    <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-brand-primary transition-colors shrink-0">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filtering */}
      <section className="py-24 bg-white relative z-10 rounded-t-[3rem] border-t border-brand-neutral/10">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-brand-primary mb-4 tracking-tight">Explore All Projects</h2>
              <p className="text-brand-neutral font-light">Filter through our diverse range of client success stories.</p>
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? "bg-brand-primary text-white shadow-md" 
                      : "bg-brand-bg text-brand-neutral hover:text-brand-primary border border-brand-neutral/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Normal Projects Grid */}
          {filteredNormalProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNormalProjects.map((project) => (
                <Link 
                  href={`/projects/${project.slug}`}
                  key={project.id}
                  className="group flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-brand-bg">
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white text-brand-primary flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-500 ease-out">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold text-brand-primary mb-2 group-hover:text-brand-primary/70 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-brand-neutral text-sm line-clamp-2">
                    {project.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-bg rounded-3xl border border-brand-neutral/10">
              <p className="text-xl text-brand-neutral">No projects found in this category.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-brand-primary font-bold hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
