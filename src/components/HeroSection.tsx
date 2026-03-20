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

      {/* Right-side hero product image */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Blue ambient glow behind image */}
          <div className="absolute w-[70%] h-[60%] bg-blue-500/[0.06] blur-[100px] rounded-full" />
          <img
            src={heroPcbBoard}
            alt="CANI industrial drone PCBA circuit board with golden IPEX connectors"
            className="relative w-[85%] max-w-[800px] object-contain hero-animate-image opacity-90"
            style={{
              filter: 'brightness(1.05) contrast(1.05)',
              maskImage: 'linear-gradient(to left, black 60%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 98%)',
            }}
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
        </div>
      </div>

      {/* Content */}
      <HeroContent />

      {/* Wave transition */}
      <WaveTransition />
    </section>
  );
};
