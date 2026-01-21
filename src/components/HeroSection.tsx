import { Suspense } from "react";
import { HeroScene3D } from "./hero/HeroScene3D";
import { HeroContent } from "./hero/HeroContent";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background via-background to-secondary overflow-hidden">
      {/* 3D Scene Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      }>
        <HeroScene3D />
      </Suspense>
      
      {/* Content Overlay */}
      <HeroContent />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-[1]" />
    </section>
  );
};
