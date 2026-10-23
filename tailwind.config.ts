import type { Config } from "tailwindcss";

// Mesmos tokens do projeto principal (resolve-hub/web): fontes Geist, paleta stone + teal.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        drift: { "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" }, "50%": { transform: "translate3d(-4%,6%,0) scale(1.08)" } },
        "pop-in": { "0%": { transform: "scale(0.4)", opacity: "0" }, "70%": { transform: "scale(1.15)" }, "100%": { transform: "scale(1)", opacity: "1" } },
        "ping-soft": { "0%": { transform: "scale(1)", opacity: "0.6" }, "100%": { transform: "scale(2.6)", opacity: "0" } },
        flow: { "0%": { transform: "translateX(-6px)", opacity: "0" }, "40%": { opacity: "1" }, "100%": { transform: "translateX(6px)", opacity: "0" } },
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards",
        float: "float 6s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
        "pop-in": "pop-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ping-soft": "ping-soft 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
        flow: "flow 1.6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        blink: "blink 1.1s steps(1) infinite",
      },
    },
  },
};

export default config;
