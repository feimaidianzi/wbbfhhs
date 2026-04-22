// Pure CSS wave transition — zero JS animation cost.
// Replaces previous framer-motion implementation to keep ~50KB off the
// homepage's eager bundle (framer-motion is now LazyMotion-loaded elsewhere).
export const WaveTransition = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none z-[1]">
      {/* Layer 1 — dark tech */}
      <svg
        className="wave-layer wave-layer-1 absolute bottom-10 left-0 h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C120,80 240,40 360,60 C480,80 600,40 720,60 C840,80 960,40 1080,60 C1200,80 1320,40 1440,60 L1440,100 L0,100 Z"
          fill="hsl(220, 13%, 15%)"
          fillOpacity="0.6"
        />
      </svg>

      {/* Layer 2 — middle tech */}
      <svg
        className="wave-layer wave-layer-2 absolute bottom-5 left-0 h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,45 C160,65 320,25 480,45 C640,65 800,25 960,45 C1120,65 1280,25 1440,45 L1440,80 L0,80 Z"
          fill="hsl(220, 13%, 12%)"
          fillOpacity="0.8"
        />
      </svg>

      {/* Layer 3 — blends with background */}
      <svg
        className="wave-layer wave-layer-3 absolute bottom-0 left-0 h-16"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,35 C90,50 180,20 270,35 C360,50 450,20 540,35 C630,50 720,20 810,35 C900,50 990,20 1080,35 C1170,50 1260,20 1350,35 C1440,50 1440,35 1440,35 L1440,60 L0,60 Z"
          className="fill-background"
        />
      </svg>

      {/* Solid bottom band ensures seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-background" />
    </div>
  );
};
