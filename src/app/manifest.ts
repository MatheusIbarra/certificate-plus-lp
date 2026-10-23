import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Certificate Plus",
    short_name: "Certificate Plus",
    description: "Certificado digital na nuvem para acessar tribunais PJe, com controle de acessos e auditoria.",
    lang: "pt-BR",
    start_url: "/",
    display: "browser",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
