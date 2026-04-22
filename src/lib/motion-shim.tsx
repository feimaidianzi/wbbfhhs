/**
 * Drop-in replacement for the small subset of framer-motion APIs we use.
 *
 * Implements: motion.<tag>, useInView, Variants (type only).
 * Animation strategy:
 *  - Each motion.* element renders a regular DOM tag.
 *  - When `initial` is set, the element starts with `opacity:0` + small
 *    translate/scale (derived from initial props).
 *  - On mount (or when `whileInView` triggers via IntersectionObserver),
 *    we toggle to the "animate" state via a CSS transition.
 *  - `transition.delay` / `duration` map to inline style transition timing.
 *
 * This is intentionally minimal — it covers reveal-on-scroll / fade-in
 * patterns used across the marketing pages and replaces ~45KB gzip of
 * framer-motion in the public bundle.
 */
import {
  createElement,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

// ---------------- Types ----------------

type AnimState = Record<string, any> | undefined;

// Loose type to accept framer-motion-style variants (objects or functions
// returning objects with nested `transition`, etc.). The shim only consumes
// transform/opacity fields; everything else is ignored at runtime.
export type Variants = Record<string, any>;

interface MotionProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  initial?: AnimState | string | false;
  animate?: AnimState | string;
  whileInView?: AnimState | string;
  exit?: AnimState | string;
  whileHover?: AnimState | string;
  whileTap?: AnimState | string;
  variants?: Variants;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    type?: string;
    stiffness?: number;
    damping?: number;
    repeat?: number;
    repeatType?: string;
  };
  viewport?: { once?: boolean; amount?: number; margin?: string };
  onAnimationComplete?: () => void;
  // pass-through for any other DOM/aria/data attribute
  [key: string]: any;
}

// ---------------- Helpers ----------------

const resolveState = (
  state: AnimState | string | false | undefined,
  variants?: Variants
): AnimState => {
  if (!state) return undefined;
  if (typeof state === "string") return variants?.[state];
  return state;
};

const stateToStyle = (state: AnimState): CSSProperties => {
  if (!state) return {};
  const style: CSSProperties = {};
  const transforms: string[] = [];

  for (const [key, value] of Object.entries(state)) {
    switch (key) {
      case "opacity":
        style.opacity = value as number;
        break;
      case "x":
        transforms.push(`translateX(${typeof value === "number" ? `${value}px` : value})`);
        break;
      case "y":
        transforms.push(`translateY(${typeof value === "number" ? `${value}px` : value})`);
        break;
      case "scale":
        transforms.push(`scale(${value})`);
        break;
      case "rotate":
        transforms.push(`rotate(${typeof value === "number" ? `${value}deg` : value})`);
        break;
      case "rotateX":
        transforms.push(`rotateX(${typeof value === "number" ? `${value}deg` : value})`);
        break;
      case "rotateY":
        transforms.push(`rotateY(${typeof value === "number" ? `${value}deg` : value})`);
        break;
      default:
        // forward unknown CSS-ish keys (width/height/color/etc)
        (style as any)[key] = value;
    }
  }
  if (transforms.length) style.transform = transforms.join(" ");
  return style;
};

const buildTransition = (
  t?: MotionProps["transition"]
): string => {
  const dur = t?.duration ?? 0.5;
  const delay = t?.delay ?? 0;
  // We animate transform + opacity; that covers 95% of cases and stays GPU-cheap.
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  return `transform ${dur}s ${ease} ${delay}s, opacity ${dur}s ${ease} ${delay}s`;
};

// ---------------- useInView ----------------

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  amount?: number | "some" | "all";
}

export function useInView<T extends HTMLElement = HTMLElement>(
  ref: Ref<T> | { current: T | null },
  options: UseInViewOptions = {}
): boolean {
  const { once = false, margin = "0px", amount = 0.3 } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = (ref as { current: T | null })?.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const threshold =
      amount === "some" ? 0 : amount === "all" ? 1 : (amount as number);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin, amount]);

  return inView;
}

// ---------------- Motion factory ----------------

const createMotionComponent = (tag: string) =>
  forwardRef<HTMLElement, MotionProps>(function MotionComponent(props, ref) {
    const {
      children,
      className,
      style,
      initial,
      animate,
      whileInView,
      variants,
      transition,
      viewport,
      exit: _exit,
      whileHover: _wh,
      whileTap: _wt,
      onAnimationComplete,
      ...rest
    } = props;

    const innerRef = useRef<HTMLElement | null>(null);
    const setRefs = (node: HTMLElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref && "current" in ref) (ref as any).current = node;
    };

    const hasWhileInView = whileInView !== undefined;
    const inView = useInView(innerRef, {
      once: viewport?.once ?? true,
      margin: viewport?.margin ?? "0px 0px -10% 0px",
      amount: viewport?.amount ?? 0.2,
    });

    const initialResolved = resolveState(initial, variants);
    const animateResolved = resolveState(animate, variants);
    const whileInViewResolved = resolveState(whileInView, variants);

    // Determine the state we should currently render.
    const target = hasWhileInView
      ? inView
        ? whileInViewResolved
        : initialResolved
      : initial === false
        ? animateResolved
        : animateResolved;

    // For non-whileInView elements: start at `initial`, then on next frame
    // flip to `animate` so the CSS transition fires.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      if (hasWhileInView) return;
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }, [hasWhileInView]);

    const currentState = hasWhileInView
      ? target
      : mounted || initial === false
        ? animateResolved
        : initialResolved;

    const computedStyle = useMemo<CSSProperties>(
      () => ({
        ...stateToStyle(currentState),
        transition: buildTransition(transition),
        willChange: "transform, opacity",
        ...style,
      }),
      [currentState, transition, style]
    );

    // Fire onAnimationComplete after the transition duration.
    useEffect(() => {
      if (!onAnimationComplete) return;
      const dur = ((transition?.duration ?? 0.5) + (transition?.delay ?? 0)) * 1000;
      const id = window.setTimeout(onAnimationComplete, dur);
      return () => window.clearTimeout(id);
    }, [currentState, onAnimationComplete, transition?.duration, transition?.delay]);

    return createElement(
      tag,
      { ref: setRefs, className, style: computedStyle, ...rest },
      children
    );
  });

// Build the `motion` proxy with on-demand component creation + caching.
const motionCache = new Map<string, ReturnType<typeof createMotionComponent>>();

export const motion: any = new Proxy(
  {},
  {
    get(_target, prop: string) {
      if (typeof prop !== "string") return undefined;
      let comp = motionCache.get(prop);
      if (!comp) {
        comp = createMotionComponent(prop);
        motionCache.set(prop, comp);
      }
      return comp;
    },
  }
);

// AnimatePresence: framer-motion exit animations are not implemented in this
// shim. We simply render children — exit animations are non-critical to
// content visibility and SEO. Kept for API compatibility.
export const AnimatePresence = ({ children }: { children?: ReactNode }) => (
  <>{children}</>
);

// LazyMotion / MotionConfig / domAnimation pass-throughs (no-ops here).
export const LazyMotion = ({ children }: { children?: ReactNode; features?: any; strict?: boolean }) => (
  <>{children}</>
);
export const MotionConfig = ({ children }: { children?: ReactNode }) => (
  <>{children}</>
);
export const domAnimation = {};
export const m = motion;
