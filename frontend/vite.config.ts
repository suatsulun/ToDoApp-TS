import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  base: "/todos/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    allowedHosts: ["suatsulun.com", "www.suatsulun.com"],
    port: 5173,
    host: true,
  },
  server: {
    allowedHosts: ["suatsulun.com", "www.suatsulun.com"],
  },
});

