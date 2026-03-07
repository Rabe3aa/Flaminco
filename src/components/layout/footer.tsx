import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-brand-primary pt-20 pb-10 border-t border-brand-neutral/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-start">
            <div className="flex flex-col gap-6">
              <Link href="/" className="inline-block relative w-[280px] h-[80px]">
                {/* Original logo (Circle) - Clipped to left side */}
                <div className="absolute inset-0" style={{ clipPath: "inset(0 72% 0 0)" }}>
                  <Image 
                    src="/logo.png" 
                    alt="Flaminco Logo" 
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
                {/* White logo (Text) - Clipped to right side */}
                <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 28%)" }}>
                  <Image 
                    src="/logo.png" 
                    alt="Flaminco Logo Text" 
                    fill
                    className="object-contain object-left brightness-0 invert"
                    priority
                  />
                </div>
              </Link>
              <p className="text-white/80 max-w-sm text-sm">
                Maximize your growth with our expert advertising strategies designed for modern businesses.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-white mb-6">Contact Us</h4>
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🇪🇬</span>
                  <span className="font-semibold text-white">Egypt</span>
                </div>
                <p className="text-sm text-white/80 mb-1">
                  Plot nO. 7995, Al jazzera higher institute. street 9, Mukattam, Cairo, Egypt
                </p>
                <a href="tel:+201062120949" className="text-sm text-white hover:text-white/80 transition-colors">
                  +201062120949
                </a>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🇸🇦</span>
                  <span className="font-semibold text-white">KSA</span>
                </div>
                <p className="text-sm text-white/80 mb-1">
                  7327, Prince Abdul Majeed bin Abdulaziz Street in Al-Duwaima, AL Madinah AL Munawwarah, Saudi Arabia
                </p>
                <a href="tel:+966543772563" className="text-sm text-white hover:text-white/80 transition-colors">
                  (+9)665-4377-2563
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Work", href: "/projects" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-6">Services</h4>
            <ul className="flex flex-col gap-4">
              {["Advertising", "SEO Optimization", "Social Media", "Content Strategy", "Web Design"].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-6">Newsletter</h4>
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white placeholder:text-white/50"
              />
              <Button className="rounded-full pl-6 pr-1.5 py-1.5 h-auto bg-white hover:bg-brand-bg text-brand-primary font-bold shadow-md hover:shadow-lg transition-all group flex items-center justify-between w-full border border-transparent">
                <span>Subscribe</span>
                <div className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60 text-center md:text-left">
            {new Date().getFullYear()} Flaminco. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
