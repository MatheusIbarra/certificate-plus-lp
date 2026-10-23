import { defineConfig } from "vite";
import vinext from "vinext";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [vinext(), nitro({ preset: "vercel" })],
  server: { port: 3002, strictPort: true },
});
