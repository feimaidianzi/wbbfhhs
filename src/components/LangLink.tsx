import { Link, LinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { useLangPath } from "@/hooks/useLangPath";

/**
 * A wrapper around react-router-dom's Link that automatically applies
 * the current language prefix to the `to` path.
 * 
 * Chinese (zh) paths remain unchanged. Other languages get /{lang}/ prefix.
 * Admin routes are never prefixed.
 * External URLs (http/https) are not modified.
 */
const LangLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...props }, ref) => {
    const langPath = useLangPath();

    const resolvedTo = typeof to === "string" ? langPath(to) : to;

    return <Link ref={ref} to={resolvedTo} {...props} />;
  }
);

LangLink.displayName = "LangLink";

export { LangLink };
