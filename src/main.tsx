import { createRoot } from "react-dom/client";
import { HelmetProvider } from "@/lib/helmet-shim";
import App from "./App.tsx";
import "./index.css";
import { normalizeSiteUrl } from "./utils/urlNormalizer";

// Normalize URL before rendering (handles .html, http, nested lang prefixes)
normalizeSiteUrl();


createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
