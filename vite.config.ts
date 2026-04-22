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
  },
  build: {
    // Use esbuild (default) — faster minification, drop console/debugger in prod
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunking to keep the initial JS small and let browsers
        // cache vendor code separately from app code.
        // IMPORTANT: keep ALL react-related modules in the SAME chunk to avoid
        // multiple React instances which causes blank screens / hook errors.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          // React core + anything that imports React internals must share a chunk
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router") ||
            id.includes("/react-helmet") ||
            id.includes("/scheduler/") ||
            id.includes("/use-sync-external-store/")
          ) {
            return "vendor-react";
          }

          // 3D / canvas — only loaded by Hero scene (lazy candidates)
          if (id.includes("three") || id.includes("@react-three")) {
            return "vendor-three";
          }

          // Charts/visualization
          if (id.includes("recharts") || id.includes("/d3-")) {
            return "vendor-charts";
          }

          // Supabase client + realtime
          if (id.includes("@supabase")) {
            return "vendor-supabase";
          }

          // Animations
          if (id.includes("framer-motion")) {
            return "vendor-motion";
          }

          // Radix UI primitives — many shadcn components share these
          if (id.includes("@radix-ui")) {
            return "vendor-radix";
          }

          // Form / query helpers
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("@tanstack/react-query")
          ) {
            return "vendor-data";
          }

          // Icons (lucide is large)
          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }

          return "vendor";
        },
      },
    },
  },
  esbuild: {
    // Strip console.log and debugger in production builds
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
