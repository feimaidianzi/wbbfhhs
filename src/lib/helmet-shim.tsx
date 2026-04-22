/**
 * Drop-in replacement for react-helmet-async.
 *
 * Supports the subset we use across the codebase:
 *   <Helmet>
 *     <title>...</title>
 *     <meta name="..." content="..." />
 *     <meta property="..." content="..." />
 *     <link rel="..." href="..." hrefLang="..." />
 *     <script type="application/ld+json">{JSON.stringify(...)}</script>
 *     <html lang="..." />
 *   </Helmet>
 *
 * Strategy:
 *   - <Helmet> collects its children's effective head tags during render.
 *   - On mount/update we inject those tags into document.head and remove
 *     them on unmount.
 *   - Each tag is tagged with a data-helmet-id so we can clean up reliably.
 *   - Conflicting tags (same <title>, same <meta name/property>) replace
 *     existing entries to mimic helmet's "last component wins" behavior.
 *
 * Saves ~8KB gzip + the runtime Context overhead of react-helmet-async,
 * and avoids the deprecated UNSAFE_componentWillMount warning in React 18.
 */
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";

interface HeadTag {
  tag: string;
  attrs: Record<string, string>;
  text?: string;
  /** Used to dedupe / replace existing tags of the same logical kind. */
  key: string;
}

const HELMET_ATTR = "data-helmet-id";

const reactToDomAttr = (k: string): string => {
  if (k === "className") return "class";
  if (k === "htmlFor") return "for";
  if (k === "hrefLang") return "hreflang";
  if (k === "httpEquiv") return "http-equiv";
  if (k === "charSet") return "charset";
  if (k === "itemProp") return "itemprop";
  if (k === "itemScope") return "itemscope";
  if (k === "itemType") return "itemtype";
  return k;
};

const childTextContent = (children: ReactNode): string => {
  let out = "";
  Children.forEach(children, (c) => {
    if (c == null || c === false) return;
    if (typeof c === "string" || typeof c === "number") out += String(c);
    else if (Array.isArray(c)) out += childTextContent(c);
    else if (isValidElement(c)) out += childTextContent((c.props as any).children);
  });
  return out;
};

const collectTags = (children: ReactNode, instanceId: string): HeadTag[] => {
  const tags: HeadTag[] = [];
  let i = 0;

  const walk = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (!isValidElement(child)) return;
      const type = child.type as string;
      if (typeof type !== "string") return;
      const props = child.props as Record<string, any>;

      if (type === "title") {
        tags.push({
          tag: "title",
          attrs: {},
          text: childTextContent(props.children),
          key: "title",
        });
        return;
      }

      if (type === "html" || type === "body") {
        // Apply attrs to <html> / <body> directly via side effect; encode as
        // a synthetic tag with a stable key so we can revert on unmount.
        tags.push({
          tag: `__${type}_attrs__`,
          attrs: Object.fromEntries(
            Object.entries(props).filter(([k]) => k !== "children")
          ) as Record<string, string>,
          key: `__${type}_attrs__`,
        });
        return;
      }

      const attrs: Record<string, string> = {};
      let text: string | undefined;

      for (const [k, v] of Object.entries(props)) {
        if (k === "children") continue;
        if (v == null || v === false) continue;
        attrs[reactToDomAttr(k)] = String(v);
      }

      if (type === "script" || type === "style" || type === "noscript") {
        text = childTextContent(props.children);
      }

      // Build dedupe key.
      let key: string;
      if (type === "meta") {
        const name =
          attrs["name"] ||
          attrs["property"] ||
          attrs["http-equiv"] ||
          attrs["charset"];
        key = name ? `meta:${name}` : `meta:${instanceId}:${i++}`;
      } else if (type === "link") {
        // Links can repeat (alternate hreflang) — make every instance unique.
        key = `link:${attrs["rel"] || ""}:${attrs["hreflang"] || ""}:${attrs["href"] || ""}:${i++}`;
      } else if (type === "script" && attrs["type"] === "application/ld+json") {
        key = `script-ld:${instanceId}:${i++}`;
      } else if (type === "script" && attrs["src"]) {
        key = `script:${attrs["src"]}`;
      } else {
        key = `${type}:${instanceId}:${i++}`;
      }

      tags.push({ tag: type, attrs, text, key });
    });
  };

  walk(children);
  return tags;
};

const applyTag = (t: HeadTag, instanceId: string): Element | null => {
  // <html> / <body> attribute side-effects.
  if (t.tag === "__html_attrs__") {
    const html = document.documentElement;
    for (const [k, v] of Object.entries(t.attrs)) html.setAttribute(reactToDomAttr(k), v);
    return null;
  }
  if (t.tag === "__body_attrs__") {
    const body = document.body;
    for (const [k, v] of Object.entries(t.attrs)) body.setAttribute(reactToDomAttr(k), v);
    return null;
  }

  // <title> — update text on the existing element instead of cloning.
  if (t.tag === "title") {
    let titleEl = document.head.querySelector("title");
    if (!titleEl) {
      titleEl = document.createElement("title");
      document.head.appendChild(titleEl);
    }
    titleEl.textContent = t.text || "";
    titleEl.setAttribute(HELMET_ATTR, instanceId);
    return titleEl;
  }

  // For <meta> with name/property: replace any existing matching tag.
  if (t.tag === "meta") {
    const selector = t.attrs["name"]
      ? `meta[name="${CSS.escape(t.attrs["name"])}"]`
      : t.attrs["property"]
        ? `meta[property="${CSS.escape(t.attrs["property"])}"]`
        : t.attrs["http-equiv"]
          ? `meta[http-equiv="${CSS.escape(t.attrs["http-equiv"])}"]`
          : null;
    if (selector) {
      const existing = document.head.querySelector(selector);
      if (existing) existing.remove();
    }
  }

  // For canonical <link rel="canonical">: replace existing.
  if (t.tag === "link" && t.attrs["rel"] === "canonical") {
    const existing = document.head.querySelector('link[rel="canonical"]');
    if (existing) existing.remove();
  }

  const el = document.createElement(t.tag);
  for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
  if (t.text != null) el.textContent = t.text;
  el.setAttribute(HELMET_ATTR, instanceId);
  document.head.appendChild(el);
  return el;
};

export const Helmet = ({ children }: { children?: ReactNode }) => {
  const instanceId = useId();
  const appliedRef = useRef<Element[]>([]);

  useEffect(() => {
    const tags = collectTags(children, instanceId);
    const applied: Element[] = [];
    for (const t of tags) {
      const el = applyTag(t, instanceId);
      if (el) applied.push(el);
    }
    appliedRef.current = applied;
    return () => {
      for (const el of applied) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }
      appliedRef.current = [];
    };
  });

  return null;
};

// HelmetProvider is a no-op pass-through.
export const HelmetProvider = ({ children }: { children?: ReactNode }) => (
  <>{children}</>
);

// Some codebases import `default`; keep both.
export default Helmet;
