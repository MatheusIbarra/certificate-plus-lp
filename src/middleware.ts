import { NextResponse } from "next/server";

// Cabeçalhos de segurança. O único envio é o formulário de contato, para /api/leads no próprio site: nada de frames, formulários externos ou conexões de saída no navegador.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // o runtime do framework injeta scripts inline; sem origens externas
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export function middleware() {
  const res = NextResponse.next();
  res.headers.set("Content-Security-Policy", CSP);
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  return res;
}

export const config = { matcher: ["/((?!_next/|@vite/|@id/|@fs/|@react-refresh|node_modules/|src/).*)"] };
