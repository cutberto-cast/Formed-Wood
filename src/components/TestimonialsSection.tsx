"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlurText } from "./BlurText";

const testimonials = [
  { name: "María Rodríguez", role: "Interiorista", text: "Las sillas de Madera & Forma transformaron por completo el comedor de mi cliente. La calidad de la madera y el acabado son incomparables.", stars: 5 },
  { name: "Carlos Méndez", role: "Arquitecto", text: "Colaborar con este taller fue una experiencia excepcional. Entendieron la visión del proyecto y crearon piezas que superaron todas las expectativas.", stars: 5 },
  { name: "Ana López", role: "Coleccionista", text: "Cada silla es una obra de arte funcional. Llevo tres años comprando sus piezas y cada una envejece con una belleza extraordinaria.", stars: 5 },
];

const titleVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.3 + i * 0.15 },
  }),
};

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="py-32 section-padding bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <BlurText text="Testimonios" animateBy="letters" className="body-sm mb-4 text-accent text-center block" />
        <motion.h2
          className="heading-lg text-foreground mb-16 text-center"
          variants={titleVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Lo que dicen nuestros clientes
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass-card p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-lg"
              variants={cardVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-gold text-lg">★</span>
                ))}
              </div>
              <p className="font-body text-foreground/80 leading-relaxed mb-8 italic">"{t.text}"</p>
              <div>
                <p className="font-display text-foreground">{t.name}</p>
                <p className="font-body text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
