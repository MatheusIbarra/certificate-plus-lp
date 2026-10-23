"use client";

import { Check, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const TABS = [
  { name: "TRT2", color: "bg-teal-400", system: "TRT 2ª Região · PJe" },
  { name: "TJMG", color: "bg-indigo-400", system: "TJ Minas Gerais · PJe" },
  { name: "TRF3", color: "bg-orange-400", system: "TRF 3ª Região · PJe" },
];
const STEPS = ["Certificado selecionado", "Verificação em duas etapas", "Sessão autenticada"];

/** Ilustração animada do app (dados fictícios): a conexão avança etapa por etapa e depois troca de instância. */
export default function AppWindow() {
  const [tab, setTab] = useState(0);
  const [done, setDone] = useState(0); // etapas concluídas (0..3)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDone(3); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const cycle = (t: number) => {
      if (cancelled) return;
      setTab(t); setDone(0);
      [900, 1900, 2900].forEach((ms, i) => timers.push(setTimeout(() => !cancelled && setDone(i + 1), ms)));
      timers.push(setTimeout(() => cycle((t + 1) % TABS.length), 6200));
    };
    timers.push(setTimeout(() => cycle(0), 600));
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  const connected = done === 3;
  return (
    <figure className="animate-float overflow-hidden rounded-xl border border-stone-700/80 bg-stone-950 shadow-2xl shadow-teal-900/30 ring-1 ring-teal-500/10" aria-label="Ilustração animada da janela do aplicativo">
      <figcaption className="flex items-center gap-3 border-b border-stone-800 bg-stone-900 px-4 py-3">
        <div className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 truncate text-center font-mono text-xs text-stone-500">Certificate Plus</span>
      </figcaption>

      <div aria-hidden className="flex items-center gap-1 border-b border-stone-800 bg-stone-950 px-3 pt-2">
        {TABS.map((t, i) => (
          <span key={t.name} className={`flex items-center gap-2 rounded-t-md px-3 py-1.5 text-xs transition-colors duration-300 ${i === tab ? "bg-stone-900 text-stone-100" : "text-stone-500"}`}>
            <span className={`h-2 w-2 rounded-full ${t.color}`} />
            {t.name}
            {i === tab && <X className="h-3 w-3 text-stone-500" />}
          </span>
        ))}
        <Plus className="ml-1 h-3.5 w-3.5 text-stone-600" />
      </div>

      <div aria-hidden className="grid gap-5 p-5 sm:grid-cols-[1fr_1.1fr]">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-stone-500">Certificado</p>
          <div className="rounded-md border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-200">ESCRITÓRIO EXEMPLO LTDA</div>
          <p className="pt-2 text-[11px] uppercase tracking-wider text-stone-500">Sistema</p>
          <div key={tab} className="animate-fade-up rounded-md border border-teal-500/40 bg-teal-500/5 px-3 py-2 text-sm text-teal-200">{TABS[tab].system}</div>
          <div className={`mt-3 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors duration-500 ${connected ? "bg-teal-500 text-stone-950" : "bg-teal-500/20 text-teal-200"}`}>
            {connected ? "Conectado" : "Conectando…"}
          </div>
        </div>

        <div className="rounded-lg border border-stone-800 bg-stone-900/60 p-4">
          <p className="text-sm font-medium text-stone-100">Conectando ao tribunal</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {STEPS.map((s, i) => {
              const ok = i < done;
              const active = i === done;
              return (
                <li key={s} className={`flex items-center gap-2.5 transition-colors duration-300 ${ok ? "text-stone-200" : active ? "text-stone-300" : "text-stone-600"}`}>
                  <span className={`relative flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-300 ${ok ? "bg-teal-500 text-stone-950" : active ? "border border-teal-500/60" : "border border-stone-700"}`}>
                    {ok && <Check className="h-3 w-3 animate-pop-in" />}
                    {active && <span className="absolute inset-0 rounded-full border border-teal-400 animate-ping-soft" />}
                  </span>
                  {s}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-stone-800">
            <div className="h-full rounded-full bg-teal-400 transition-[width] duration-700 ease-out" style={{ width: `${(done / 3) * 100}%` }} />
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-stone-500">
            <span className={`h-1.5 w-1.5 rounded-full transition-colors ${connected ? "bg-teal-400" : "bg-stone-600"}`} />
            {connected ? "Pronto para assinar" : "Aguarde…"}
          </p>
        </div>
      </div>
    </figure>
  );
}
