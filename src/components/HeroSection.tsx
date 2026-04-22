import { HeroContent } from "./hero/HeroContent";
import { WaveTransition } from "./hero/WaveTransition";
import { DeferredMount } from "./DeferredMount";

// LCP image: real CANI flight controller product photo, served from /public for HTML preload
const HERO_PCB_SRC = "/hero-fc-board.webp";

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

      {/* Background circuit board pattern removed — was causing 12 non-composited
          stroke-dashoffset animations flagged by PageSpeed. The hero already has
          gradient + grid + scan lines + particles for visual depth. */}

      {/* Right-side hero product image with circuit tech overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Blue ambient glow behind image */}
          <div className="absolute w-[60%] h-[50%] bg-blue-500/[0.08] blur-[120px] rounded-full hero-glow-pulse" />
          {/* Cyan ring accent */}
          <div
            className="absolute w-[45%] h-[45%] rounded-full border border-cyan-400/[0.06]"
            style={{ animation: 'heroRingPulse 6s ease-in-out infinite' }}
          />
          
          {/* Product image with on-board current flow effects */}
          <div className="hero-image-breathe relative">
            <img
              src={HERO_PCB_SRC}
              alt="CANI industrial drone flight controller PCBA — golden circuit traces with high-performance MCU"
              className="relative w-[95%] max-w-[760px] object-contain hero-animate-image drop-shadow-2xl"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={760}
              height={405}
              style={{
                filter: 'brightness(1.05) contrast(1.05)',
                aspectRatio: '1920 / 1024',
              }}
            />

            {/* On-board flowing current SVG removed — was responsible for ~10
                non-composited stroke-dashoffset animations + heavy gaussian blur
                filters. The static product photo + ambient glow + technical
                labels still convey the "live electronics" feel. */}
          </div>

          {/* === Circuit trace lines connecting to image === */}
          {/* Top-right: SMA connector label */}
          <div className="absolute top-[18%] right-[12%] flex items-center gap-2 hero-tech-label" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 1.5s both' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <div className="w-20 h-[1px] bg-gradient-to-r from-cyan-400/60 to-transparent" />
            <span className="text-[9px] font-mono text-cyan-400/60 tracking-wider uppercase">SMA·50Ω</span>
          </div>

          {/* Top-left: MCU label */}
          <div className="absolute top-[28%] left-[12%] flex items-center gap-2" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 1.8s both', opacity: 0 }}>
            <span className="text-[9px] font-mono text-blue-400/50 tracking-wider">STM32H7</span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-blue-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Mid-right: RF module annotation */}
          <div className="absolute top-[45%] right-[8%] flex flex-col items-end gap-1" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 2.1s both', opacity: 0 }}>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400/80 animate-pulse" style={{ animationDelay: '1.2s' }} />
              <div className="w-24 h-[1px] bg-gradient-to-r from-cyan-400/40 to-cyan-400/20" />
            </div>
            <span className="text-[8px] font-mono text-cyan-400/40 tracking-widest">RF·5.8GHz·37W</span>
          </div>

          {/* Bottom-left: IPEX label */}
          <div className="absolute bottom-[35%] left-[18%] flex items-center gap-2" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 2.4s both', opacity: 0 }}>
            <span className="text-[8px] font-mono text-blue-300/40 tracking-wider">IPEX·IV</span>
            <div className="w-14 h-[1px] bg-gradient-to-r from-transparent to-blue-300/40" />
            <div className="w-1 h-1 rounded-full bg-blue-300/60 animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          {/* HUD coordinate text */}
          <div className="absolute top-[22%] left-[18%] w-[64%] h-[56%]" style={{ animation: 'heroLabelFadeIn 1s ease-out 1.2s both', opacity: 0 }}>
            <div className="absolute top-0 left-0 w-8 h-8 border-l-[1.5px] border-t-[1.5px] border-cyan-400/20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-[1.5px] border-t-[1.5px] border-cyan-400/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-[1.5px] border-b-[1.5px] border-cyan-400/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-[1.5px] border-b-[1.5px] border-cyan-400/20" />
            <span className="absolute bottom-[-16px] left-0 text-[7px] font-mono text-cyan-400/25 tracking-widest">X:042.7 Y:118.3</span>
            <span className="absolute top-[-16px] right-0 text-[7px] font-mono text-cyan-400/25 tracking-widest">LOCK</span>
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
        @keyframes heroLabelFadeIn {
          0% { opacity: 0; transform: translateX(-8px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .hero-circuit-dash {
          animation: heroDashFlow 3s linear infinite;
        }
        .hero-circuit-dash-slow {
          animation: heroDashFlow 5s linear infinite;
        }
        @keyframes heroDashFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        .hero-wave-anim {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: heroWaveDraw 3s ease-out forwards, heroDashFlow 4s linear 3s infinite;
        }
        @keyframes heroWaveDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes heroSpectrumBar {
          0%, 100% { transform: scaleY(1); opacity: 0.2; }
          50% { transform: scaleY(1.6); opacity: 0.4; }
        }
        /* Removed: hero-node-pulse, hero-spark-flash, hero-flow-line-* keyframes
           — the SVG elements that consumed them have been deleted to fix the
           "non-composited animations" warning from PageSpeed. */
      `}</style>
    </section>
  );
};
