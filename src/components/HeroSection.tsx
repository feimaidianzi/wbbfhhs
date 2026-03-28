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

          {/* === Electric current flow on PCB traces === */}
          <svg className="absolute top-[15%] left-[5%] w-[90%] h-[70%] overflow-visible" style={{ opacity: 0.35 }}>
            <defs>
              {/* Electric current glow filter */}
              <filter id="currentGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* IC chip glow filter */}
              <filter id="icGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Radial gradient for IC glow */}
              <radialGradient id="icRadialGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56,189,248,0.6)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.15)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0)" />
              </radialGradient>
              <radialGradient id="icRadialGlow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.5)" />
                <stop offset="50%" stopColor="rgba(34,211,238,0.12)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </radialGradient>
              <radialGradient id="icRadialGlow3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(74,222,128,0.4)" />
                <stop offset="50%" stopColor="rgba(74,222,128,0.1)" />
                <stop offset="100%" stopColor="rgba(74,222,128,0)" />
              </radialGradient>
            </defs>

            {/* === PCB Trace current flows === */}
            {/* Main horizontal trace - top */}
            <path d="M 40,50 L 180,50 Q 200,50 200,70 L 200,100 Q 200,120 220,120 L 400,120 Q 420,120 420,100 L 420,80 Q 420,60 440,60 L 620,60" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
            <path d="M 40,50 L 180,50 Q 200,50 200,70 L 200,100 Q 200,120 220,120 L 400,120 Q 420,120 420,100 L 420,80 Q 420,60 440,60 L 620,60" fill="none" stroke="rgba(56,189,248,0.6)" strokeWidth="1.5" strokeDasharray="8 30" className="hero-current-flow" filter="url(#currentGlow)" />
            {/* Current dot on main trace */}
            <circle r="2.5" fill="rgba(56,189,248,0.9)" filter="url(#currentGlow)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 40,50 L 180,50 Q 200,50 200,70 L 200,100 Q 200,120 220,120 L 400,120 Q 420,120 420,100 L 420,80 Q 420,60 440,60 L 620,60" />
            </circle>

            {/* Secondary trace - bottom diagonal */}
            <path d="M 80,220 L 160,220 Q 180,220 180,200 L 180,170 Q 180,150 200,150 L 350,150 Q 370,150 370,170 L 370,200 Q 370,220 390,220 L 550,220" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="1" />
            <path d="M 80,220 L 160,220 Q 180,220 180,200 L 180,170 Q 180,150 200,150 L 350,150 Q 370,150 370,170 L 370,200 Q 370,220 390,220 L 550,220" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" strokeDasharray="6 25" className="hero-current-flow-reverse" filter="url(#currentGlow)" />
            <circle r="2" fill="rgba(34,211,238,0.85)" filter="url(#currentGlow)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 80,220 L 160,220 Q 180,220 180,200 L 180,170 Q 180,150 200,150 L 350,150 Q 370,150 370,170 L 370,200 Q 370,220 390,220 L 550,220" />
            </circle>

            {/* Third trace - vertical power rail */}
            <path d="M 300,20 L 300,80 Q 300,100 320,100 L 380,100 Q 400,100 400,120 L 400,260" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="0.8" />
            <path d="M 300,20 L 300,80 Q 300,100 320,100 L 380,100 Q 400,100 400,120 L 400,260" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1.2" strokeDasharray="5 20" className="hero-current-flow" filter="url(#currentGlow)" />
            <circle r="2" fill="rgba(56,189,248,0.8)" filter="url(#currentGlow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 300,20 L 300,80 Q 300,100 320,100 L 380,100 Q 400,100 400,120 L 400,260" />
            </circle>

            {/* Fourth trace - short branch */}
            <path d="M 150,140 L 250,140 L 250,180 L 320,180" fill="none" stroke="rgba(74,222,128,0.1)" strokeWidth="0.8" />
            <path d="M 150,140 L 250,140 L 250,180 L 320,180" fill="none" stroke="rgba(74,222,128,0.45)" strokeWidth="1" strokeDasharray="4 18" className="hero-current-flow-reverse" filter="url(#currentGlow)" />
            <circle r="1.5" fill="rgba(74,222,128,0.8)" filter="url(#currentGlow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 150,140 L 250,140 L 250,180 L 320,180" />
            </circle>

            {/* === IC Chip glow effects === */}
            {/* Main MCU chip glow - center-left area */}
            <ellipse cx="240" cy="130" rx="35" ry="25" fill="url(#icRadialGlow1)" className="hero-ic-pulse" />
            <rect x="218" y="112" width="44" height="36" rx="2" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" className="hero-ic-border-pulse" />
            {/* IC pin glow dots - top */}
            {[224, 232, 240, 248, 256].map((x, i) => (
              <circle key={`ic1-top-${i}`} cx={x} cy="112" r="1" fill="rgba(56,189,248,0.5)" className="hero-ic-pin-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
            {/* IC pin glow dots - bottom */}
            {[224, 232, 240, 248, 256].map((x, i) => (
              <circle key={`ic1-bot-${i}`} cx={x} cy="148" r="1" fill="rgba(56,189,248,0.5)" className="hero-ic-pin-pulse" style={{ animationDelay: `${(i + 5) * 0.15}s` }} />
            ))}

            {/* Secondary IC chip - RF module area */}
            <ellipse cx="480" cy="90" rx="28" ry="20" fill="url(#icRadialGlow2)" className="hero-ic-pulse-slow" />
            <rect x="462" y="76" width="36" height="28" rx="2" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="0.5" className="hero-ic-border-pulse" />
            {/* IC pin glow dots */}
            {[468, 474, 480, 486, 492].map((x, i) => (
              <circle key={`ic2-top-${i}`} cx={x} cy="76" r="0.8" fill="rgba(34,211,238,0.45)" className="hero-ic-pin-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}

            {/* Third IC chip - power management area */}
            <ellipse cx="350" cy="210" rx="22" ry="16" fill="url(#icRadialGlow3)" className="hero-ic-pulse" />
            <rect x="335" y="198" width="30" height="24" rx="1.5" fill="none" stroke="rgba(74,222,128,0.15)" strokeWidth="0.5" className="hero-ic-border-pulse" />

            {/* IC internal activity - flickering micro-dots inside main chip */}
            {[
              { cx: 230, cy: 122, d: '0s' }, { cx: 238, cy: 126, d: '0.3s' }, { cx: 246, cy: 120, d: '0.6s' },
              { cx: 234, cy: 134, d: '0.9s' }, { cx: 250, cy: 130, d: '1.2s' }, { cx: 242, cy: 138, d: '0.4s' },
            ].map((dot, i) => (
              <circle key={`ic-inner-${i}`} cx={dot.cx} cy={dot.cy} r="0.8" fill="rgba(56,189,248,0.7)" className="hero-ic-activity" style={{ animationDelay: dot.d }} />
            ))}

            {/* Connection sparks at trace junctions */}
            <circle cx="200" cy="100" r="3" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5" className="hero-junction-spark" />
            <circle cx="370" cy="170" r="3" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" className="hero-junction-spark" style={{ animationDelay: '1s' }} />
            <circle cx="400" cy="120" r="3" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="0.5" className="hero-junction-spark" style={{ animationDelay: '2s' }} />
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
        /* Electric current flow animations */
        .hero-current-flow {
          animation: heroCurrentDash 2s linear infinite;
        }
        .hero-current-flow-reverse {
          animation: heroCurrentDash 2.5s linear infinite reverse;
        }
        @keyframes heroCurrentDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -38; }
        }
        /* IC chip glow pulse */
        .hero-ic-pulse {
          animation: heroICPulse 3s ease-in-out infinite;
        }
        .hero-ic-pulse-slow {
          animation: heroICPulse 4.5s ease-in-out infinite;
        }
        @keyframes heroICPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .hero-ic-border-pulse {
          animation: heroICBorder 3s ease-in-out infinite;
        }
        @keyframes heroICBorder {
          0%, 100% { stroke-opacity: 0.15; }
          50% { stroke-opacity: 0.4; }
        }
        .hero-ic-pin-pulse {
          animation: heroICPin 2s ease-in-out infinite;
        }
        @keyframes heroICPin {
          0%, 100% { opacity: 0.3; r: 0.8; }
          50% { opacity: 0.8; r: 1.5; }
        }
        .hero-ic-activity {
          animation: heroICActivity 0.8s ease-in-out infinite alternate;
        }
        @keyframes heroICActivity {
          0% { opacity: 0.1; }
          100% { opacity: 0.8; }
        }
        .hero-junction-spark {
          animation: heroJunctionSpark 3s ease-in-out infinite;
        }
        @keyframes heroJunctionSpark {
          0%, 80%, 100% { r: 2; opacity: 0.1; }
          85% { r: 5; opacity: 0.6; }
          90% { r: 3; opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};
