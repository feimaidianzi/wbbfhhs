import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { HeroContent } from "./hero/HeroContent";
import { WaveTransition } from "./hero/WaveTransition";

// Lazy load the heavy 3D scene (Three.js ~500KB)
const HeroScene3D = lazy(() => import("./hero/HeroScene3D").then(m => ({ default: m.HeroScene3D })));

export const HeroSection = () => {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load 3D scene after a short delay to prioritize FCP
    const timer = setTimeout(() => setShouldLoad3D(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Ken Burns background layer */}
      <div className="absolute inset-0 hero-ken-burns">
        {shouldLoad3D ? (
          <Suspense fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          }>
            <HeroScene3D />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        )}
      </div>
      
      {/* Content Overlay */}
      <HeroContent />
      
      {/* 波浪过渡效果 */}
      <WaveTransition />
    </section>
  );
};
