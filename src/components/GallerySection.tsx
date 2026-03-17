"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlurText } from "./BlurText";

const chair1 = "/chair-1.webp";
const chair2 = "/chair-2.webp";
const chair3 = "/chair-3.webp";
const chair4 = "/chair-4.webp";
const chair5 = "/chair-5.webp";
const chair6 = "/chair-6.webp";
const chair7 = "/chair-7.webp";
const chair8 = "/chair-8.webp";

// Layout: 4 columnas x 4 filas = 16 celdas exactas sin huecos
// Fila 1-2: [img1 2×2] | [img2 1×1] [img3 1×1]
//                       | [img4 1×1] [img5 1×1]
// Fila 3-4: [img6 1×2] [img7 1×2] [img8 1×2] [texto 1×2]
const galleryItems = [
  { type: "image", img: chair1, colClasses: "col-span-2 row-span-2" },       // grande
  { type: "image", img: chair2, colClasses: "col-span-1 row-span-1" },       // pequeña
  { type: "image", img: chair3, colClasses: "col-span-1 row-span-1" },       // pequeña
  { type: "image", img: chair4, colClasses: "col-span-1 row-span-1" },       // pequeña
  { type: "image", img: chair5, colClasses: "col-span-1 row-span-1" },       // pequeña
  { type: "image", img: chair6, colClasses: "col-span-1 row-span-1" },       // cuadrada
  { type: "image", img: chair7, colClasses: "col-span-1 row-span-1" },       // cuadrada
  { type: "image", img: chair8, colClasses: "col-span-1 row-span-1" },       // cuadrada
  { type: "text",  text: "La madera respira, siente y recuerda su origen. Nosotros solo la ayudamos a encontrar su nueva forma.", colClasses: "col-span-1 row-span-1 flex items-center justify-center p-6 text-center border border-border/50 rounded-2xl bg-card" },
];

const titleVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

const dropVariant = {
  hidden: { opacity: 0, y: -800, scale: 0.2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 1.6, 
      ease: [0.895, 0, 0.18, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

const GallerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  // Mezclar un poco el índice para que no bajen exactamente en orden de grid, dando un efecto más aleatorio "disparejo"
  const getRandomStagger = (index: number) => {
    const shuffle = [3, 0, 5, 1, 8, 4, 2, 7, 6]; 
    return shuffle[index];
  };

  return (
    <section id="galeria" className="py-32 section-padding bg-background overflow-hidden" ref={containerRef}>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[250px] grid-flow-dense mt-10">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden group cursor-pointer ${item.colClasses} ${item.type === "image" ? "rounded-2xl" : ""}`}
              variants={dropVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={getRandomStagger(i)}
            >
              {item.type === "image" ? (
                <>
                  <img
                    src={item.img!}
                    alt="Pieza de carpintería"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </>
              ) : (
                <p className="font-display text-lg md:text-2xl italic text-foreground leading-snug">
                  "{item.text}"
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
