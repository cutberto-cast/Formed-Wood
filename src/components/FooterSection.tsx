"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const colVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: i * 0.15 },
  }),
};

const bottomVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.5 },
  },
};

const FooterSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <footer id="footer" className="py-10 section-padding gradient-forest" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            className="md:col-span-2"
            variants={colVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            <h3 className="font-display text-xl text-primary-foreground mb-2">Madera & Forma</h3>
            <p className="font-body text-sm text-primary-foreground/60 max-w-sm leading-relaxed">
              Taller de carpintería artesanal especializado en la creación de sillas contemporáneas con maderas nobles.
            </p>
          </motion.div>
          <motion.div
            variants={colVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
          >
            <h4 className="font-body text-xs uppercase tracking-widest text-primary-foreground/40 mb-4">Navegación</h4>
            <ul className="space-y-3">
              {["Filosofía", "Galería", "Proceso", "Productos"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="font-body text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={colVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
          >
            <h4 className="font-body text-xs uppercase tracking-widest text-primary-foreground/40 mb-4">Contacto</h4>
            <ul className="space-y-3 font-body text-primary-foreground/70">
              <li>hola@maderayforma.mx</li>
              <li>+52 55 1234 5678</li>
              <li>Ciudad de México, México</li>
            </ul>
            <div className="flex gap-4 mt-6">
              {["Instagram", "Pinterest"].map((s) => (
                <a key={s} href="#" className="font-body text-xs uppercase tracking-widest text-primary-foreground/40 hover:text-primary-foreground transition-colors duration-300">
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={bottomVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-body text-xs text-primary-foreground/30">© 2026 Madera & Forma. Todos los derechos reservados.</p>
          <p className="font-body text-xs text-primary-foreground/30">Hecho a mano con ♥</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
