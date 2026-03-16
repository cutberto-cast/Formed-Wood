"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlurText } from "./BlurText";

const cards = [
  {
    title: "Nuestra Historia",
    text: "Desde 2008, cada pieza que sale de nuestro taller lleva consigo una historia de dedicación. Lo que comenzó como un pequeño espacio de creación se ha convertido en un referente del diseño artesanal contemporáneo.",
    icon: "✦",
  },
  {
    title: "Materiales Nobles",
    text: "Seleccionamos cada tabla de roble, nogal y cerezo directamente de aserraderos sostenibles. La veta, el color y la densidad determinan el destino de cada pieza de madera.",
    icon: "◈",
  },
  {
    title: "Enfoque Artesanal",
    text: "Cada unión, cada curva y cada acabado se realiza a mano. No fabricamos en serie — creamos piezas únicas que envejecen con belleza y cuentan historias.",
    icon: "⬡",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: i * 0.2 },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.4 + i * 0.15 },
  }),
};

const PhilosophySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  return (
    <section id="filosofia" className="py-32 section-padding" style={{ background: "var(--gradient-cream)" }}>
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <BlurText text="Nuestra filosofía" animateBy="words" className="philo-subtitle body-sm mb-4 text-accent block" />
        
        <h2 className="heading-lg text-foreground mb-16 max-w-2xl" style={{ perspective: "1000px" }}>
          <motion.div
            className="inline-block origin-bottom"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            La belleza nace de la
          </motion.div>
          {" "}
          <motion.div
            className="inline-block origin-bottom italic text-accent"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
          >
            paciencia
          </motion.div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass-card p-8 md:p-10 group hover:shadow-xl hover:-translate-y-2 hover:bg-white/60 transition-all duration-500 ease-out"
              variants={cardVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            >
              <span className="text-3xl mb-6 block text-accent transform transition-transform duration-500 group-hover:scale-110 origin-left">{card.icon}</span>
              <h3 className="heading-md text-foreground mb-4">{card.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

