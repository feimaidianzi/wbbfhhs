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

      {/* === Large background circuit board pattern === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
        <svg className="absolute w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {/* Main horizontal traces */}
          <path d="M0,120 H300 L320,140 H500 L520,120 H800 L830,150 H1200" fill="none" stroke="rgba(56,189,248,0.6)" strokeWidth="1.2" className="hero-circuit-dash" />
          <path d="M0,280 H200 L220,260 H450 L470,280 H700 L720,300 H1200" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="1" className="hero-circuit-dash-slow" />
          <path d="M0,500 H150 L170,480 H400 L420,500 H650 L680,520 H1200" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="0.8" className="hero-circuit-dash" />
          <path d="M0,650 H250 L270,630 H550 L570,650 H900 L920,670 H1200" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="0.8" className="hero-circuit-dash-slow" />
          {/* Vertical traces */}
          <path d="M300,0 V200 L280,220 V400 L300,420 V600 L280,620 V800" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" className="hero-circuit-dash" />
          <path d="M700,0 V150 L720,170 V350 L700,370 V550 L720,570 V800" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" className="hero-circuit-dash-slow" />
          <path d="M1000,0 V180 L980,200 V420 L1000,440 V800" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="0.6" className="hero-circuit-dash" />
          {/* Junction pads */}
          {[[300,120],[500,140],[800,120],[200,280],[450,260],[700,280],[300,200],[700,350],[150,500],[400,480],[650,500],[1000,440]].map(([cx,cy], i) => (
            <g key={`pad-${i}`}>
              <circle cx={cx} cy={cy} r="4" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="0.8" />
              <circle cx={cx} cy={cy} r="1.5" fill="rgba(56,189,248,0.5)" />
            </g>
          ))}
          {/* IC chip outlines */}
          <rect x="180" y="350" width="60" height="40" rx="3" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
          <rect x="850" y="200" width="50" height="35" rx="3" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" />
          <rect x="550" y="550" width="70" height="45" rx="3" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="0.6" />
          {/* IC pins */}
          {[0,1,2,3,4].map(i => (
            <g key={`pin-${i}`}>
              <line x1={185 + i*10} y1="350" x2={185 + i*10} y2="342" stroke="rgba(56,189,248,0.3)" strokeWidth="0.6" />
              <line x1={185 + i*10} y1="390" x2={185 + i*10} y2="398" stroke="rgba(56,189,248,0.3)" strokeWidth="0.6" />
            </g>
          ))}
        </svg>
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
          
          {/* Product image with on-board current flow effects */}
          <div className="hero-image-breathe relative">
            <img
              src={heroPcbBoard}
              alt="CANI industrial drone PCBA circuit board with golden IPEX connectors"
              className="relative w-[70%] max-w-[600px] object-contain hero-animate-image drop-shadow-2xl"
              style={{
                filter: 'brightness(1.1) contrast(1.08)',
              }}
            />
            
            {/* === On-board current flow light effects === */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet" style={{ left: '15%', width: '70%' }}>
              {/* Main current flow path 1 - horizontal through center */}
              <path d="M80,200 L150,200 L170,180 L250,180 L270,200 L350,200 L380,220 L450,220 L480,200 L530,200" 
                fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1.5" strokeLinecap="round" />
              <circle r="4" fill="rgba(56,189,248,0.9)" className="hero-current-glow">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M80,200 L150,200 L170,180 L250,180 L270,200 L350,200 L380,220 L450,220 L480,200 L530,200" />
              </circle>
              <circle r="8" fill="rgba(56,189,248,0.2)" className="hero-current-glow">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M80,200 L150,200 L170,180 L250,180 L270,200 L350,200 L380,220 L450,220 L480,200 L530,200" />
              </circle>

              {/* Current flow path 2 - diagonal */}
              <path d="M120,120 L180,120 L200,150 L280,150 L300,130 L380,130 L400,160 L460,160" 
                fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="1.2" strokeLinecap="round" />
              <circle r="3" fill="rgba(34,211,238,0.85)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M120,120 L180,120 L200,150 L280,150 L300,130 L380,130 L400,160 L460,160" />
              </circle>
              <circle r="6" fill="rgba(34,211,238,0.15)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M120,120 L180,120 L200,150 L280,150 L300,130 L380,130 L400,160 L460,160" />
              </circle>

              {/* Current flow path 3 - lower section */}
              <path d="M100,300 L200,300 L220,280 L320,280 L340,300 L430,300 L460,320 L520,320" 
                fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1" strokeLinecap="round" />
              <circle r="3.5" fill="rgba(56,189,248,0.8)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M100,300 L200,300 L220,280 L320,280 L340,300 L430,300 L460,320 L520,320" />
              </circle>
              <circle r="7" fill="rgba(56,189,248,0.15)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M100,300 L200,300 L220,280 L320,280 L340,300 L430,300 L460,320 L520,320" />
              </circle>

              {/* Current flow path 4 - vertical power line */}
              <path d="M300,80 L300,140 L280,160 L280,240 L300,260 L300,340 L280,360 L280,420" 
                fill="none" stroke="rgba(250,204,21,0.1)" strokeWidth="1" strokeLinecap="round" />
              <circle r="3" fill="rgba(250,204,21,0.7)">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M300,80 L300,140 L280,160 L280,240 L300,260 L300,340 L280,360 L280,420" />
              </circle>
              <circle r="6" fill="rgba(250,204,21,0.12)">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M300,80 L300,140 L280,160 L280,240 L300,260 L300,340 L280,360 L280,420" />
              </circle>

              {/* Current flow path 5 - secondary horizontal */}
              <path d="M60,250 L140,250 L160,230 L240,230 L260,250 L340,250" 
                fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="0.8" strokeLinecap="round" />
              <circle r="2.5" fill="rgba(34,211,238,0.75)">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M60,250 L140,250 L160,230 L240,230 L260,250 L340,250" />
              </circle>

              {/* Glowing junction nodes on the board */}
              {[[150,200],[270,200],[380,220],[200,150],[300,130],[220,280],[340,300],[300,160],[300,260],[280,240]].map(([cx,cy], i) => (
                <circle key={`node-${i}`} cx={cx} cy={cy} r="2" fill="rgba(56,189,248,0.5)" className="hero-node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}

              {/* Spark/photoelectric points */}
              {[[180,185],[350,205],[430,225],[300,140],[280,300],[460,165]].map(([cx,cy], i) => (
                <g key={`spark-${i}`} style={{ animation: `heroSparkFlash ${1.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                  <circle cx={cx} cy={cy} r="1.5" fill="rgba(255,255,255,0.9)" />
                  <circle cx={cx} cy={cy} r="4" fill="rgba(56,189,248,0.3)" />
                  <circle cx={cx} cy={cy} r="8" fill="rgba(56,189,248,0.08)" />
                </g>
              ))}
            </svg>
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
        .hero-node-pulse {
          animation: heroNodePulse 2s ease-in-out infinite;
        }
        @keyframes heroNodePulse {
          0%, 100% { opacity: 0.3; r: 2; }
          50% { opacity: 0.8; r: 3.5; }
        }
        .hero-current-glow {
          filter: drop-shadow(0 0 4px rgba(56,189,248,0.6));
        }
        @keyframes heroSparkFlash {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};
