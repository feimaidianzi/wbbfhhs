import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction the element slides in from */
  direction?: "up" | "down" | "left" | "right";
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Distance in px */
  distance?: number;
  /** Trigger once or every time */
  once?: boolean;
  /** Viewport margin for early trigger */
  margin?: string;
  className?: string;
}

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 60,
  once = true,
  margin = "-80px",
  className,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any });
  const d = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ========== Staggered children ========== */

interface StaggerRevealProps {
  children: ReactNode;
  /** Stagger delay between each child */
  stagger?: number;
  /** Base delay before first child */
  delay?: number;
  once?: boolean;
  margin?: string;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const StaggerReveal = ({
  children,
  stagger = 0.12,
  delay = 0,
  once = true,
  margin = "-60px",
  className,
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={{ stagger, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Wrap each child with this inside a StaggerReveal */
export const StaggerItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div variants={itemVariants} className={className}>
    {children}
  </motion.div>
);

/* ========== Parallax section ========== */

interface ParallaxSectionProps {
  children: ReactNode;
  /** Parallax speed: positive = slower than scroll, negative = faster */
  speed?: number;
  className?: string;
}

export const ParallaxSection = ({
  children,
  speed = 0.3,
  className,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: "transform" }}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ type: "tween" }}
    >
      <motion.div
        style={{
          y: 0,
        }}
        whileInView={{ y: speed * -30 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "tween", duration: 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
