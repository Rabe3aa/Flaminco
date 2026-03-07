"use client";

import { motion } from "framer-motion";
import { BarChart3, Share2, Target, Zap, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: BarChart3,
    title: "Data-Driven Marketing",
    desc: "We analyze deep metrics to construct campaigns that guarantee maximum ROI.",
    colSpan: "md:col-span-2",
  },
  {
    icon: Share2,
    title: "Organic SEO Growth",
    desc: "Dominate search rankings with our advanced technical and content strategies.",
    colSpan: "md:col-span-1",
  },
  {
    icon: Target,
    title: "Targeted Advertising",
    desc: "Hyper-focused ad placements that reach your ideal customers at the right time.",
    colSpan: "md:col-span-1",
  },
  {
    icon: Rocket,
    title: "Brand Scaling",
    desc: "Elevate your market presence with aggressive, multi-channel growth tactics.",
    colSpan: "md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-brand-bg/50">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            <Zap size={14} className="fill-brand-primary" />
            Our Arsenal
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary leading-[1.1] mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built to dominate your <br/> digital landscape.
          </motion.h2>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`${feature.colSpan} h-full`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group relative bg-white/60 backdrop-blur-md border border-brand-neutral/10 p-10 rounded-[2.5rem] h-full overflow-hidden hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-1">
                
                {/* Large Background Number */}
                <div className="absolute -right-8 -bottom-10 text-[180px] font-black text-brand-neutral/5 leading-none select-none group-hover:text-brand-primary/5 transition-colors duration-500">
                  0{index + 1}
                </div>

                {/* Floating Icon */}
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500 relative z-10">
                   <feature.icon size={28} className="text-brand-primary group-hover:text-white transition-colors" />
                </div>

                <div className="relative z-10 max-w-[85%]">
                  <h3 className="text-2xl font-bold text-brand-primary mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-brand-neutral text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover line indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-brand-primary transition-all duration-500 group-hover:w-full" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
