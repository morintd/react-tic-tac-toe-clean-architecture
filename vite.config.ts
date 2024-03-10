/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "src/**/infrastructure/**/*",
        "**/index.ts",
        "src/main.tsx",
        "src/vite-env.d.ts",
      ],
      include: ["src/"],
    },
  },
});
