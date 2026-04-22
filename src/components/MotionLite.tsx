// Backwards-compat shim. MotionLite previously wrapped framer-motion's
// LazyMotion. We now use the in-house motion-shim (no framer-motion at all).
export { motion as m, MotionConfig } from "@/lib/motion-shim";
