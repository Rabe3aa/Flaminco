import Image from "next/image";
import { ArrowUpRight, TrendingUp, Users, Target, ArrowRight } from "lucide-react";

interface HighlightRowContent {
  heading?: string;
  subtitle?: string;
  cardTitle?: string;
  cardDesc?: string;
  image?: string;
  activeClients?: string;
  roi?: string;
}

const DEFAULTS: HighlightRowContent = {
  heading: "Marketing metrics that actually matter.",
  subtitle: "Stop guessing. We bring absolute clarity to your ad spend with precision tracking.",
  cardTitle: "Data-driven growth strategies",
  cardDesc: "We combine creative execution with rigorous A/B testing to ensure your budget goes further.",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
  activeClients: "172",
  roi: "45",
};

export function HighlightRow({ content = {} }: { content?: HighlightRowContent }) {
  const c = { ...DEFAULTS, ...Object.fromEntries(Object.entries(content).filter(([, v]) => v)) };
  const activeClients = parseInt(c.activeClients!) || 172;
  const roi = parseInt(c.roi!) || 45;

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">

        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="animate-fade-up text-3xl md:text-5xl font-black text-brand-primary tracking-tighter max-w-2xl">
            {c.heading}
          </h2>
          <p className="animate-fade-up text-brand-neutral font-medium max-w-sm" style={{ animationDelay: "0.1s" }}>
            {c.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">

          {/* Large Image Card (Spans 2 columns, 2 rows) */}
          <div className="animate-fade-scale md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group shadow-xl shadow-brand-primary/5">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />
            <Image
              src={c.image!}
              alt="Team collaboration"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/30">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {c.cardTitle}
                  </h3>
                  <p className="text-white/80 max-w-md font-light">
                    {c.cardDesc}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white text-brand-primary rounded-full flex items-center justify-center group-hover:bg-brand-bg transition-colors shadow-lg shadow-black/10 shrink-0">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Small Top Right Card (Stats) */}
          <div className="animate-fade-up bg-brand-bg border border-brand-neutral/10 rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden group hover:bg-white transition-colors shadow-sm hover:shadow-xl hover:shadow-brand-primary/5" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
            <Users className="text-brand-neutral mb-4 group-hover:text-brand-primary transition-colors" size={28} />
            <div className="text-5xl font-black text-brand-primary mb-1 tracking-tighter">
              {activeClients}+
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-neutral group-hover:text-brand-primary/70 transition-colors">
              Active Clients
            </p>
          </div>

          {/* Small Bottom Right Card */}
          <div className="animate-fade-up bg-brand-primary rounded-[2.5rem] p-8 flex flex-col justify-between text-white relative overflow-hidden group shadow-lg shadow-brand-primary/20" style={{ animationDelay: "0.25s" }}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:16px_16px]" />

            <div className="flex justify-between items-start relative z-10">
              <Target size={28} className="text-white/80" />
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-brand-primary transition-all cursor-pointer">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div className="relative z-10 mt-auto">
              <div className="text-5xl font-black mb-1 tracking-tighter">
                {roi}%
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/70">
                Avg ROI Increase
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
