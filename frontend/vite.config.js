import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    watch: { usePolling: true },
    proxy: {
      "/api": {
        // En Docker : API_PROXY=http://backend:5000 (docker-compose.yml)
        // En local  : fallback http://localhost:5000
        target: process.env.API_PROXY || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
