"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl border border-brand-neutral/10 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Column - Contact Info */}
              <div className="bg-brand-primary p-12 md:p-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest mb-8 self-start">
                    Get in Touch
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
                    Let&apos;s build something remarkable.
                  </h1>
                  <p className="text-white/80 text-lg font-light mb-16 max-w-sm">
                    Ready to elevate your digital presence? Reach out to our team to discuss your next big move.
                  </p>

                  <div className="flex flex-col gap-8 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Email Us</p>
                        <p className="text-lg font-medium">hello@flaminco.agency</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Call Us</p>
                        <p className="text-base font-medium">🇪🇬 +201062120949</p>
                        <p className="text-base font-medium">🇸🇦 (+9)665-4377-2563</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Visit Us</p>
                        <div className="mb-2">
                          <p className="text-sm font-bold text-white/90">🇪🇬 Egypt</p>
                          <p className="text-sm font-medium leading-tight">Plot nO. 7995, Al jazzera higher institute.<br/>street 9, Mukattam, Cairo, Egypt</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white/90">🇸🇦 KSA</p>
                          <p className="text-sm font-medium leading-tight">7327, Prince Abdul Majeed bin Abdulaziz Street<br/>in Al-Duwaima, AL Madinah AL Munawwarah, Saudi Arabia</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="p-12 md:p-20">
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="firstName" className="text-sm font-bold text-brand-primary">First Name</label>
                      <input 
                        type="text" 
                        id="firstName"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="lastName" className="text-sm font-bold text-brand-primary">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-bold text-brand-primary">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-sm font-bold text-brand-primary">Company Name</label>
                    <input 
                      type="text" 
                      id="company"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                      placeholder="Your Company Ltd."
                    />
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="message" className="text-sm font-bold text-brand-primary">How can we help?</label>
                    <textarea 
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none"
                      placeholder="Tell us about your project goals..."
                    />
                  </div>

                  <Button className="rounded-full pl-6 pr-2 py-2 h-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-bold shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all group flex items-center justify-between self-start">
                    <span className="mr-4">Send Message</span>
                    <div className="bg-white text-brand-primary w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </div>
                  </Button>
                </form>
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
