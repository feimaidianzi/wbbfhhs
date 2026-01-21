import { motion } from "framer-motion";

export const WaveTransition = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none z-[1]">
      {/* 多层波浪实现深度效果 */}
      
      {/* 第一层波浪 - 最远/最慢 */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-full"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-1/2 h-32"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            className="fill-slate-800/60"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 left-1/2 w-1/2 h-32"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            className="fill-slate-800/60"
          />
        </svg>
      </motion.div>

      {/* 第二层波浪 - 中间层 */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-full"
        animate={{ x: ["-50%", 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-1/2 h-28"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C180,40 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1350,80 1440,60 L1440,120 L0,120 Z"
            className="fill-slate-700/70"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 left-1/2 w-1/2 h-28"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C180,40 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1350,80 1440,60 L1440,120 L0,120 Z"
            className="fill-slate-700/70"
          />
        </svg>
      </motion.div>

      {/* 第三层波浪 - 最近/与背景色融合 */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-full"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-1/2 h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C320,100 640,20 960,60 C1280,100 1360,40 1440,50 L1440,120 L0,120 Z"
            className="fill-background"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 left-1/2 w-1/2 h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C320,100 640,20 960,60 C1280,100 1360,40 1440,50 L1440,120 L0,120 Z"
            className="fill-background"
          />
        </svg>
      </motion.div>

      {/* 底部实色条确保无缝衔接 */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-background" />
    </div>
  );
};
