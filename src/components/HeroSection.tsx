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
            
            {/* === On-board flowing current lines - spread across board, avoid edges === */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet" style={{ left: '2%', width: '70%' }}>
              {/* Mask to fade out edges (transparent border effect) */}
              <defs>
                <radialGradient id="edgeMask" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="60%" stopColor="white" stopOpacity="1" />
                  <stop offset="85%" stopColor="white" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="boardMask">
                  <ellipse cx="300" cy="250" rx="260" ry="220" fill="url(#edgeMask)" />
                </mask>
              </defs>
              <defs>
                <linearGradient id="flowGrad1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="500">
                  <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                  <stop offset="35%" stopColor="rgba(56,189,248,1)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="65%" stopColor="rgba(56,189,248,1)" />
                  <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                </linearGradient>
                <linearGradient id="flowGrad2" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="500">
                  <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                  <stop offset="35%" stopColor="rgba(34,211,238,1)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="65%" stopColor="rgba(34,211,238,1)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                </linearGradient>
                <linearGradient id="flowGrad3" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="500">
                  <stop offset="0%" stopColor="rgba(250,204,21,0)" />
                  <stop offset="35%" stopColor="rgba(250,204,21,0.9)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="65%" stopColor="rgba(250,204,21,0.9)" />
                  <stop offset="100%" stopColor="rgba(250,204,21,0)" />
                </linearGradient>
                <filter id="currentGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="currentGlowStrong">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <g mask="url(#boardMask)">
                {/* Flow line 1 - far left, curves inward toward bottom */}
                <path d="M120,30 L125,80 L135,150 L150,220 L170,290 L195,360 L225,430 L260,500" 
                  fill="none" stroke="url(#flowGrad1)" strokeWidth="3.5" strokeLinecap="round" filter="url(#currentGlowStrong)"
                  strokeDasharray="80 420" className="hero-flow-line-1" />

                {/* Flow line 3 - left-center */}
                <path d="M230,0 L228,65 L232,130 L228,200 L232,270 L230,340 L228,410 L230,500" 
                  fill="none" stroke="url(#flowGrad1)" strokeWidth="4" strokeLinecap="round" filter="url(#currentGlowStrong)"
                  strokeDasharray="85 430" className="hero-flow-line-3" />

                {/* Flow line 4 - center (brightest) */}
                <path d="M300,0 L298,70 L302,140 L298,210 L302,280 L300,350 L298,420 L300,500" 
                  fill="none" stroke="url(#flowGrad2)" strokeWidth="5" strokeLinecap="round" filter="url(#currentGlowStrong)"
                  strokeDasharray="90 430" className="hero-flow-line-4" />

                {/* Flow line 5 - right-center */}
                <path d="M370,0 L372,65 L368,130 L372,200 L368,270 L370,340 L372,410 L370,500" 
                  fill="none" stroke="url(#flowGrad1)" strokeWidth="4" strokeLinecap="round" filter="url(#currentGlowStrong)"
                  strokeDasharray="80 420" className="hero-flow-line-5" />

                {/* Flow line 7 - far right, curves inward toward bottom */}
                <path d="M480,30 L475,80 L465,150 L450,220 L430,290 L405,360 L375,430 L340,500" 
                  fill="none" stroke="url(#flowGrad1)" strokeWidth="3.5" strokeLinecap="round" filter="url(#currentGlowStrong)"
                  strokeDasharray="80 420" className="hero-flow-line-7" />

                {/* Glowing junction nodes - reduced */}
                {[[170,140],[300,140],[430,140],[300,280],[180,350],[300,350],[420,350]].map(([cx,cy], i) => (
                  <circle key={`node-${i}`} cx={cx} cy={cy} r="2.5" fill="rgba(56,189,248,0.7)" className="hero-node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                ))}

                {/* Spark/photoelectric points - reduced to 4 */}
                {[[172,210],[300,210],[428,210],[300,350]].map(([cx,cy], i) => (
                  <g key={`spark-${i}`} style={{ animation: `heroSparkFlash ${1.8 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                    <circle cx={cx} cy={cy} r="2" fill="rgba(255,255,255,1)" />
                    <circle cx={cx} cy={cy} r="6" fill="rgba(56,189,248,0.5)" />
                  </g>
                ))}
              </g>
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
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes heroSparkFlash {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 1; }
        }
        /* Flowing current lines - top to bottom, spread across board */
        .hero-flow-line-1 { animation: heroFlowDown1 3.5s linear infinite; }
        .hero-flow-line-2 { animation: heroFlowDown2 2.8s linear infinite; animation-delay: 0.3s; }
        .hero-flow-line-3 { animation: heroFlowDown3 2.5s linear infinite; animation-delay: 0.7s; }
        .hero-flow-line-4 { animation: heroFlowDown4 3s linear infinite; animation-delay: 0.5s; }
        .hero-flow-line-5 { animation: heroFlowDown5 2.6s linear infinite; animation-delay: 0.9s; }
        .hero-flow-line-6 { animation: heroFlowDown6 2.8s linear infinite; animation-delay: 0.2s; }
        .hero-flow-line-7 { animation: heroFlowDown7 3.5s linear infinite; animation-delay: 1.1s; }
        .hero-flow-line-8 { animation: heroFlowDown8 3.2s linear infinite; animation-delay: 0.6s; }
        .hero-flow-line-9 { animation: heroFlowDown9 2.9s linear infinite; animation-delay: 0.8s; }
        @keyframes heroFlowDown1 { 0% { stroke-dashoffset: 550; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown2 { 0% { stroke-dashoffset: 500; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown3 { 0% { stroke-dashoffset: 520; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown4 { 0% { stroke-dashoffset: 530; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown5 { 0% { stroke-dashoffset: 520; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown6 { 0% { stroke-dashoffset: 500; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown7 { 0% { stroke-dashoffset: 550; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown8 { 0% { stroke-dashoffset: 480; } 100% { stroke-dashoffset: 0; } }
        @keyframes heroFlowDown9 { 0% { stroke-dashoffset: 490; } 100% { stroke-dashoffset: 0; } }
      `}</style>
    </section>
  );
};
