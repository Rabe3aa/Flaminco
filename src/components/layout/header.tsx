"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-6 px-4 md:px-8 flex justify-center"
    >
      <div 
        className={cn(
          "w-full max-w-6xl mx-auto flex items-center justify-between transition-all duration-500",
          isScrolled 
            ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-brand-primary/10 rounded-full px-6 py-3" 
            : "bg-transparent px-2 py-2"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="relative w-48 h-14">
            {/* The image should be placed in the public folder as logo.png or logo.svg */}
            <Image 
              src="/logo.png" 
              alt="Company Logo" 
              fill 
              className="object-contain object-left" 
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation - Pill Shaped Container */}
        <nav className="hidden lg:flex items-center bg-brand-primary rounded-full p-1.5 border border-white/10 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all px-6 py-2.5 rounded-full",
                  isActive 
                    ? "bg-white text-brand-primary shadow-sm" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button - Apple Style */}
        <div className="hidden md:block relative group/btn">
          {/* Glowing animated background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-[#00A3FF] to-brand-primary rounded-full blur opacity-30 group-hover/btn:opacity-60 transition duration-1000 animate-pulse"></div>
          
          <Link 
            href="https://wa.me/201062120949"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex rounded-full pl-6 pr-2 py-2 h-auto bg-white hover:bg-brand-bg text-brand-primary font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all group border border-brand-neutral/20 items-center gap-4"
          >
            <span>Chat With Us</span>
            <div className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 text-brand-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-4 bg-white/95 backdrop-blur-xl border border-brand-neutral/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 z-40"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-brand-primary hover:text-brand-neutral py-2 border-b border-brand-neutral/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative group/btn mt-4 w-full">
                {/* Glowing animated background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-[#00A3FF] to-brand-primary rounded-full blur opacity-30 group-hover/btn:opacity-60 transition duration-1000 animate-pulse"></div>
                
                <Link 
                  href="https://wa.me/201062120949"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative w-full inline-flex rounded-full pl-6 pr-2 py-2 h-auto bg-white text-brand-primary font-bold shadow-lg border border-brand-neutral/20 items-center justify-between group"
                >
                  <span>Chat With Us</span>
                  <div className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#0F172A] transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
