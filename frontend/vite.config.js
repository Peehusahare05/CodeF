import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const proxyTarget = env.VITE_DEV_API_PROXY_TARGET || "http://localhost:5001";

  return {
    plugins: [react()],
    build: {
      target: "es2020",
      minify: "esbuild",
      cssMinify: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            if (id.includes("react") || id.includes("react-dom"))
              return "react";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("chart.js") || id.includes("react-chartjs-2")) {
              return "charts";
            }
            if (id.includes("leaflet") || id.includes("react-leaflet")) {
              return "maps";
            }
            if (id.includes("lucide-react")) return "icons";

            return "vendor";
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
