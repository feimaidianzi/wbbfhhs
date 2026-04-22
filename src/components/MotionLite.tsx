import { LazyMotion, domAnimation, m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Re-exports framer-motion's `m` (the lightweight motion component) and a
 * LazyMotion wrapper that loads the animation feature bundle on demand.
 *
 * Usage in a component:
 *   import { MotionConfig, m } from "@/components/MotionLite";
 *   <MotionConfig><m.div animate={{ opacity: 1 }} /></MotionConfig>
 *
 * This keeps ~45KB gzip of framer-motion out of the homepage's main bundle.
 */
export const MotionConfig = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
);

export { m };
