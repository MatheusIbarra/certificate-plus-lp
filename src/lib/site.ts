export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3002").replace(/\/$/, "");
export const SITE_NAME = "Certificate Plus";
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "";
export const GOOGLE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION ?? "";

/** Só indexa quando a URL pública está configurada: evita publicar canonical/sitemap de localhost nos buscadores. */
export const INDEXABLE = !/localhost|127\.0\.0\.1/.test(SITE_URL);

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const PAGE_TITLE = "Certificado digital em nuvem para PJe | Certificate Plus";
export const PAGE_DESCRIPTION = "Acesse o PJe de TRTs, TJs e TRFs com certificado digital em nuvem, sem token nem arquivo .pfx. Controle de acessos, auditoria e revogação imediata.";
