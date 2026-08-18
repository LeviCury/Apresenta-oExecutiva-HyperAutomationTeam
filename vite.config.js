import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("index.html", import.meta.url)),
        apresentacao: fileURLToPath(
          new URL("apresentacao-executiva-coe.html", import.meta.url),
        ),
      },
    },
  },
  resolve: {
    alias: {
      "@": root,
    },
  },
});
