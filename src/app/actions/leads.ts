"use server";

import { headers } from "next/headers";
import { CERT_TYPES, UTM_KEYS, normalizePhone, parseQuantity, validateLead, type Attribution, type LeadErrors } from "@/lib/leads";

// Server action do formulário de contato: valida, aplica honeypot e rate limit e chama a API (certificate-plus-api)
// com a service key, que fica só no servidor. A API valida e limita de novo: aqui é a primeira barreira, não a única.

const API_URL = (process.env.LEADS_API_URL ?? "").replace(/\/$/, "");
const API_KEY = process.env.LEADS_API_KEY ?? "";

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

export interface LeadSubmission extends Attribution {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  certificateType: string;
  company: string;
  website: string; // honeypot
  source: string;
}

export type LeadResult = { ok: true } | { ok: false; message: string; fields?: LeadErrors };

const UNAVAILABLE = "Não foi possível enviar agora. Tente novamente em instantes.";
const TOO_MANY = "Muitas tentativas. Tente novamente em alguns minutos.";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export async function submitLead(raw: LeadSubmission): Promise<LeadResult> {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>; // o cliente é não confiável
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (limited(ip)) return { ok: false, message: TOO_MANY };

  // Honeypot: robôs preenchem; respondemos como sucesso e descartamos.
  if (str(body.website, 200).trim()) return { ok: true };

  const input = {
    name: str(body.name, 200), email: str(body.email, 300), phone: str(body.phone, 40), quantity: str(body.quantity, 10),
    certificateType: str(body.certificateType, 20), company: str(body.company, 200),
  };
  const fields = validateLead(input);
  if (Object.keys(fields).length) return { ok: false, message: "Confira os campos destacados.", fields };

  if (!API_URL || !API_KEY) {
    console.error("leads: LEADS_API_URL / LEADS_API_KEY não configuradas");
    return { ok: false, message: UNAVAILABLE };
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
    if (res.status === 201) return { ok: true };
    if (res.status === 429) return { ok: false, message: TOO_MANY };
    if (res.status === 400) return { ok: false, message: "Confira os dados informados e tente de novo." };
    console.error("leads: API respondeu", res.status); // nunca registra corpo, e-mail ou telefone
  } catch (err) {
    console.error("leads: falha ao chamar a API", err instanceof Error ? err.name : "erro");
  }
  return { ok: false, message: UNAVAILABLE };
}
