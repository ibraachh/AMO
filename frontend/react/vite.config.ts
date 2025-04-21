import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // burada IP-ni təyin edirik
    port: 5173, // və ya istədiyin port (default: 5173)
  },
});
