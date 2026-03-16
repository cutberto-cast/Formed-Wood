"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlurText } from "./BlurText";

const chair1 = "/chair-1.jpg";
const chair2 = "/chair-2.jpg";
const chair3 = "/chair-3.jpg";
const chair5 = "/chair-5.jpg";

const products = [
  { img: chair1, name: "Nórdica", materials: "Nogal americano, aceite natural", price: "$8,900" },
  { img: chair2, name: "Tejido", materials: "Fresno, cuerda de algodón", price: "$3,500" },
  { img: chair3, name: "Mecedora", materials: "Cerezo silvestre, cera de abeja", price: "$3,500" },
  { img: chair5, name: "Cuero", materials: "Nogal, cuero italiano", price: "$3,500" },
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
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.2 + i * 0.15 },
  }),
};

const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  return (
    <section id="productos" className="py-32 section-padding bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <BlurText text="Colección" animateBy="letters" className="body-sm mb-4 text-accent block" />
        <motion.h2
          className="heading-lg text-foreground mb-16"
          variants={titleVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Productos destacados
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              className="group cursor-pointer hover:-translate-y-2 transition-transform duration-500 ease-out"
              variants={cardVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            >
              <div className="overflow-hidden rounded-2xl mb-5 bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-xl text-foreground">{p.name}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{p.materials}</p>
                </div>
                <span className="font-display text-lg text-accent">{p.price}</span>
              </div>
              <button
                className="mt-4 px-6 py-2.5 border border-primary text-primary font-body text-xs uppercase tracking-widest rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full active:scale-95"
              >
                Ver proyecto
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
