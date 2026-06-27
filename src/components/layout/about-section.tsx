import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface AboutSectionContent {
  badge?: string;
  heading?: string;
  description?: string;
  image?: string;
  feature1Title?: string;
  feature1Desc?: string;
  feature2Title?: string;
  feature2Desc?: string;
  feature3Title?: string;
  feature3Desc?: string;
}

const DEFAULTS: AboutSectionContent = {
  badge: "About Us",
  heading: "Maximize Your Growth with Our Advertising",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
  feature1Title: "Customized Strategies",
  feature1Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  feature2Title: "Experienced Team",
  feature2Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  feature3Title: "Client-Centric Approach",
  feature3Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
};

export function AboutSection({ content = {} }: { content?: AboutSectionContent }) {
  const c = { ...DEFAULTS, ...Object.fromEntries(Object.entries(content).filter(([, v]) => v)) };

  const features = [
    { num: "01", title: c.feature1Title!, desc: c.feature1Desc! },
    { num: "02", title: c.feature2Title!, desc: c.feature2Desc! },
    { num: "03", title: c.feature3Title!, desc: c.feature3Desc! },
  ];

  return (
    <section className="py-24 bg-brand-bg" id="about">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">

          {/* Left Side - Content & Image */}
          <div className="flex-1 w-full">
            <div className="animate-fade-up">
              <Badge variant="outline" className="mb-6 bg-brand-bg border-brand-primary/20 text-brand-primary">
                {c.badge}
              </Badge>
            </div>

            <div className="animate-fade-up flex flex-col md:flex-row gap-6 md:flex-wrap lg:flex-nowrap lg:gap-12 mb-12" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-primary leading-[1.1] flex-1">
                {c.heading}
              </h2>
              <p className="text-brand-neutral flex-1 text-sm md:text-base leading-relaxed md:pt-2">
                {c.description}
              </p>
            </div>

            <div className="animate-fade-up relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-brand-neutral/10" />
              <Image
                src={c.image!}
                alt="Team meeting discussing strategy"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side - Feature List */}
          <div className="w-full lg:w-[450px] shrink-0 pt-0 lg:pt-[200px]">
            <div className="animate-fade-up bg-brand-bg rounded-3xl p-6 md:p-8 flex flex-col gap-2" style={{ animationDelay: "0.3s" }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-6 p-4 rounded-2xl hover:bg-white transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-brand-primary/10 text-brand-primary font-bold text-xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-brand-bg transition-colors duration-300">
                    {feature.num}
                  </div>
                  <div className="flex flex-col gap-1.5 justify-center">
                    <h4 className="text-xl font-bold text-brand-primary transition-colors">{feature.title}</h4>
                    <p className="text-sm text-brand-neutral leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
