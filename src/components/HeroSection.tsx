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
          <div className="hero-image-breathe relative">
            <img
              src={heroPcbBoard}
              alt="CANI industrial drone PCBA circuit board with golden IPEX connectors"
              className="relative w-[70%] max-w-[600px] object-contain hero-animate-image drop-shadow-2xl"
              style={{
                filter: 'brightness(1.1) contrast(1.08)',
              }}
            />

            {/* === On-chip current flow & glow effects === */}
            {/* Chip glow hotspots - simulating active IC heat/power */}
            <div className="absolute top-[22%] left-[38%] w-8 h-6 rounded-sm bg-cyan-400/[0.08] blur-[6px] hero-chip-pulse" />
            <div className="absolute top-[35%] left-[32%] w-10 h-8 rounded-sm bg-blue-400/[0.06] blur-[8px] hero-chip-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[55%] left-[42%] w-12 h-10 rounded bg-cyan-400/[0.07] blur-[10px] hero-chip-pulse" style={{ animationDelay: '0.5s' }} />
            {/* LED display glow */}
            <div className="absolute top-[18%] right-[22%] w-6 h-5 rounded-sm bg-emerald-400/[0.12] blur-[5px] hero-chip-pulse" style={{ animationDelay: '1.5s' }} />
            {/* Golden IPEX area warm glow */}
            <div className="absolute bottom-[18%] left-[30%] w-16 h-12 rounded bg-amber-400/[0.05] blur-[12px] hero-chip-pulse" style={{ animationDelay: '2s' }} />

            {/* Current flow lines on PCB traces */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
              {/* Main power trace - top connector down */}
              <path d="M 120,30 L 120,80 L 160,80 L 160,140" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1.5" strokeLinecap="round" />
              <circle r="2.5" fill="rgba(56,189,248,0.7)" filter="url(#chipGlow)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 120,30 L 120,80 L 160,80 L 160,140" />
              </circle>

              {/* Secondary trace - horizontal through chips */}
              <path d="M 80,120 L 140,120 L 180,100 L 250,100" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="1" strokeLinecap="round" />
              <circle r="2" fill="rgba(34,211,238,0.6)" filter="url(#chipGlow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 80,120 L 140,120 L 180,100 L 250,100" />
              </circle>

              {/* Diagonal trace - chip to SMA connector */}
              <path d="M 160,160 L 200,130 L 260,130 L 280,60" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="0.8" strokeLinecap="round" />
              <circle r="1.8" fill="rgba(56,189,248,0.5)" filter="url(#chipGlow)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 160,160 L 200,130 L 260,130 L 280,60" />
              </circle>

              {/* Bottom trace - IPEX area */}
              <path d="M 100,220 L 150,220 L 180,200 L 220,200 L 240,220" fill="none" stroke="rgba(251,191,36,0.1)" strokeWidth="0.8" strokeLinecap="round" />
              <circle r="1.5" fill="rgba(251,191,36,0.5)" filter="url(#chipGlowWarm)">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M 100,220 L 150,220 L 180,200 L 220,200 L 240,220" />
              </circle>

              {/* Glow filter definitions */}
              <defs>
                <filter id="chipGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="chipGlowWarm" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Electric arc micro-flashes */}
            <div className="absolute top-[30%] left-[40%] w-1 h-1 rounded-full bg-white/40 hero-arc-flash" />
            <div className="absolute top-[50%] left-[48%] w-0.5 h-0.5 rounded-full bg-cyan-300/50 hero-arc-flash" style={{ animationDelay: '1.2s' }} />
            <div className="absolute top-[24%] right-[28%] w-0.5 h-0.5 rounded-full bg-white/30 hero-arc-flash" style={{ animationDelay: '2.4s' }} />
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

          {/* Mid-left: LED digit display annotation */}
          <div className="absolute top-[32%] right-[22%] flex items-center gap-2" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 2.7s both', opacity: 0 }}>
            <div className="w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse" style={{ animationDelay: '0.8s' }} />
            <div className="w-10 h-[1px] bg-gradient-to-r from-emerald-400/40 to-transparent" />
            <span className="text-[8px] font-mono text-emerald-400/40 tracking-wider">CH·SEL</span>
          </div>

          {/* === Data flow light streams === */}
          {/* Main data flow - curved path with glowing dot */}
          <svg className="absolute top-[15%] left-[5%] w-[90%] h-[70%] overflow-visible" style={{ opacity: 0.25 }}>
            {/* Curved circuit path 1 */}
            <path d="M 50,50 Q 200,20 350,80 T 650,60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5" strokeDasharray="4 8" className="hero-circuit-dash" />
            {/* Curved circuit path 2 */}
            <path d="M 30,200 Q 150,160 300,220 T 600,180" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" strokeDasharray="6 10" className="hero-circuit-dash-slow" />
            {/* Flowing light dot on path 1 */}
            <circle r="2" fill="rgba(56,189,248,0.8)" className="hero-flow-dot-1">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 50,50 Q 200,20 350,80 T 650,60" />
            </circle>
            {/* Flowing light dot on path 2 */}
            <circle r="1.5" fill="rgba(34,211,238,0.7)" className="hero-flow-dot-2">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 30,200 Q 150,160 300,220 T 600,180" />
            </circle>
            {/* Vertical data stream */}
            <line x1="500" y1="30" x2="500" y2="280" stroke="rgba(56,189,248,0.15)" strokeWidth="0.5" strokeDasharray="3 12" className="hero-circuit-dash" />
            <circle r="1.5" fill="rgba(56,189,248,0.6)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 500,30 L 500,280" />
            </circle>
          </svg>

          {/* === HUD targeting frame === */}
          {/* Outer HUD frame with rotating corners */}
          <div className="absolute top-[22%] left-[18%] w-[64%] h-[56%]" style={{ animation: 'heroLabelFadeIn 1s ease-out 1.2s both', opacity: 0 }}>
            {/* Corner brackets - TL */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-[1.5px] border-t-[1.5px] border-cyan-400/20" />
            <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-cyan-400/10" />
            {/* Corner brackets - TR */}
            <div className="absolute top-0 right-0 w-8 h-8 border-r-[1.5px] border-t-[1.5px] border-cyan-400/20" />
            <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-cyan-400/10" />
            {/* Corner brackets - BL */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-[1.5px] border-b-[1.5px] border-cyan-400/20" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-cyan-400/10" />
            {/* Corner brackets - BR */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-[1.5px] border-b-[1.5px] border-cyan-400/20" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-cyan-400/10" />

            {/* Center crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-[0.5px] bg-cyan-400/15" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.5px] h-6 bg-cyan-400/15" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-cyan-400/15" />
            </div>

            {/* HUD side ticks */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-1">
              <div className="w-3 h-[0.5px] bg-cyan-400/20" />
              <div className="w-1.5 h-[0.5px] bg-cyan-400/10" />
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center gap-1">
              <div className="w-1.5 h-[0.5px] bg-cyan-400/10" />
              <div className="w-3 h-[0.5px] bg-cyan-400/20" />
            </div>

            {/* HUD coordinate text */}
            <span className="absolute bottom-[-16px] left-0 text-[7px] font-mono text-cyan-400/25 tracking-widest">X:042.7 Y:118.3</span>
            <span className="absolute top-[-16px] right-0 text-[7px] font-mono text-cyan-400/25 tracking-widest">LOCK</span>
          </div>

          {/* === Floating waveform / signal graphics === */}
          {/* Sine wave - signal monitor */}
          <svg className="absolute bottom-[22%] left-[8%] w-32 h-10" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 2.8s both', opacity: 0 }}>
            <path d="M0,20 Q8,5 16,20 T32,20 T48,20 T64,20 T80,20 T96,20 T112,20 T128,20" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" className="hero-wave-anim" />
            <text x="0" y="38" fill="rgba(56,189,248,0.25)" fontSize="6" fontFamily="monospace">SIGNAL·OK</text>
          </svg>

          {/* Square wave - digital signal */}
          <svg className="absolute top-[12%] left-[35%] w-24 h-8" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 3.2s both', opacity: 0 }}>
            <path d="M0,6 L6,6 L6,2 L12,2 L12,6 L18,6 L18,2 L24,2 L24,6 L30,6 L30,2 L36,2 L36,6 L42,6 L42,2 L48,2 L48,6 L54,6 L54,2 L60,2 L60,6" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.6" className="hero-wave-anim" />
          </svg>

          {/* Mini circuit schematic */}
          <svg className="absolute bottom-[38%] right-[6%] w-20 h-16" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 3.5s both', opacity: 0 }}>
            {/* Resistor symbol */}
            <path d="M0,8 L4,8 L5,4 L7,12 L9,4 L11,12 L13,4 L15,12 L16,8 L20,8" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="0.6" />
            {/* Capacitor symbol */}
            <line x1="6" y1="14" x2="6" y2="22" stroke="rgba(34,211,238,0.25)" strokeWidth="0.6" />
            <line x1="3" y1="22" x2="9" y2="22" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" />
            <line x1="3" y1="24" x2="9" y2="24" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" />
            <line x1="6" y1="24" x2="6" y2="32" stroke="rgba(34,211,238,0.25)" strokeWidth="0.6" />
            {/* GND symbol */}
            <line x1="3" y1="32" x2="9" y2="32" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
            <line x1="4.5" y1="34" x2="7.5" y2="34" stroke="rgba(34,211,238,0.15)" strokeWidth="0.5" />
            <line x1="5.5" y1="36" x2="6.5" y2="36" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5" />
          </svg>

          {/* Floating frequency spectrum bars */}
          <div className="absolute top-[68%] left-[12%] flex items-end gap-[2px]" style={{ animation: 'heroLabelFadeIn 0.8s ease-out 3.8s both', opacity: 0 }}>
            {[8, 14, 6, 18, 10, 16, 4, 12, 20, 8, 15, 6, 11, 17, 7].map((h, i) => (
              <div
                key={i}
                className="w-[2px] bg-cyan-400/20 rounded-sm"
                style={{
                  height: `${h}px`,
                  animation: `heroSpectrumBar ${1.5 + (i % 3) * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
            <span className="ml-1 text-[6px] font-mono text-cyan-400/20 self-end">5.8G</span>
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
        .hero-chip-pulse {
          animation: heroChipPulse 3s ease-in-out infinite;
        }
        @keyframes heroChipPulse {
          0%, 100% { opacity: 0.04; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.1); }
        }
        .hero-arc-flash {
          animation: heroArcFlash 4s ease-in-out infinite;
        }
        @keyframes heroArcFlash {
          0%, 90%, 100% { opacity: 0; transform: scale(0.5); }
          92% { opacity: 0.8; transform: scale(1.5); }
          95% { opacity: 0; transform: scale(0.8); }
          97% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};
