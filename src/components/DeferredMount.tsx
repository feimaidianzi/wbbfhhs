import { useEffect, useState, ReactNode } from 'react';

interface DeferredMountProps {
  children: ReactNode;
  /** Delay in ms after idle before mounting. Default 1500ms */
  delay?: number;
}

/**
 * Mounts children only after the browser is idle (or after a fallback timeout),
 * so non-critical components don't compete with first paint / LCP.
 */
export const DeferredMount = ({ children, delay = 1500 }: DeferredMountProps) => {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const mount = () => setShouldMount(true);

    // Wait for browser idle, then add a small delay to let LCP settle
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

    return () => {
      if (timer) clearTimeout(timer);
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
    };
  }, [delay]);

  if (!shouldMount) return null;
  return <>{children}</>;
};

export default DeferredMount;
