import { CERT_TYPES, UTM_KEYS, normalizePhone, parseQuantity, validateLead } from "@/lib/leads";

// Recebe o formulário de contato e repassa à API (certificate-plus-api) com a service key, que fica só no servidor.
// Validação, honeypot e rate limit acontecem aqui e de novo na API: este arquivo é a primeira barreira, não a única.

const API_URL = (process.env.LEADS_API_URL ?? "").replace(/\/$/, "");
const API_KEY = process.env.LEADS_API_KEY ?? "";

const MAX_BODY = 8 * 1024;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // memória da instância: em serverless é um freio, o limite firme é o da API

function limited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] >= WINDOW_MS) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return xff || req.headers.get("x-real-ip") || "unknown";
}

const json = (body: unknown, status: number, headers?: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export async function POST(req: Request) {
  // Só aceita envio vindo do próprio site (navegadores sempre mandam Origin em POST).
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin) {
    let ok = false;
    try { ok = new URL(origin).host === host; } catch { /* origem inválida */ }
    if (!ok) return json({ error: "forbidden", message: "Origem não permitida." }, 403);
  }

  const ip = clientIp(req);
  if (limited(ip)) return json({ error: "rate_limited", message: "Muitas tentativas. Tente novamente em alguns minutos." }, 429, { "Retry-After": "600" });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ error: "too_large", message: "Requisição grande demais." }, 413);
  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed;
  } catch {
    return json({ error: "invalid_body", message: "Requisição inválida." }, 400);
  }

  // Honeypot: robôs preenchem; respondemos como sucesso e descartamos.
  if (str(body.website, 200).trim()) return json({ ok: true }, 201);

  const input = {
    name: str(body.name, 200), email: str(body.email, 300), phone: str(body.phone, 40), quantity: str(body.quantity, 10),
    certificateType: str(body.certificateType, 20), company: str(body.company, 200),
  };
  const errors = validateLead(input);
  if (Object.keys(errors).length) return json({ error: "invalid_fields", message: "Confira os campos destacados.", fields: errors }, 400);

  if (!API_URL || !API_KEY) {
    console.error("leads: LEADS_API_URL / LEADS_API_KEY não configuradas");
    return json({ error: "unavailable", message: "Não foi possível enviar agora. Tente novamente em instantes." }, 503);
  }

  const payload: Record<string, unknown> = {
    name: input.name.trim().replace(/\s+/g, " "),
    email: input.email.trim(),
    phone: normalizePhone(input.phone),
    certificate_quantity: parseQuantity(input.quantity),
    company: input.company.trim(),
    source: str(body.source, 40),
    referrer: str(body.referrer, 500),
    landing_page: str(body.landing_page, 500),
  };
  if (CERT_TYPES.some((t) => t.value === input.certificateType)) payload.certificate_type = input.certificateType;
  for (const k of UTM_KEYS) payload[k] = str(body[k], 200);

  try {
    const res = await fetch(`${API_URL}/v1/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Service-Key": API_KEY, "X-Client-IP": ip },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 201) return json({ ok: true }, 201);
    if (res.status === 429) return json({ error: "rate_limited", message: "Muitas tentativas. Tente novamente em alguns minutos." }, 429, { "Retry-After": "60" });
    if (res.status === 400) return json({ error: "invalid_fields", message: "Confira os dados informados e tente de novo." }, 400);
    console.error("leads: API respondeu", res.status); // nunca registra corpo, e-mail ou telefone
  } catch (err) {
    console.error("leads: falha ao chamar a API", err instanceof Error ? err.name : "erro");
  }
  return json({ error: "unavailable", message: "Não foi possível enviar agora. Tente novamente em instantes." }, 503);
}
