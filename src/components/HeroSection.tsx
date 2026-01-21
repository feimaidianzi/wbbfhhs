import { Suspense } from "react";
import { HeroScene3D } from "./hero/HeroScene3D";
import { HeroContent } from "./hero/HeroContent";

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
      
      {/* 深色到浅色的平滑过渡区域 */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-[1]">
        {/* 多层渐变实现平滑过渡 */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
    </section>
  );
};