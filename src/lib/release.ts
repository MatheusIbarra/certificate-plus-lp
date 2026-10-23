// Última versão publicada, lida do manifesto público de atualização. Tudo é validado antes de virar link:
// o manifesto é dado externo e nunca deve produzir um href fora da base configurada.
const BASE = (process.env.UPDATES_BASE_URL ?? "").replace(/\/$/, "");

export type Download = { label: string; os: "mac" | "windows"; url: string; sha256?: string };
export type Release = { version: string; publishedAt?: string; downloads: Download[] };

type Artifact = { url?: unknown; sha256?: unknown };

function valid(a: Artifact | undefined): a is { url: string; sha256: string } {
  return !!a && typeof a.url === "string" && typeof a.sha256 === "string" && /^[a-f0-9]{64}$/i.test(a.sha256) && a.url.startsWith(`${BASE}/`) && a.url.startsWith("https://");
}

export async function getRelease(): Promise<Release | null> {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}/latest.json`, { signal: AbortSignal.timeout(5000), redirect: "error" });
    if (!res.ok) return null;
    const m = (await res.json()) as { version?: unknown; publishedAt?: unknown; artifacts?: Record<string, Artifact> };
    if (typeof m.version !== "string" || !/^\d+\.\d+\.\d+$/.test(m.version)) return null;
    const downloads: Download[] = [];
    const mac = m.artifacts?.["darwin-arm64"];
    // O manifesto aponta o .zip (usado pelo atualizador); a instalação manual usa o .dmg da mesma pasta (sem hash publicado).
    if (valid(mac) && mac.url.endsWith(".zip")) downloads.push({ label: "macOS (Apple Silicon)", os: "mac", url: mac.url.replace(/\.zip$/, ".dmg") });
    const win = m.artifacts?.["win32-x64"];
    if (valid(win)) downloads.push({ label: "Windows 64 bits", os: "windows", url: win.url, sha256: win.sha256.toLowerCase() });
    return { version: m.version, publishedAt: typeof m.publishedAt === "string" ? m.publishedAt : undefined, downloads };
  } catch {
    return null;
  }
}
