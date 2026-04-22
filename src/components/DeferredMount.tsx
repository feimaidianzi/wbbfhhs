import { useEffect, useRef, useState, ReactNode } from 'react';

interface DeferredMountProps {
  children: ReactNode;
  /** Delay in ms after idle before mounting. Default 1500ms. Ignored when `whenVisible` or `onInteraction` is set. */
  delay?: number;
  /** Only mount when the placeholder enters the viewport (with rootMargin). Best for below-fold sections. */
  whenVisible?: boolean;
  /** Margin around the viewport for the IntersectionObserver. Default '600px' (start mounting before fully visible). */
  rootMargin?: string;
  /** Additionally mount on first user interaction (scroll/pointer/keydown) — useful for global widgets. */
  onInteraction?: boolean;
  /** Min-height placeholder to prevent CLS when whenVisible is true. */
  minHeight?: number | string;
}

/**
 * Mounts children only after a trigger:
 *  - default: browser idle + delay (good for global non-critical widgets)
 *  - whenVisible: when placeholder enters viewport (good for below-fold sections)
 *  - onInteraction: also mount on first scroll/pointer/keydown
 */
export const DeferredMount = ({
  children,
  delay = 1500,
  whenVisible = false,
  rootMargin = '600px',
  onInteraction = false,
  minHeight,
}: DeferredMountProps) => {
  const [shouldMount, setShouldMount] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldMount) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    let observer: IntersectionObserver | undefined;
    const interactionEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const;

    const mount = () => setShouldMount(true);

    const cleanupInteraction = () => {
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, mount, { capture: true } as any)
      );
    };

    // Strategy 1: visible-based mount
    if (whenVisible && placeholderRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            mount();
            observer?.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(placeholderRef.current);
    }

    // Strategy 2: interaction-based mount (in addition to other triggers)
    if (onInteraction) {
      interactionEvents.forEach((evt) =>
        window.addEventListener(evt, mount, { passive: true, once: true, capture: true })
      );
    }

    // Strategy 3: idle + delay fallback (always armed unless whenVisible exclusively wants viewport)
    if (!whenVisible || onInteraction) {
      if ('requestIdleCallback' in window) {
        idleId = (window as any).requestIdleCallback(
          () => {
            timer = setTimeout(mount, delay);
          },
          { timeout: delay + 2000 }
        );
      } else {
        timer = setTimeout(mount, delay);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      observer?.disconnect();
      cleanupInteraction();
    };
  }, [delay, whenVisible, rootMargin, onInteraction, shouldMount]);

  if (!shouldMount) {
    return (
      <div
        ref={placeholderRef}
        aria-hidden="true"
        style={minHeight ? { minHeight } : undefined}
      />
    );
  }
  return <>{children}</>;
};

export default DeferredMount;
