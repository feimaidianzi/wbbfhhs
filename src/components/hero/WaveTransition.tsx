import { motion } from "framer-motion";

export const WaveTransition = () => {
  // 每层波浪使用 viewBox 宽度=1440，SVG 宽度=300%，动画平移 -100vw 实现无缝循环
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none z-[1]">
      {/* 第一层波浪 - 最远层 */}
      <motion.svg
        className="absolute bottom-10 left-0 h-24"
        style={{ width: "300vw" }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        animate={{ x: ["0vw", "-100vw"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,60 C120,80 240,40 360,60 C480,80 600,40 720,60 C840,80 960,40 1080,60 C1200,80 1320,40 1440,60 L1440,100 L0,100 Z"
          fill="hsl(var(--muted))"
          fillOpacity="0.35"
        />
      </motion.svg>

      {/* 第二层波浪 - 中间层 */}
      <motion.svg
        className="absolute bottom-5 left-0 h-20"
        style={{ width: "300vw" }}
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        animate={{ x: ["-100vw", "0vw"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,45 C160,65 320,25 480,45 C640,65 800,25 960,45 C1120,65 1280,25 1440,45 L1440,80 L0,80 Z"
          fill="hsl(var(--muted))"
          fillOpacity="0.55"
        />
      </motion.svg>

      {/* 第三层波浪 - 与背景色融合 */}
      <motion.svg
        className="absolute bottom-0 left-0 h-16"
        style={{ width: "300vw" }}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        animate={{ x: ["0vw", "-100vw"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,35 C90,50 180,20 270,35 C360,50 450,20 540,35 C630,50 720,20 810,35 C900,50 990,20 1080,35 C1170,50 1260,20 1350,35 C1440,50 1440,35 1440,35 L1440,60 L0,60 Z"
          className="fill-background"
        />
      </motion.svg>

      {/* 底部实色带确保完全无缝过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-background" />
    </div>
  );
};
