import { motion } from "framer-motion";

export const WaveTransition = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none z-[1]">
      {/* 第一层波浪 - 深色层 (周期=1440, 完美循环) */}
      <motion.svg
        className="absolute bottom-8 left-0 w-[200%] h-20"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        animate={{ x: [0, -1440] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,50 C360,80 720,20 1080,50 C1440,80 1440,80 1440,50 C1800,80 2160,20 2520,50 C2880,80 2880,80 2880,50 L2880,100 L0,100 Z"
          fill="hsl(var(--muted))"
          fillOpacity="0.4"
        />
      </motion.svg>

      {/* 第二层波浪 - 中间层 (周期=1440, 完美循环) */}
      <motion.svg
        className="absolute bottom-4 left-0 w-[200%] h-16"
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
        animate={{ x: [-1440, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,40 C240,60 480,20 720,40 C960,60 1200,20 1440,40 C1680,60 1920,20 2160,40 C2400,60 2640,20 2880,40 L2880,80 L0,80 Z"
          fill="hsl(var(--muted))"
          fillOpacity="0.6"
        />
      </motion.svg>

      {/* 第三层波浪 - 与背景融合 (周期=1440, 完美循环) */}
      <motion.svg
        className="absolute bottom-0 left-0 w-[200%] h-12"
        viewBox="0 0 2880 60"
        preserveAspectRatio="none"
        animate={{ x: [0, -1440] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,30 C180,50 360,10 540,30 C720,50 900,10 1080,30 C1260,50 1440,10 1440,30 C1620,50 1800,10 1980,30 C2160,50 2340,10 2520,30 C2700,50 2880,10 2880,30 L2880,60 L0,60 Z"
          className="fill-background"
        />
      </motion.svg>

      {/* 底部实色确保完全无缝 */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-background" />
    </div>
  );
};
