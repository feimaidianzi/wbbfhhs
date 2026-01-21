import { motion } from "framer-motion";

export const WaveTransition = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none z-[1]">
      {/* 第一层波浪 - 浅白色层 */}
      <motion.svg
        className="absolute bottom-8 left-0 w-[200%] h-20"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        animate={{ x: [0, -1440] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,50 C360,80 720,20 1080,50 C1440,80 1800,20 2160,50 C2520,80 2880,20 2880,50 L2880,100 L0,100 Z"
          fill="hsl(0, 0%, 100%)"
          fillOpacity="0.4"
        />
      </motion.svg>

      {/* 第二层波浪 - 中间白色层 */}
      <motion.svg
        className="absolute bottom-4 left-0 w-[200%] h-16"
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
        animate={{ x: [-1440, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,40 C240,60 480,20 720,40 C960,60 1200,20 1440,40 C1680,60 1920,20 2160,40 C2400,60 2640,20 2880,40 L2880,80 L0,80 Z"
          fill="hsl(0, 0%, 100%)"
          fillOpacity="0.7"
        />
      </motion.svg>

      {/* 第三层波浪 - 与背景融合 */}
      <motion.svg
        className="absolute bottom-0 left-0 w-[200%] h-12"
        viewBox="0 0 2880 60"
        preserveAspectRatio="none"
        animate={{ x: [0, -1440] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,30 C180,45 360,15 540,30 C720,45 900,15 1080,30 C1260,45 1440,15 1620,30 C1800,45 1980,15 2160,30 C2340,45 2520,15 2700,30 C2880,45 2880,30 2880,30 L2880,60 L0,60 Z"
          className="fill-background"
        />
      </motion.svg>

      {/* 底部实色确保完全无缝 */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-background" />
    </div>
  );
};
