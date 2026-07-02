import { createRoot } from "react-dom/client";
import { HelmetProvider } from "@/lib/helmet-shim";
import App from "./App.tsx";
import "./index.css";
import { normalizeSiteUrl } from "./utils/urlNormalizer";

// Normalize URL before rendering (handles .html, http, nested lang prefixes)
normalizeSiteUrl();

// The site uses a dark technical visual system; ensure semantic color tokens
// resolve to the dark palette before React paints routed pages.
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
