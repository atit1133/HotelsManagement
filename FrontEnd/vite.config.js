import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 5173, // Optional: Specify the port (default is 5173)
    proxy: {
      "/api": {
        target: "http://192.168.1.116:3002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
