import { Suspense } from "react";
import { HeroScene3D } from "./hero/HeroScene3D";
import { HeroContent } from "./hero/HeroContent";
import { WaveTransition } from "./hero/WaveTransition";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* 3D Scene Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      }>
        <HeroScene3D />
      </Suspense>
      
      {/* Content Overlay */}
      <HeroContent />
      
      {/* 波浪过渡效果 */}
      <WaveTransition />
    </section>
  );
};