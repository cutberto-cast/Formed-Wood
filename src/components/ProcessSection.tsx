"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlurText } from "./BlurText";

const process1 = "/process-1.webp";
const process2 = "/process-2.webp";
const process3 = "/process-3.webp";
const process4 = "/process-4.webp";

const steps = [
  { num: "01", title: "Diseño", desc: "Cada silla comienza como un boceto. Definimos proporciones, ergonomía y carácter antes de tocar la madera.", img: process1 },
  { num: "02", title: "Selección & Corte", desc: "Elegimos la tabla perfecta, respetando la veta natural. El corte preciso define la calidad final de cada pieza.", img: process2 },
  { num: "03", title: "Ensamblaje", desc: "Uniones de espiga y mortaja, sin clavos ni tornillos visibles. La estructura se sostiene por geometría y precisión.", img: process3 },
  { num: "04", title: "Acabado", desc: "Lijado a mano, aceites naturales y cera de abeja. Cada superficie se trata para revelar la belleza de la madera.", img: process4 },
];

const titleVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

// Component for individual step with its own IntersectionObserver
const ProcessStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepRef, { once: true, margin: "-10% 0px" });
  const isEven = index % 2 === 0;

  const textVariant = {
    hidden: { opacity: 0, y: 40, x: isEven ? -20 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" as const, delay: i * 0.15 },
    }),
  };

  const imageVariant = {
    hidden: {
      opacity: 0,
      x: isEven ? 50 : -50,
      clipPath: isEven ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    },
    visible: {
      opacity: 1,
      x: 0,
      clipPath: "inset(0 0 0 0%)",
      transition: { duration: 1.4, ease: "easeInOut" as const, delay: 0.2 },
    },
  };

  const imgScaleVariant = {
    hidden: { scale: 1.2 },
    visible: {
      scale: 1,
      transition: { duration: 1.4, ease: "easeOut" as const, delay: 0.2 },
    },
  };

  return (
    <div
      ref={stepRef}
      className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16 items-center`}
    >
      <div className="flex-1">
        <motion.span
          className="inline-block font-display text-6xl md:text-8xl text-primary-foreground/10"
          variants={textVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          {step.num}
        </motion.span>
        <motion.h3
          className="font-display text-3xl md:text-4xl text-primary-foreground mt-2"
          variants={textVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="font-body text-primary-foreground/70 mt-4 max-w-md leading-relaxed"
          variants={textVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
        >
          {step.desc}
        </motion.p>
      </div>
      <div className="flex-1 w-full">
        <motion.div
          className="overflow-hidden rounded-2xl"
          variants={imageVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.img
            src={step.img}
            alt={step.title}
            className="w-full h-[300px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            variants={imgScaleVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </motion.div>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  return (
    <section id="proceso" className="py-32 gradient-forest" ref={containerRef}>
      <div className="section-padding max-w-7xl mx-auto">
        <BlurText text="Nuestro proceso" animateBy="words" className="body-sm mb-4 text-secondary block" />
        <motion.h2
          className="heading-lg text-primary-foreground mb-20"
          variants={titleVariant}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          Del árbol a <span className="italic">tu hogar</span>
        </motion.h2>

        <div className="space-y-24">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
