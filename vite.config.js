import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this repo at https://b-nduna.github.io/Aura-Herbals/,
  // not at the domain root — but only apply that prefix to the production
  // build. Local dev (`npm run dev`) stays at the root so
  // http://localhost:5173/ works normally.
  base: command === "build" ? "/Aura-Herbals/" : "/",
}));
