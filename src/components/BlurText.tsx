"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
}

export const BlurText = ({
  text,
  className = "",
  delay = 0,
  animateBy = "words",
  direction = "bottom",
}: BlurTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const yOffset = direction === "top" ? -20 : 20;
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animateBy === "words" ? 0.15 : 0.05,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
    >
      {animateBy === "words"
        ? words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em] whitespace-nowrap"
              variants={childVariants}
            >
              {word}
            </motion.span>
          ))
        : words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="inline-block whitespace-nowrap mr-[0.25em]"
            >
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  className="inline-block"
                  variants={childVariants}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
    </motion.span>
  );
};
