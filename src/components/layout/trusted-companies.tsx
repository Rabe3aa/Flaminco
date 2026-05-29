"use client";

import Image from "next/image";

interface TrustedCompany {
  id: string;
  name: string;
  logo: string;
  url?: string | null;
}

export function TrustedCompaniesMarquee({
  companies,
}: {
  companies: TrustedCompany[];
}) {
  // Filter out companies without logos
  const valid = companies.filter((c) => c.logo && c.logo.trim() !== "");
  if (valid.length === 0) return null;

  // Repeat logos enough times to always overflow the viewport (min ~10 items per half)
  const repeatCount = Math.max(2, Math.ceil(20 / valid.length));
  const oneSet = Array.from({ length: repeatCount }, () => valid).flat();
  // Double for seamless infinite loop
  const doubled = [...oneSet, ...oneSet];

  return (
    <section className="py-16 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-10">
        <div className="text-center">
          <p className="text-sm font-bold text-brand-neutral/40 uppercase tracking-[0.2em]">
            Trusted by leading brands
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((company, i) => {
            const inner = (
              <div className="relative h-12 w-32 md:h-14 md:w-40 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain"
                  unoptimized={company.logo.startsWith("/")}
                />
              </div>
            );

            return (
              <div
                key={`logo-${i}`}
                className="flex items-center justify-center shrink-0 px-8 md:px-12"
              >
                {company.url ? (
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={company.name}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
