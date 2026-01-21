import { Suspense } from "react";
import { HeroScene3D } from "./hero/HeroScene3D";
import { HeroContent } from "./hero/HeroContent";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-foreground overflow-hidden">
      {/* 3D Scene Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-foreground" />
      }>
        <HeroScene3D />
      </Suspense>
      
      {/* Content Overlay */}
      <HeroContent />
      
      {/* Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />
    </section>
  );
};
