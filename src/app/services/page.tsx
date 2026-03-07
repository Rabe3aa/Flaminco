import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { ArrowRight, Gift, Presentation, Calendar, LayoutTemplate, Palette, Stamp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      title: "Corporate Gifts",
      description: "Premium, customized gifts that leave a lasting impression on your clients, partners, and employees. We handle sourcing, branding, and elegant packaging.",
      icon: Gift,
      color: "bg-blue-500/10 text-blue-600",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1440&auto=format&fit=crop"
    },
    {
      title: "Promotional Materials",
      description: "High-quality promotional items designed to increase brand visibility. From apparel to everyday utility items, we ensure your logo is seen everywhere.",
      icon: Presentation,
      color: "bg-green-500/10 text-green-600",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Events Giveaways",
      description: "Memorable takeaways for conferences, trade shows, and corporate events. We create trendy, desirable items that attendees will actually keep and use.",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-600",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Booths, Pop-ups & Roll-ups",
      description: "Striking exhibition displays that command attention on crowded floors. We design and produce highly portable, easy-to-assemble branded structures.",
      icon: LayoutTemplate,
      color: "bg-orange-500/10 text-orange-600",
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Advertising designs, prints & Vip business gifts",
      description: "End-to-end visual communication. From stunning graphic design to premium printing services and exclusive VIP client gifting strategies.",
      icon: Palette,
      color: "bg-red-500/10 text-red-600",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1400&auto=format&fit=crop"
    },
    {
      title: "Personalized Logo Printing",
      description: "Precision printing technology across various materials. We ensure flawless logo reproduction on any surface with durable, high-fidelity results.",
      icon: Stamp,
      color: "bg-teal-500/10 text-teal-600",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1471&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
            Our Expertise
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter mb-6 leading-tight">
            Premium printing & corporate branding.
          </h1>
          <p className="text-xl text-brand-neutral/80 font-light max-w-2xl mx-auto">
            From high-end corporate gifts to striking exhibition booths, we provide end-to-end tangible branding solutions that make your business stand out.
          </p>
        </div>
      </section>

      {/* Services Visual Grid */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative rounded-[2.5rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-[500px]"
              >
                {/* Image Section (Top Half) */}
                <div className="relative h-1/2 w-full overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Floating Icon */}
                  <div className={`absolute -bottom-6 right-8 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md bg-white/90 z-10 ${service.color} group-hover:-translate-y-2 transition-transform duration-300`}>
                    <service.icon size={24} />
                  </div>
                </div>

                {/* Content Section (Bottom Half) */}
                <div className="relative h-1/2 p-8 flex flex-col bg-white">
                  <h3 className="text-2xl font-bold text-brand-primary mb-3 tracking-tight group-hover:text-[#00A3FF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-neutral/70 leading-relaxed text-sm mb-auto line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* Subtle decorative line */}
                  <div className="w-full h-px bg-brand-neutral/10 my-4" />
                  
                  <Link href="/contact" className="inline-flex items-center justify-between w-full text-sm font-bold text-brand-primary group/btn mt-auto">
                    <span>Discuss project</span>
                    <div className="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover/btn:bg-brand-primary group-hover/btn:text-white transition-colors">
                      <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-brand-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                Ready to scale your business?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-10 font-light">
                Let&apos;s discuss how our tailored strategies can drive measurable growth for your brand.
              </p>
              <Link 
                href="/contact"
                className="inline-flex rounded-full pl-8 pr-2 py-2 h-auto bg-white hover:bg-brand-bg text-brand-primary font-bold shadow-xl hover:scale-105 transition-all group items-center gap-4"
              >
                <span>Start a Project</span>
                <div className="bg-brand-primary text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
