import heroPcbBoard from "@/assets/hero-pcb-board.png";
import { HeroContent } from "./hero/HeroContent";
import { WaveTransition } from "./hero/WaveTransition";

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

      {/* Animated circuit trace lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal scan line */}
        <div
          className="absolute left-0 right-0 h-[1px] opacity-[0.07]"
          style={{
            top: '30%',
            background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.6) 20%, rgba(56,189,248,0.8) 50%, rgba(56,189,248,0.6) 80%, transparent)',
            animation: 'heroScanLine 8s ease-in-out infinite',
          }}
        />
        {/* Diagonal trace */}
        <div
          className="absolute opacity-[0.04]"
          style={{
            width: '200%',
            height: '1px',
            top: '55%',
            left: '-50%',
            background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.5) 30%, rgba(34,211,238,0.7) 50%, rgba(34,211,238,0.5) 70%, transparent)',
            transform: 'rotate(-15deg)',
            animation: 'heroScanLine 12s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Floating tech particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + i % 3}px`,
              height: `${2 + i % 3}px`,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: i % 2 === 0 ? 'rgba(56,189,248,0.4)' : 'rgba(34,211,238,0.3)',
              boxShadow: `0 0 ${6 + i * 2}px ${i % 2 === 0 ? 'rgba(56,189,248,0.3)' : 'rgba(34,211,238,0.2)'}`,
              animation: `heroParticleFloat ${4 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Right-side hero product image */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Blue ambient glow behind image */}
          <div className="absolute w-[60%] h-[50%] bg-blue-500/[0.08] blur-[120px] rounded-full hero-glow-pulse" />
          {/* Cyan ring accent */}
          <div
            className="absolute w-[45%] h-[45%] rounded-full border border-cyan-400/[0.06]"
            style={{ animation: 'heroRingPulse 6s ease-in-out infinite' }}
          />
          <div className="hero-image-breathe">
            <img
              src={heroPcbBoard}
              alt="CANI industrial drone PCBA circuit board with golden IPEX connectors"
              className="relative w-[70%] max-w-[600px] object-contain hero-animate-image drop-shadow-2xl"
              style={{
                filter: 'brightness(1.1) contrast(1.08)',
              }}
            />
          </div>
          {/* Tech data overlay dots */}
          <div className="absolute top-[25%] right-[18%] flex items-center gap-2 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <div className="w-12 h-[1px] bg-gradient-to-r from-cyan-400/60 to-transparent" />
          </div>
          <div className="absolute bottom-[30%] right-[25%] flex items-center gap-2 opacity-20">
            <div className="w-16 h-[1px] bg-gradient-to-l from-blue-400/50 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
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
        @keyframes heroScanLine {
          0%, 100% { opacity: 0.03; transform: translateY(0); }
          50% { opacity: 0.08; transform: translateY(40px); }
        }
        @keyframes heroParticleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-15px) translateX(8px); opacity: 0.6; }
          50% { transform: translateY(-5px) translateX(-5px); opacity: 0.4; }
          75% { transform: translateY(-20px) translateX(3px); opacity: 0.5; }
        }
        @keyframes heroRingPulse {
          0%, 100% { transform: scale(1); opacity: 0.04; }
          50% { transform: scale(1.08); opacity: 0.08; }
        }
      `}</style>
    </section>
  );
};
