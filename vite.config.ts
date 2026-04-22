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
      // Skip already-optimized assets and OG images (re-encoding inflates them)
      exclude: [/og-image\.png$/, /\.min\.(png|jpg|jpeg|webp|avif|svg)$/],
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
    dedupe: ["react", "react-dom", "react-router-dom"],
  },
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // IMPORTANT: Do NOT split React / Radix / Framer Motion into separate
        // chunks. Rollup hoists shared deps into the chunk that imports them
        // first, which created a circular reference where `vendor-misc` ran
        // before `vendor-react` exported `createContext` — the production
        // bundle then crashed with "Cannot read properties of undefined
        // (reading 'createContext')" and showed a blank screen.
        //
        // Let Rollup handle code-splitting automatically via dynamic imports
        // (we already lazy-load every route in App.tsx).
      },
    },
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
