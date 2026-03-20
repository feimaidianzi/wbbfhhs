import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { HeroContent } from "./hero/HeroContent";
import { WaveTransition } from "./hero/WaveTransition";
import heroPcbBoard from "@/assets/hero-pcb-board.png";

// Lazy load the heavy 3D scene (Three.js ~500KB)
const HeroScene3D = lazy(() => import("./hero/HeroScene3D").then(m => ({ default: m.HeroScene3D })));

export const HeroSection = () => {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

      {/* PCB Board semi-transparent overlay layer */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {/* Right-side primary PCB */}
        <div className="absolute right-[-5%] md:right-[5%] top-1/2 -translate-y-1/2 hero-pcb-float">
          <div className="relative">
            <div className="absolute inset-0 blur-[60px] bg-cyan-500/20 rounded-full scale-125 hero-pcb-glow" />
            <img
              src={heroPcbBoard}
              alt="CANI drone PCB circuit board"
              className="relative w-[280px] md:w-[360px] lg:w-[440px] opacity-[0.18] md:opacity-[0.22] hero-pcb-image"
              style={{
                filter: 'brightness(1.2) contrast(1.1)',
                maskImage: 'radial-gradient(ellipse 80% 80% at center, black 40%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 40%, transparent 75%)',
              }}
            />
            <div className="absolute inset-0 hero-pcb-scanline" />
          </div>
        </div>

        {/* Left-side secondary PCB (desktop only) */}
        <div className="absolute left-[-8%] md:left-[2%] bottom-[15%] hero-pcb-float-reverse hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 blur-[40px] bg-purple-500/15 rounded-full scale-125" />
            <img
              src={heroPcbBoard}
              alt=""
              className="relative w-[180px] opacity-[0.08] rotate-[15deg]"
              style={{
                filter: 'brightness(0.9) contrast(1.2) hue-rotate(30deg)',
                maskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <HeroContent />

      {/* 波浪过渡效果 */}
      <WaveTransition />
    </section>
  );
};
