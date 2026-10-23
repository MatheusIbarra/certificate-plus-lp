"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CERT_TYPES, UTM_KEYS, maskPhone, validateLead, type Attribution, type LeadErrors, type LeadField } from "@/lib/leads";

const STORE_KEY = "cp_attribution";
const SENT = "Recebemos seu contato. Nosso time entrará em contato em breve.";

/** Primeira origem da sessão: UTMs, referrer externo e página de entrada. Sobrevive à navegação entre páginas. */
function captureAttribution(): Attribution {
  try {
    const saved = sessionStorage.getItem(STORE_KEY);
    if (saved) return JSON.parse(saved) as Attribution;
  } catch { /* storage bloqueado: segue sem persistir */ }
  const a: Attribution = { landing_page: location.pathname };
  const q = new URLSearchParams(location.search);
  for (const k of UTM_KEYS) {
    const v = q.get(k);
    if (v) a[k] = v.slice(0, 200);
  }
  try {
    if (document.referrer && new URL(document.referrer).host !== location.host) a.referrer = document.referrer.slice(0, 500);
  } catch { /* referrer inválido */ }
  try { sessionStorage.setItem(STORE_KEY, JSON.stringify(a)); } catch { /* idem */ }
  return a;
}

const inputCls = "w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 aria-[invalid=true]:border-red-400";

export default function LeadForm({ source, id, defaultType = "", wide = false }: { source: string; id?: string; defaultType?: string; wide?: boolean }) {
  const uid = useId();
  const attribution = useRef<Attribution>({});
  const [v, setV] = useState({ name: "", email: "", phone: "", quantity: "", certificateType: defaultType, company: "", website: "" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => { attribution.current = captureAttribution(); }, []);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = k === "phone" ? maskPhone(e.target.value) : e.target.value;
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k as LeadField]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    const found = validateLead(v);
    setErrors(found);
    if (Object.keys(found).length) {
      setState("idle");
      setMessage("");
      requestAnimationFrame(() => document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus());
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, ...attribution.current, source }),
      });
      if (res.status === 201) return setState("sent");
      const data = (await res.json().catch(() => ({}))) as { message?: string; fields?: LeadErrors };
      if (data.fields) setErrors(data.fields);
      setMessage(data.message ?? "Não foi possível enviar agora. Tente novamente em instantes.");
    } catch {
      setMessage("Sem conexão. Verifique a internet e tente novamente.");
    }
    setState("error");
  }

  if (state === "sent")
    return (
      <div id={id} role="status" className="flex items-start gap-3 rounded-lg border border-teal-500/30 bg-teal-500/10 p-5 text-left">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" aria-hidden />
        <p className="text-stone-100">{SENT}</p>
      </div>
    );

  const field = (k: LeadField, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className="mb-1 block text-sm text-stone-300">{label}</label>
      {input}
      {errors[k] && <p id={`${uid}-${k}-err`} className="mt-1 text-xs text-red-400">{errors[k]}</p>}
    </div>
  );
  const a11y = (k: LeadField) => ({ id: `${uid}-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined });

  return (
    <form id={id} onSubmit={submit} noValidate className="text-left" aria-label="Falar com o time comercial">
      <div className={`grid gap-3 ${wide ? "sm:grid-cols-2" : ""}`}>
        {field("name", "Nome completo *", <input {...a11y("name")} className={inputCls} autoComplete="name" required value={v.name} onChange={set("name")} />)}
        {field("email", "E-mail *", <input {...a11y("email")} className={inputCls} type="email" autoComplete="email" required value={v.email} onChange={set("email")} />)}
        {field("phone", "Telefone / WhatsApp *", <input {...a11y("phone")} className={inputCls} type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 98765-4321" required value={v.phone} onChange={set("phone")} />)}
        {field("quantity", "Quantos certificados? *", <input {...a11y("quantity")} className={inputCls} inputMode="numeric" placeholder="Ex.: 5" required value={v.quantity} onChange={set("quantity")} />)}
        {field("certificateType", "Tipo de certificado (opcional)", (
          <select {...a11y("certificateType")} className={inputCls} value={v.certificateType} onChange={set("certificateType")}>
            <option value="">Selecione</option>
            {CERT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        ))}
        <div>
          <label htmlFor={`${uid}-company`} className="mb-1 block text-sm text-stone-300">Empresa ou escritório (opcional)</label>
          <input id={`${uid}-company`} className={inputCls} autoComplete="organization" value={v.company} onChange={set("company")} />
        </div>
      </div>
      {/* Honeypot: invisível para pessoas, preenchido por robôs. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Site<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
      </div>
      <div aria-live="polite">{state === "error" && <p role="alert" className="mt-3 text-sm text-red-400">{message}</p>}</div>
      <button type="submit" disabled={state === "sending"} className="btn-primary mt-4 w-full sm:w-auto">
        {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…</> : <><Send className="h-4 w-4" aria-hidden /> Quero ser contatado</>}
      </button>
      <p className="mt-3 text-xs text-stone-500">Usamos seus dados apenas para retornar este contato.</p>
    </form>
  );
}
