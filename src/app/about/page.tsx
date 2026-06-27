import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { getAboutContent, getTeamMembers, getJourneyMilestones } from "@/lib/actions/about";
import { TeamSection } from "@/components/layout/team-section";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import { Award, TrendingUp, Star } from "lucide-react";

export const revalidate = 3600;

// Static fallbacks
const defaultContent: Record<string, string> = {
  "hero.badge": "Who We Are",
  "hero.heading": "We are an agency built for the future.",
  "hero.subtitle": "Founded on the belief that creative excellence and data science shouldn't exist in silos.",
  "hero.image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
  "mission.title": "Our Mission",
  "mission.text": "To empower ambitious brands by engineering digital experiences that captivate audiences and systematically drive revenue growth. We don't guess; we test, measure, and scale.",
  "approach.title": "Our Approach",
  "approach.text": "We blend high-end aesthetic design with rigorous performance marketing. By breaking down the traditional agency silos, we ensure that every creative asset is deployed with a strategic, data-backed purpose.",
  "journey.heading": "Our Journey",
  "journey.subtitle": "A timeline of our growth and evolution.",
  "team.heading": "The minds behind the magic.",
  "team.subtitle": "Meet our leadership and core departmental heads.",
  "highlight.badge": "Quarterly Achievers",
  "highlight.heading": "Team Stars This Quarter",
  "highlight.member1.name": "Alex Rivera",
  "highlight.member1.role": "Senior Data Analyst",
  "highlight.member1.description": "Alex has been instrumental in optimizing our client bidding algorithms this quarter.",
  "highlight.member1.stat": "+40% Performance",
  "highlight.member1.image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
  "highlight.member2.name": "",
  "highlight.member2.role": "",
  "highlight.member2.description": "",
  "highlight.member2.stat": "",
  "highlight.member2.image": "",
  "highlight.member3.name": "",
  "highlight.member3.role": "",
  "highlight.member3.description": "",
  "highlight.member3.stat": "",
  "highlight.member3.image": "",
};

const defaultTeam: { name: string; role: string; bio: string | null; image: string; department: string }[] = [
  { name: "Shady Elahmady", role: "CEO", bio: null, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop", department: "Leadership" },
  { name: "Alaa Ali", role: "Art Director", bio: null, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop", department: "Design" },
  { name: "Mahmoud Khaled", role: "2D & 3D Designer", bio: null, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop", department: "Design" },
  { name: "Tasbeeh Mahmoud", role: "Marketing", bio: null, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop", department: "Marketing" },
  { name: "Sara Kamal", role: "Marketing", bio: null, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop", department: "Marketing" },
  { name: "Atef Zarzor", role: "Senior Marketing", bio: null, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop", department: "Marketing" },
  { name: "Osama wael", role: "Marketing", bio: null, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop", department: "Marketing" },
  { name: "Rawda Ahmed", role: "Head of Accounting", bio: null, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop", department: "Finance" },
  { name: "Mohamed Afify", role: "Head of Production", bio: null, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop", department: "Production" },
  { name: "Mohamed Mubark", role: "Partner", bio: null, image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1374&auto=format&fit=crop", department: "Leadership" },
];

const defaultMilestones = [
  { year: "2018", title: "The Beginning", description: "Founded in a small coffee shop in San Francisco with just 3 ambitious marketers." },
  { year: "2020", title: "Going Global", description: "Expanded our operations across Europe and Asia, acquiring our first Fortune 500 client." },
  { year: "2022", title: "Digital Evolution", description: "Integrated AI and machine learning into our core offering, launching the proprietary Designova Data Engine." },
  { year: "2024", title: "Industry Leaders", description: "Recognized as the #1 Fastest Growing Independent Agency in North America." },
];

export default async function AboutPage() {
  let c = defaultContent;
  let teamMembers = defaultTeam;
  let journeyMilestones = defaultMilestones;

  try {
    const [dbContent, dbTeam, dbMilestones] = await Promise.all([
      getAboutContent(),
      getTeamMembers(),
      getJourneyMilestones(),
    ]);

    if (Object.keys(dbContent).length > 0) {
      c = { ...defaultContent, ...dbContent };
    }
    if (dbTeam.length > 0) {
      teamMembers = dbTeam.map((m) => ({
        name: m.name,
        role: m.role,
        bio: m.bio ?? null,
        image: m.image || "",
        department: m.department,
      }));
    }
    if (dbMilestones.length > 0) {
      journeyMilestones = dbMilestones;
    }
  } catch (error) {
    console.error("[about] Failed to load content from DB:", error);
  }
  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="max-w-4xl mb-20 text-center mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
              {c["hero.badge"]}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-primary tracking-tighter mb-6 leading-tight">
              {c["hero.heading"]}
            </h1>
            <p className="text-xl text-brand-neutral/80 font-light">
              {c["hero.subtitle"]}
            </p>
          </div>

          {/* Large Image */}
          <div className="w-full h-[500px] md:h-[700px] relative rounded-[3rem] overflow-hidden shadow-2xl mb-32">
            <Image
              src={c["hero.image"]}
              alt="Team collaborating"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
          </div>

          {/* Values Grid */}
          <div className="max-w-5xl mx-auto mb-32">
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              <div>
                <h3 className="text-3xl font-black text-brand-primary mb-4 tracking-tight">{c["mission.title"]}</h3>
                <p className="text-brand-neutral/80 leading-relaxed text-lg font-light">
                  {c["mission.text"]}
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-brand-primary mb-4 tracking-tight">{c["approach.title"]}</h3>
                <p className="text-brand-neutral/80 leading-relaxed text-lg font-light">
                  {c["approach.text"]}
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Our Journey Section (Timeline) */}
      <section className="py-24 bg-white relative z-10 border-y border-brand-neutral/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight mb-4">{c["journey.heading"]}</h2>
             <p className="text-brand-neutral font-light text-lg">{c["journey.subtitle"]}</p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Connecting Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-primary/10 md:-translate-x-1/2 hidden md:block" />

            <div className="flex flex-col gap-12 md:gap-24">
              {journeyMilestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content */}
                  <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-brand-bg p-8 rounded-3xl border border-brand-neutral/10 shadow-sm hover:shadow-xl transition-shadow duration-300">
                      <span className="text-sm font-black text-brand-primary/40 uppercase tracking-widest block mb-2">{milestone.year}</span>
                      <h3 className="text-2xl font-bold text-brand-primary mb-3">{milestone.title}</h3>
                      <p className="text-brand-neutral/80 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="relative flex items-center justify-center w-12 h-12 shrink-0 hidden md:flex">
                     <div className="absolute w-full h-full bg-brand-primary/10 rounded-full animate-ping opacity-75" />
                     <div className="w-4 h-4 bg-brand-primary rounded-full relative z-10 border-2 border-white shadow-sm" />
                  </div>

                  {/* Spacer for empty side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <section className="py-24 relative z-10">
         <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tight mb-4">{c["team.heading"]}</h2>
                <p className="text-brand-neutral font-light text-lg">{c["team.subtitle"]}</p>
              </div>
           </div>

           <Reveal><TeamSection members={teamMembers} /></Reveal>
         </div>
      </section>

      {/* Employee Highlight Section */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="bg-brand-primary rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Section Header */}
            <div className="relative z-10 text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB800]/20 border border-[#FFB800]/40 text-[#FFB800] font-bold text-xs uppercase tracking-widest mb-6">
                <Award size={14} />
                {c["highlight.badge"]}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                {c["highlight.heading"]}
              </h2>
            </div>

            {/* Member Cards */}
            <div className={`relative z-10 grid gap-6 ${
              [2, 3].filter((n) => c[`highlight.member${n}.name`]).length === 0
                ? "grid-cols-1 max-w-sm mx-auto"
                : [2, 3].filter((n) => c[`highlight.member${n}.name`]).length === 1
                ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
                : "grid-cols-1 md:grid-cols-3"
            }`}>
              {([1, 2, 3] as const).map((n) => {
                const name = c[`highlight.member${n}.name`];
                if (!name) return null;
                const role = c[`highlight.member${n}.role`];
                const description = c[`highlight.member${n}.description`];
                const stat = c[`highlight.member${n}.stat`];
                const image = c[`highlight.member${n}.image`];
                return (
                  <div key={n} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-5">
                    {/* Photo */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-xl shrink-0">
                      {image ? (
                        <Image src={image} alt={name} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full bg-white/20 flex items-center justify-center">
                          <Star size={32} className="text-white/50" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-white mb-1">{name}</h3>
                      <p className="text-white/70 font-medium text-sm mb-4">{role}</p>
                      {description && (
                        <p className="text-white/60 text-sm leading-relaxed mb-5">{description}</p>
                      )}
                      {stat && (
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
                          <TrendingUp size={14} className="text-[#FFB800]" />
                          <span className="font-bold text-white text-sm">{stat}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
