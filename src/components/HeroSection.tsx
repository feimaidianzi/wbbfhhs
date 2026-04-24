import { HeroContent } from "./hero/HeroContent";
import { WaveTransition } from "./hero/WaveTransition";
import flagshipDroneHero from "@/assets/hero/cani-flagship-drone-hero.webp";

// LCP image: CANI flagship industrial UAV — full-aircraft hero shot
const HERO_DRONE_SRC = flagshipDroneHero;

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#0a0f1a] overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#0a1628]" />

      {/* Faint grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Right-side hero — flagship industrial UAV product shot */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Cyan ambient glow behind drone */}
          <div className="absolute w-[65%] h-[55%] bg-cyan-500/[0.10] blur-[120px] rounded-full hero-glow-pulse" />
          {/* Soft ring accent */}
          <div
            className="absolute w-[50%] h-[50%] rounded-full border border-cyan-400/[0.08]"
            style={{ animation: 'heroRingPulse 6s ease-in-out infinite' }}
          />

          {/* Flagship drone with subtle breathing animation */}
          <div className="hero-image-breathe relative">
            <img
              src={HERO_DRONE_SRC}
              alt="CANI industrial UAV — flagship quadcopter platform with high-precision gimbal camera, carbon-fiber chassis, 24/7 mission-ready"
              className="relative w-[95%] max-w-[820px] object-contain hero-animate-image drop-shadow-2xl"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1600}
              height={1024}
              style={{
                filter: 'brightness(1.05) contrast(1.05)',
                aspectRatio: '1600 / 1024',
              }}
            />
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
        </div>
      </div>

      {/* Content */}
      <HeroContent />

      {/* Wave transition */}
      <WaveTransition />

      {/* Keyframe styles */}
      <style>{`
        @keyframes heroRingPulse {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.08); opacity: 0.10; }
        }
        .hero-stat-item {
          opacity: 0;
          transform: translateY(20px);
          animation: heroStatFadeIn 0.6s ease-out forwards;
        }
        @keyframes heroStatFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-scroll-indicator {
          opacity: 0;
          animation: heroScrollFadeIn 0.8s ease-out 2s forwards;
        }
        @keyframes heroScrollFadeIn { to { opacity: 1; } }
        .hero-scroll-chevron {
          animation: heroChevronBounce 1.5s ease-in-out infinite;
        }
        @keyframes heroChevronBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .wave-layer { width: 300vw; will-change: transform; }
        .wave-layer-1 { animation: waveSlideLeft 25s linear infinite; }
        .wave-layer-2 { animation: waveSlideRight 18s linear infinite; }
        .wave-layer-3 { animation: waveSlideLeft 14s linear infinite; }
        @keyframes waveSlideLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-100vw); }
        }
        @keyframes waveSlideRight {
          from { transform: translateX(-100vw); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-stat-item, .hero-scroll-indicator, .hero-scroll-chevron,
          .wave-layer-1, .wave-layer-2, .wave-layer-3 { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
};
