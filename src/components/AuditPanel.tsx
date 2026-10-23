"use client";

import { Camera, CircleSlash, Clock, MousePointerClick, ShieldOff } from "lucide-react";
import { useEffect, useState } from "react";

const EVENTS = [
  { t: "09:41:02", text: "Entrou no TRT2 com ESCRITÓRIO EXEMPLO", kind: "ok" },
  { t: "09:41:19", text: "Abriu a aba “Painel do advogado”", kind: "nav" },
  { t: "09:42:07", text: "Clicou em “Processos” → [PROCESSO]", kind: "click" },
  { t: "09:43:30", text: "Navegou para Pauta de audiências", kind: "nav" },
  { t: "09:44:12", text: "Iniciou assinatura de documento", kind: "ok" },
];

// fase: 0..EVENTS.length = eventos aparecendo; depois print, revogação e reinício
const SHOT = EVENTS.length + 1;
const REVOKE = EVENTS.length + 3;
const END = EVENTS.length + 5;

/** Painel ilustrativo do dono do certificado (dados fictícios): trilha ao vivo, print sob demanda e revogação. */
export default function AuditPanel() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase(SHOT); return; }
    const id = setInterval(() => setPhase((p) => (p >= END ? 0 : p + 1)), 1300);
    return () => clearInterval(id);
  }, []);

  const shot = phase >= SHOT;
  const revoked = phase >= REVOKE;
  return (
    <div className="overflow-hidden rounded-xl border border-stone-700/80 bg-stone-950 shadow-2xl shadow-teal-900/20 ring-1 ring-teal-500/10" role="img" aria-label="Ilustração do painel do dono do certificado: trilha de atividade ao vivo, captura de tela sob pedido e botão para encerrar a sessão">
      <div aria-hidden className="flex items-center justify-between gap-3 border-b border-stone-800 bg-stone-900 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2 text-sm text-stone-200">
          <span className="relative flex h-2.5 w-2.5">
            {!revoked && <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-teal-400" />}
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${revoked ? "bg-red-400" : "bg-teal-400"}`} />
          </span>
          <span className="truncate">Maria S. · TRT2</span>
        </div>
        <span className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors duration-500 ${revoked ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-teal-500/30 bg-teal-500/10 text-teal-300"}`}>
          {revoked ? "Sessão encerrada" : "Ao vivo"}
        </span>
      </div>

      <div aria-hidden className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="border-b border-stone-800 p-4 md:border-b-0 md:border-r">
          <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-wider text-stone-500"><Clock className="h-3.5 w-3.5" /> Trilha de atividade</p>
          <ul className="min-h-[188px] space-y-2.5">
            {EVENTS.map((e, i) =>
              i < phase ? (
                <li key={e.t} className="flex animate-fade-up gap-3 text-xs sm:text-[13px]">
                  <span className="shrink-0 font-mono text-stone-600">{e.t}</span>
                  <span className="flex min-w-0 gap-1.5 text-stone-300">
                    {e.kind === "click" && <MousePointerClick className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-400" />}
                    <span>{e.text}</span>
                  </span>
                </li>
              ) : null,
            )}
            {revoked && (
              <li className="flex animate-fade-up gap-3 text-xs text-red-300 sm:text-[13px]">
                <span className="shrink-0 font-mono text-stone-600">09:45:03</span>
                <span className="flex gap-1.5"><CircleSlash className="mt-0.5 h-3.5 w-3.5 shrink-0" />Dono encerrou a sessão</span>
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-3 p-4">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-stone-500"><Camera className="h-3.5 w-3.5" /> Print em tempo real</p>
          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-stone-800 bg-stone-900">
            {shot && !revoked ? (
              <div className="absolute inset-0 animate-fade-up space-y-1.5 p-2.5">
                <div className="h-2 w-1/3 rounded bg-stone-700" />
                <div className="h-1.5 w-full rounded bg-stone-800" />
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[0, 1, 2].map((n) => <div key={n} className="h-8 rounded bg-teal-500/15" />)}
                </div>
                <div className="h-1.5 w-5/6 rounded bg-stone-800" />
                <div className="h-1.5 w-2/3 rounded bg-stone-800" />
                <div className="h-1.5 w-3/4 rounded bg-stone-800" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-stone-600">{revoked ? "Visualização encerrada" : "Nenhuma captura"}</div>
            )}
            {phase === SHOT && <span className="absolute inset-0 animate-fade-up bg-white/20" />}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-xs font-medium transition-all duration-300 ${phase === SHOT - 1 ? "scale-95 border-teal-400 bg-teal-500/20 text-teal-200" : "border-stone-700 bg-stone-900 text-stone-200"}`}>
              <Camera className="h-3.5 w-3.5" /> Pedir print
            </span>
            <span className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-xs font-medium transition-all duration-300 ${revoked ? "border-red-500/40 bg-red-500/20 text-red-200" : phase === REVOKE - 1 ? "scale-95 border-red-400 bg-red-500/20 text-red-200" : "border-red-500/30 text-red-300"}`}>
              <ShieldOff className="h-3.5 w-3.5" /> Encerrar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
