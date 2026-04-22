// Tiny IntersectionObserver-based replacement for framer-motion's useInView.
// Returns a ref + boolean. Use for scroll-reveal sections so we can drop
// framer-motion from the main bundle (saves ~45KB gzip).
import { useEffect, useRef, useState } from "react";

export function useInViewLite<T extends HTMLElement = HTMLDivElement>(
  options: { once?: boolean; rootMargin?: string; threshold?: number } = {}
) {
  const { once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.15 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
