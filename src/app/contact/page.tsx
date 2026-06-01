"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { ArrowRight, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        form.reset();
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl border border-brand-neutral/10 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Column - Contact Info */}
              <div className="bg-brand-primary p-8 md:p-12 lg:p-20 text-white relative overflow-hidden">
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
                        <p className="text-lg font-medium">info@flaminco.agency</p>
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
              <div className="p-8 md:p-12 lg:p-20">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-primary">Message Sent!</h3>
                    <p className="text-brand-neutral/70 max-w-sm">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-6 py-2.5 rounded-full border border-brand-primary/20 text-brand-primary text-sm font-semibold hover:bg-brand-primary/5 transition-all"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="firstName" className="text-sm font-bold text-brand-primary">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                          placeholder="Jane"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm font-bold text-brand-primary">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-bold text-brand-primary">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="jane@company.com"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-sm font-bold text-brand-primary">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="Your Company Ltd."
                      />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="message" className="text-sm font-bold text-brand-primary">How can we help? *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-neutral/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none"
                        placeholder="Tell us about your project goals..."
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                        <AlertCircle size={16} className="shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="rounded-full pl-6 pr-2 py-2 h-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-bold shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all group flex items-center justify-between self-start disabled:opacity-60 disabled:hover:scale-100"
                    >
                      <span className="mr-4">{status === "loading" ? "Sending..." : "Send Message"}</span>
                      <div className="bg-white text-brand-primary w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] group-hover:text-white transition-colors">
                        {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                      </div>
                    </Button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
