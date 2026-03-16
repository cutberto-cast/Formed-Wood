"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Filosofía", href: "#filosofia" },
  { label: "Galería", href: "#galeria" },
  { label: "Proceso", href: "#proceso" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#footer" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the philosophy section and check its position relative to scroll
      const filosofiaElement = document.getElementById('filosofia');
      if (filosofiaElement) {
        // Get the top position of the section relative to the document
        // 80 is a small offset so it changes right when the section hits the header
        const filosofiaTop = filosofiaElement.offsetTop - 80;
        setIsScrolled(window.scrollY > filosofiaTop);
      } else {
        // Fallback if section is not found for some reason
        setIsScrolled(window.scrollY > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 section-padding flex items-center justify-between transition-all duration-500  backdrop-blur-md ${isScrolled
        ? "border-b border-border/50 shadow-sm py-2"
        : "border-b border-transparent py-2"
        }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
    >
      <a
        href="#"
        className={`font-display text-xl tracking-tight transition-colors duration-500 ${isScrolled ? "text-primary" : "text-white"
          }`}
      >
        Madera & Forma
      </a>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`font-display text-sm tracking-wide uppercase transition-all duration-500 font-medium hover:text-accent ${isScrolled ? "text-primary" : "text-white"
              }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className={`md:hidden relative z-50 transition-colors duration-500 ${open
          ? "text-primary-foreground"
          : isScrolled
            ? "text-primary"
            : "text-white"
          }`}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-primary flex flex-col items-center justify-center gap-8 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-primary-foreground tracking-wide uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

