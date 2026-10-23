// Regras do formulário de contato comercial. Usadas no navegador (mensagens na hora) e no servidor
// (route handler e API), que nunca confiam no que o navegador validou.

export const CERT_TYPES = [
  { value: "nuvem", label: "Em nuvem" },
  { value: "a1", label: "A1 (arquivo)" },
  { value: "a3", label: "A3 (token ou cartão)" },
  { value: "nao_sei", label: "Ainda não sei" },
] as const;

export const MAX_QUANTITY = 10000;

export type LeadField = "name" | "email" | "phone" | "quantity" | "certificateType";

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  certificateType: string;
  company: string;
}

export type LeadErrors = Partial<Record<LeadField, string>>;

/** Só dígitos, sem o +55 inicial. Aceita fixo (10 dígitos) e celular (11, com 9 depois do DDD). */
export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if ((d.length === 12 || d.length === 13) && d.startsWith("55")) d = d.slice(2);
  if (d.length !== 10 && d.length !== 11) return null;
  if (d[0] === "0" || d[1] === "0") return null;
  if (d.length === 11 && d[2] !== "9") return null;
  if (d.length === 10 && (d[2] === "0" || d[2] === "1")) return null;
  return d;
}

/** Máscara enquanto digita: (11) 98765-4321 ou (11) 3265-4321. */
export function maskPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function parseQuantity(raw: string): number | null {
  const t = raw.trim();
  if (!/^\d{1,5}$/.test(t)) return null;
  const n = Number(t);
  return n >= 1 && n <= MAX_QUANTITY ? n : null;
}

const EMAIL_RE = /^[^\s@<>()[\],;:"\\]+@[^\s@<>()[\],;:"\\]+\.[^\s@<>()[\],;:"\\]{2,}$/;

export function validateLead(v: LeadInput): LeadErrors {
  const e: LeadErrors = {};
  const name = v.name.trim().replace(/\s+/g, " ");
  if (name.length < 3 || name.length > 120 || !name.includes(" ")) e.name = "Informe nome e sobrenome.";
  const email = v.email.trim();
  if (email.length > 254 || !EMAIL_RE.test(email)) e.email = "Informe um e-mail válido.";
  if (!normalizePhone(v.phone)) e.phone = "Informe um telefone com DDD, por exemplo (11) 98765-4321.";
  if (parseQuantity(v.quantity) === null) e.quantity = `Informe a quantidade, de 1 a ${MAX_QUANTITY}.`;
  if (v.certificateType && !CERT_TYPES.some((t) => t.value === v.certificateType)) e.certificateType = "Escolha uma das opções.";
  return e;
}

/** Origem do contato, guardada na sessão para sobreviver à navegação entre páginas. */
export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
}

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
