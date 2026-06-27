"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

type ProjectItem = {
  id: string;
  title: string;
  category: string;
  overview: string;
  benefits: string[];
};

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="bg-brand-primary text-brand-bg relative flex flex-col" id="projects">
      {/* Header Area */}
      <div className="container mx-auto px-4 md:px-8 py-24 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
         <div>
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-bg/10 border border-brand-bg/20 text-brand-bg font-bold text-xs uppercase tracking-widest mb-6"
            >
              Selected Work
            </motion.div>
             <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 flex items-center gap-3 md:gap-4 flex-wrap">
                Featured Projects
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="w-12 h-12 md:w-16 md:h-16 text-[#FFD700] fill-[#FFD700]" />
                </motion.div>
             </h2>
             <p className="text-brand-bg/80 max-w-md text-lg">
                Explore how we have scaled ambitious brands through strategic design and data-driven marketing.
             </p>
         </div>
         <Link 
            href="/projects"
            className="inline-flex rounded-full pl-6 pr-2 py-2 h-auto bg-brand-bg text-brand-primary font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:bg-brand-primary hover:text-white transition-all group items-center gap-4 cursor-pointer"
          >
            <span>View All Projects</span>
            <div className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
      </div>

      {/* Layered Accordion Area */}
      <div className="w-full flex flex-col pb-24 relative z-10">
        {projects.map((project, index) => {
          const isActive = hoveredIndex === index;
          
          return (
            <motion.div 
              key={project.id}
              className="w-full bg-brand-primary overflow-hidden cursor-pointer group border-t border-brand-bg/10 relative"
              style={{ zIndex: projects.length - index }} // Ensures higher items naturally visually stack if needed
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => setHoveredIndex(index)}
              initial={false}
              animate={{ 
                height: isActive ? "auto" : "clamp(5rem, 9vw, 9rem)",
                backgroundColor: isActive ? "#0065A6" : "#0072BB"
              }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="container mx-auto px-4 md:px-8 pt-4 md:pt-6 h-full flex flex-col">
                 {/* Massive Title */}
                 <h3
                   className="font-black tracking-tighter text-brand-bg m-0 transition-opacity duration-500 break-words hyphens-auto"
                   style={{
                     fontSize: "clamp(2.75rem, 13vw, 16rem)",
                     lineHeight: 0.8, // Tight to keep it pinned to the top
                     opacity: isActive ? 1 : 0.7,
                     transform: "translateY(-2%)" // Slight bump up
                   }}
                 >
                   {project.title}
                 </h3>

                 {/* Content that reveals */}
                 <AnimatePresence>
                   {isActive && (
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 10 }}
                       transition={{ duration: 0.4, delay: 0.1 }}
                       className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-16 pb-16 mt-auto"
                     >
                        <div className="lg:col-span-3">
                           <h4 className="text-xl font-medium mb-1 opacity-90">Overview</h4>
                           <p className="text-xs font-bold uppercase tracking-widest text-brand-bg/50 mb-4">{project.category}</p>
                        </div>
                        
                        <div className="lg:col-span-5">
                           <p className="text-xl md:text-2xl leading-relaxed font-light text-brand-bg/90">
                             {project.overview}
                           </p>
                        </div>
                        
                        <div className="lg:col-span-4">
                           <h4 className="text-xl font-medium mb-6 opacity-90">Benefits</h4>
                           <ul className="flex flex-col gap-3">
                             {project.benefits.map((benefit, i) => (
                               <li key={i} className="flex items-center gap-4 text-lg font-light text-brand-bg/90">
                                 <div className="w-1.5 h-1.5 bg-brand-bg/80 rounded-full shrink-0" />
                                 <span>{benefit}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
        {/* Bottom border for the last item */}
        <div className="w-full border-t border-brand-bg/20" />
      </div>
    </section>
  );
}

