"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import GallerySection from "@/components/GallerySection";
import ProcessSection from "@/components/ProcessSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <GallerySection />
        <ProcessSection />
        <ProductsSection />
        <TestimonialsSection />
        <FooterSection />
      </main>
    </>
  );
}
