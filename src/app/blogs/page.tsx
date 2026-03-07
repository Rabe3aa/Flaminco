import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { Zap, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";

export default function BlogsPage() {
  const insights = [
    {
      title: "The Future of AI in Ad Bidding",
      category: "Performance Marketing",
      readTime: "5 min read",
      icon: Zap,
    },
    {
      title: "Consumer Behavior Shifts in 2024",
      category: "Market Research",
      readTime: "8 min read",
      icon: Tag,
    },
    {
      title: "Optimizing Conversion Rates for Gen Z",
      category: "UX/UI Strategy",
      readTime: "6 min read",
      icon: BookOpen,
    },
    {
      title: "Data-Driven SEO Frameworks",
      category: "Organic Growth",
      readTime: "10 min read",
      icon: Clock,
    }
  ];

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
              <BookOpen size={14} />
              <span>Insights & Updates</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
              Latest from <span className="text-brand-primary">our</span><br />
              <span className="text-brand-neutral">advertising experts.</span>
            </h1>
            <p className="text-xl text-brand-neutral/80 max-w-2xl font-light leading-relaxed">
              Dive into our latest thoughts on marketing strategies, design trends, and industry insights that are shaping the future of digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className="group cursor-pointer bg-brand-bg border border-brand-neutral/10 p-10 rounded-[2rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <insight.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-brand-neutral/60 uppercase tracking-widest bg-white px-3 py-1 rounded-full">
                    {insight.readTime}
                  </span>
                </div>
                
                <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-3">
                  {insight.category}
                </p>
                <h3 className="text-2xl font-bold text-brand-neutral mb-6 leading-tight group-hover:text-brand-primary transition-colors">
                  {insight.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm font-bold text-brand-neutral group-hover:text-brand-primary transition-colors">
                  Read Article
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
