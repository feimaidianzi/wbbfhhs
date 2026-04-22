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
    // NOTE: We intentionally DO NOT set rollupOptions.output.manualChunks here.
    // A custom manualChunks function previously caused React to be duplicated
    // into multiple vendor chunks (vendor-charts contained its own React copy),
    // resulting in a blank white screen in production. Letting Rollup do its
    // default automatic chunking keeps a single React instance.
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
