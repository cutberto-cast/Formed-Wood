"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlurText } from "./BlurText";

const chair1 = "/chair-1.jpg";
const chair2 = "/chair-2.jpg";
const chair3 = "/chair-3.jpg";
const chair4 = "/chair-4.jpg";
const chair5 = "/chair-5.jpg";
const chair6 = "/chair-6.jpg";
const chair7 = "/chair-7.jpg";
const chair8 = "/chair-8.png";

const projects = [
  { img: chair1, name: "Silla Nórdica", material: "Nogal americano", size: "large" },
  { img: chair2, name: "Lounge Tejido", material: "Fresno & cuerda natural", size: "small" },
  { img: chair3, name: "Mecedora Clásica", material: "Cerezo silvestre", size: "small" },
  { img: chair4, name: "Banco Alto", material: "Haya natural", size: "medium" },
  { img: chair7, name: "Sillón de Lectura", material: "Cerezo macizo", size: "medium" },
  { img: chair5, name: "Sillón Cuero", material: "Nogal & cuero", size: "large" },
  { img: chair6, name: "Taburete Minimal", material: "Roble blanco", size: "small" },
  { img: chair8, name: "Silla de Comedor", material: "Nogal & lino", size: "small" },
];

const titleVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: "easeOut" as const, delay: 0.2 + i * 0.15 },
  }),
};

const GallerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  return (
    <section id="galeria" className="py-32 section-padding bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <BlurText text="Galería de proyectos" animateBy="words" className="body-sm mb-4 text-accent block" />
        <motion.h2
          className="heading-lg text-foreground mb-16"
          variants={titleVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Piezas únicas
        </motion.h2>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {projects.map((p, i) => (
            <motion.div
              key={p.name + i}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${p.size === "large" ? "col-span-2 row-span-2" :
                p.size === "medium" ? "col-span-2" : "col-span-1"
                }`}
              variants={itemVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div>
                  <h3 className="font-display text-xl text-primary-foreground">{p.name}</h3>
                  <p className="font-body text-sm text-primary-foreground/70">{p.material}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
