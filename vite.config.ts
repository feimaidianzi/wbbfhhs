import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { quality: 80, lossless: false },
      avif: { quality: 65, lossless: false },
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIds: false,
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Force a single React instance — prevents blank screen / hook errors
    // caused by multiple React copies bundled by manualChunks.
    dedupe: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
  },
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split heavy third-party libs out of the main app bundle so the LCP
        // critical path downloads less code. React stays bundled together to
        // guarantee a single instance (avoids the "blank screen" regression).
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          // Keep React + ReactDOM + Router + Helmet in ONE chunk to avoid
          // duplicate instances / hook errors.
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router") ||
            id.includes("/react-helmet-async/") ||
            id.includes("/scheduler/")
          ) {
            return "vendor-react";
          }
          if (id.includes("/framer-motion/")) return "vendor-motion";
          if (id.includes("/@radix-ui/")) return "vendor-radix";
          if (id.includes("/@supabase/") || id.includes("/@tanstack/")) return "vendor-data";
          if (id.includes("/lucide-react/")) return "vendor-icons";
          return "vendor-misc";
        },
      },
    },
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
