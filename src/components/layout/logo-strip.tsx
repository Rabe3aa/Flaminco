"use client";

import { motion } from "framer-motion";

const logos = [
  "Logoipsum Brand Standard",
  "Logoipsum Studio",
  "Logoipsum Creative",
  "Logoipsum Agency",
  "Logoipsum Media",
  "Logoipsum Digital",
];

export function LogoStrip() {
  return (
    <section className="py-12 bg-brand-bg overflow-hidden border-y border-brand-neutral/10">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="relative flex overflow-x-hidden group">
          {/* First set of logos */}
          <motion.div
            className="flex space-x-16 md:space-x-24 items-center whitespace-nowrap px-8 md:px-12"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {logos.map((logo, index) => (
              <div key={`logo-1-${index}`} className="flex items-center justify-center opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300">
                <span className="text-xl md:text-2xl font-bold text-brand-primary whitespace-nowrap">
                   {/* Simulating logos with styled text for placeholder, using actual SVG icons or images would be better in prod */}
                  {logo.split(' ')[1] ? (
                    <span className="flex items-center gap-2">
                       <span className="font-black text-brand-primary">{logo.split(' ')[0]}</span>
                       <span className="font-light text-brand-neutral">{logo.split(' ').slice(1).join(' ')}</span>
                    </span>
                  ) : logo}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Duplicate set for seamless loop */}
          <motion.div
            className="absolute top-0 flex space-x-16 md:space-x-24 items-center whitespace-nowrap px-8 md:px-12"
            animate={{ x: ["100%", "0%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
             {logos.map((logo, index) => (
              <div key={`logo-2-${index}`} className="flex items-center justify-center opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300">
                <span className="text-xl md:text-2xl font-bold text-brand-primary whitespace-nowrap">
                  {logo.split(' ')[1] ? (
                    <span className="flex items-center gap-2">
                       <span className="font-black text-brand-primary">{logo.split(' ')[0]}</span>
                       <span className="font-light text-brand-neutral">{logo.split(' ').slice(1).join(' ')}</span>
                    </span>
                  ) : logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
