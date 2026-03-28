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

      {/* === Full-screen flowing current lines (left side included) === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bgFlowGrad1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="900">
              <stop offset="0%" stopColor="rgba(56,189,248,0)" />
              <stop offset="35%" stopColor="rgba(56,189,248,0.9)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="65%" stopColor="rgba(56,189,248,0.9)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </linearGradient>
            <linearGradient id="bgFlowGrad2" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="900">
              <stop offset="0%" stopColor="rgba(34,211,238,0)" />
              <stop offset="35%" stopColor="rgba(34,211,238,0.85)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="65%" stopColor="rgba(34,211,238,0.85)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0)" />
            </linearGradient>
            <linearGradient id="bgFlowGrad3" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="900">
              <stop offset="0%" stopColor="rgba(250,204,21,0)" />
              <stop offset="35%" stopColor="rgba(250,204,21,0.7)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="65%" stopColor="rgba(250,204,21,0.7)" />
              <stop offset="100%" stopColor="rgba(250,204,21,0)" />
            </linearGradient>
            <filter id="bgGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Left area flow lines */}
          <path d="M200,0 L200,80 L190,120 L190,250 L200,290 L200,450 L190,490 L190,650 L200,690 L200,900" 
            fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1.5" />
          <path d="M200,0 L200,80 L190,120 L190,250 L200,290 L200,450 L190,490 L190,650 L200,690 L200,900" 
            fill="none" stroke="url(#bgFlowGrad1)" strokeWidth="4" strokeLinecap="round" filter="url(#bgGlow)"
            strokeDasharray="80 820" className="hero-flow-line-bg-1" />

          <path d="M350,0 L350,100 L340,150 L340,300 L350,350 L350,500 L340,550 L340,700 L350,750 L350,900" 
            fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="1" />
          <path d="M350,0 L350,100 L340,150 L340,300 L350,350 L350,500 L340,550 L340,700 L350,750 L350,900" 
            fill="none" stroke="url(#bgFlowGrad2)" strokeWidth="3.5" strokeLinecap="round" filter="url(#bgGlow)"
            strokeDasharray="70 830" className="hero-flow-line-bg-2" />

          <path d="M500,0 L500,90 L490,140 L490,280 L500,320 L500,470 L490,520 L490,660 L500,710 L500,900" 
            fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1" />
          <path d="M500,0 L500,90 L490,140 L490,280 L500,320 L500,470 L490,520 L490,660 L500,710 L500,900" 
            fill="none" stroke="url(#bgFlowGrad1)" strokeWidth="3" strokeLinecap="round" filter="url(#bgGlow)"
            strokeDasharray="60 840" className="hero-flow-line-bg-3" />

          {/* Center-left diagonal */}
          <path d="M280,0 L290,120 L275,240 L290,360 L275,480 L290,600 L275,720 L285,900" 
            fill="none" stroke="rgba(250,204,21,0.06)" strokeWidth="1" />
          <path d="M280,0 L290,120 L275,240 L290,360 L275,480 L290,600 L275,720 L285,900" 
            fill="none" stroke="url(#bgFlowGrad3)" strokeWidth="2.5" strokeLinecap="round" filter="url(#bgGlow)"
            strokeDasharray="55 845" className="hero-flow-line-bg-4" />

          {/* Right area flow lines */}
          <path d="M900,0 L900,100 L910,160 L910,320 L900,380 L900,550 L910,610 L910,780 L900,840 L900,900" 
            fill="none" stroke="rgba(34,211,238,0.06)" strokeWidth="1" />
          <path d="M900,0 L900,100 L910,160 L910,320 L900,380 L900,550 L910,610 L910,780 L900,840 L900,900" 
            fill="none" stroke="url(#bgFlowGrad2)" strokeWidth="2.5" strokeLinecap="round" filter="url(#bgGlow)"
            strokeDasharray="65 835" className="hero-flow-line-bg-5" />

          {/* Junction sparks on left */}
          {[[200,120],[190,290],[350,150],[340,350],[500,140],[490,320],[280,240],[290,360]].map(([cx,cy], i) => (
            <circle key={`bg-node-${i}`} cx={cx} cy={cy} r="3" fill="rgba(56,189,248,0.6)" className="hero-node-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </svg>
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
            
            {/* === On-board flowing current lines (top to bottom) === */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet" style={{ left: '15%', width: '70%' }}>
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
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="currentGlowStrong">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Flow line 1 - left of center */}
              <path d="M270,0 L270,60 L265,100 L265,180 L270,210 L270,300 L265,340 L265,420 L270,500" 
                fill="none" stroke="rgba(56,189,248,0.12)" strokeWidth="1.5" />
              <path d="M270,0 L270,60 L265,100 L265,180 L270,210 L270,300 L265,340 L265,420 L270,500" 
                fill="none" stroke="url(#flowGrad1)" strokeWidth="4" strokeLinecap="round" filter="url(#currentGlowStrong)"
                strokeDasharray="80 420" className="hero-flow-line-1" />

              {/* Flow line 2 - dead center (brightest) */}
              <path d="M300,0 L300,70 L295,110 L295,190 L300,220 L300,310 L305,350 L305,430 L300,500" 
                fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="1.5" />
              <path d="M300,0 L300,70 L295,110 L295,190 L300,220 L300,310 L305,350 L305,430 L300,500" 
                fill="none" stroke="url(#flowGrad2)" strokeWidth="5" strokeLinecap="round" filter="url(#currentGlowStrong)"
                strokeDasharray="90 430" className="hero-flow-line-2" />

              {/* Flow line 3 - right of center */}
              <path d="M330,0 L330,55 L335,90 L335,175 L330,205 L330,295 L335,330 L335,415 L330,500" 
                fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1.5" />
              <path d="M330,0 L330,55 L335,90 L335,175 L330,205 L330,295 L335,330 L335,415 L330,500" 
                fill="none" stroke="url(#flowGrad1)" strokeWidth="3.5" strokeLinecap="round" filter="url(#currentGlow)"
                strokeDasharray="70 400" className="hero-flow-line-3" />

              {/* Flow line 4 - slightly left zigzag */}
              <path d="M285,0 L288,70 L282,140 L288,210 L282,280 L288,350 L282,420 L285,500" 
                fill="none" stroke="rgba(250,204,21,0.08)" strokeWidth="1" />
              <path d="M285,0 L288,70 L282,140 L288,210 L282,280 L288,350 L282,420 L285,500" 
                fill="none" stroke="url(#flowGrad3)" strokeWidth="3" strokeLinecap="round" filter="url(#currentGlow)"
                strokeDasharray="60 380" className="hero-flow-line-4" />

              {/* Flow line 5 - slightly right zigzag */}
              <path d="M315,0 L312,80 L318,150 L312,220 L318,290 L312,360 L318,430 L315,500" 
                fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="1" />
              <path d="M315,0 L312,80 L318,150 L312,220 L318,290 L312,360 L318,430 L315,500" 
                fill="none" stroke="url(#flowGrad2)" strokeWidth="2.5" strokeLinecap="round" filter="url(#currentGlow)"
                strokeDasharray="55 380" className="hero-flow-line-5" />

              {/* Glowing junction nodes - tightly centered */}
              {[[270,100],[265,210],[300,110],[295,220],[300,310],[330,90],[335,205],[330,295],[285,140],[315,150]].map(([cx,cy], i) => (
                <circle key={`node-${i}`} cx={cx} cy={cy} r="3" fill="rgba(56,189,248,0.7)" className="hero-node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}

              {/* Spark/photoelectric points - tightly centered */}
              {[[265,180],[300,190],[335,175],[288,210],[312,220],[300,310]].map(([cx,cy], i) => (
                <g key={`spark-${i}`} style={{ animation: `heroSparkFlash ${1.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                  <circle cx={cx} cy={cy} r="2" fill="rgba(255,255,255,1)" />
                  <circle cx={cx} cy={cy} r="6" fill="rgba(56,189,248,0.5)" />
                  <circle cx={cx} cy={cy} r="12" fill="rgba(56,189,248,0.1)" />
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
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes heroSparkFlash {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 1; }
        }
        /* Background full-screen flow lines */
        .hero-flow-line-bg-1 { animation: heroFlowDownBg 3s linear infinite; }
        .hero-flow-line-bg-2 { animation: heroFlowDownBg 3.5s linear infinite; animation-delay: 0.6s; }
        .hero-flow-line-bg-3 { animation: heroFlowDownBg 2.8s linear infinite; animation-delay: 1.2s; }
        .hero-flow-line-bg-4 { animation: heroFlowDownBg 4s linear infinite; animation-delay: 0.3s; }
        .hero-flow-line-bg-5 { animation: heroFlowDownBg 3.2s linear infinite; animation-delay: 0.9s; }
        @keyframes heroFlowDownBg {
          0% { stroke-dashoffset: 900; }
          100% { stroke-dashoffset: 0; }
        }
        .hero-flow-line-1 { animation: heroFlowDown1 2.5s linear infinite; }
        .hero-flow-line-2 { animation: heroFlowDown2 3s linear infinite; animation-delay: 0.5s; }
        .hero-flow-line-3 { animation: heroFlowDown3 2.8s linear infinite; animation-delay: 1s; }
        .hero-flow-line-4 { animation: heroFlowDown4 3.5s linear infinite; animation-delay: 0.3s; }
        .hero-flow-line-5 { animation: heroFlowDown5 2.2s linear infinite; animation-delay: 0.8s; }
        @keyframes heroFlowDown1 {
          0% { stroke-dashoffset: 500; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes heroFlowDown2 {
          0% { stroke-dashoffset: 520; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes heroFlowDown3 {
          0% { stroke-dashoffset: 450; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes heroFlowDown4 {
          0% { stroke-dashoffset: 425; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes heroFlowDown5 {
          0% { stroke-dashoffset: 420; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};
