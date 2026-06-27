import { BarChart3, Share2, Target, Rocket, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeaturesSectionContent {
  badge?: string;
  heading?: string;
  card1Title?: string;
  card1Desc?: string;
  card2Title?: string;
  card2Desc?: string;
  card3Title?: string;
  card3Desc?: string;
  card4Title?: string;
  card4Desc?: string;
}

const DEFAULTS: FeaturesSectionContent = {
  badge: "Our Arsenal",
  heading: "Built to dominate your digital landscape.",
  card1Title: "Data-Driven Marketing",
  card1Desc: "We analyze deep metrics to construct campaigns that guarantee maximum ROI.",
  card2Title: "Organic SEO Growth",
  card2Desc: "Dominate search rankings with our advanced technical and content strategies.",
  card3Title: "Targeted Advertising",
  card3Desc: "Hyper-focused ad placements that reach your ideal customers at the right time.",
  card4Title: "Brand Scaling",
  card4Desc: "Elevate your market presence with aggressive, multi-channel growth tactics.",
};

const ICONS = [BarChart3, Share2, Target, Rocket];
const COL_SPANS = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

export function FeaturesSection({ content = {} }: { content?: FeaturesSectionContent }) {
  const c = { ...DEFAULTS, ...Object.fromEntries(Object.entries(content).filter(([, v]) => v)) };

  const features = [
    { title: c.card1Title!, desc: c.card1Desc! },
    { title: c.card2Title!, desc: c.card2Desc! },
    { title: c.card3Title!, desc: c.card3Desc! },
    { title: c.card4Title!, desc: c.card4Desc! },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-brand-bg/50">
      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
            <Zap size={14} className="fill-brand-primary" />
            {c.badge}
          </div>
          <h2 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary leading-[1.1] mb-6 tracking-tighter" style={{ animationDelay: "0.1s" }}>
            {c.heading}
          </h2>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {features.map((feature, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={index}
                className={`animate-fade-up ${COL_SPANS[index]} h-full`}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <Card className="group relative bg-white/60 backdrop-blur-md border border-brand-neutral/10 p-10 rounded-[2.5rem] h-full overflow-hidden hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-1">

                  {/* Large Background Number */}
                  <div className="absolute -right-8 -bottom-10 text-[180px] font-black text-brand-neutral/5 leading-none select-none group-hover:text-brand-primary/5 transition-colors duration-500">
                    0{index + 1}
                  </div>

                  {/* Floating Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500 relative z-10">
                    <Icon size={28} className="text-brand-primary group-hover:text-white transition-colors" />
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
