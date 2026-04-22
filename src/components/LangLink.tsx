import { Link, LinkProps } from "react-router-dom";
import { forwardRef, useCallback } from "react";
import { useLangPath } from "@/hooks/useLangPath";
import { prefetchRoute } from "@/lib/routePrefetch";

/**
 * A wrapper around react-router-dom's Link that automatically applies
 * the current language prefix to the `to` path.
 *
 * English (en) paths remain unchanged. Other languages get /{lang}/ prefix.
 * Admin routes are never prefixed.
 * External URLs (http/https) are not modified.
 *
 * Prefetches the target route's chunk on hover / focus / touchstart so
 * subsequent navigation feels instantaneous.
 */
const LangLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, onMouseEnter, onFocus, onTouchStart, ...props }, ref) => {
    const langPath = useLangPath();

    const resolvedTo = typeof to === "string" ? langPath(to) : to;
    const prefetchTarget = typeof to === "string" ? to : "";

    const handlePrefetch = useCallback(() => {
      if (prefetchTarget) prefetchRoute(prefetchTarget);
    }, [prefetchTarget]);

    return (
      <Link
        ref={ref}
        to={resolvedTo}
        onMouseEnter={(e) => { handlePrefetch(); onMouseEnter?.(e); }}
        onFocus={(e) => { handlePrefetch(); onFocus?.(e); }}
        onTouchStart={(e) => { handlePrefetch(); onTouchStart?.(e); }}
        {...props}
      />
    );
  }
);

LangLink.displayName = "LangLink";

export { LangLink };
