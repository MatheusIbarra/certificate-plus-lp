"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import LeadForm from "./LeadForm";

type ToastKind = "success" | "error";
interface Toast { id: number; kind: ToastKind; text: string }

interface Ctx {
  open: (source: string) => void;
  toast: (kind: ToastKind, text: string) => void;
}
const LeadCtx = createContext<Ctx | null>(null);

export function useLead(): Ctx {
  const c = useContext(LeadCtx);
  if (!c) throw new Error("useLead fora do LeadProvider");
  return c;
}

/** Botão que abre o formulário comercial em modal. `source` identifica o ponto da página na origem do lead. */
export function LeadButton({ source, className, children }: { source: string; className?: string; children: ReactNode }) {
  const { open } = useLead();
  return <button type="button" onClick={() => open(source)} className={className}>{children}</button>;
}

const TOAST_MS = 7000;

export function LeadProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [source, setSource] = useState("site");
  const [formKey, setFormKey] = useState(0); // remonta o formulário a cada abertura: sem dados da vez anterior
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((kind: ToastKind, text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, kind, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), TOAST_MS);
  }, []);

  const open = useCallback((s: string) => {
    setSource(s);
    setFormKey((k) => k + 1);
    setIsOpen(true);
    dialog.current?.showModal();
  }, []);

  const close = useCallback(() => dialog.current?.close(), []);

  // Trava a rolagem da página enquanto o modal está aberto.
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [isOpen]);

  return (
    <LeadCtx.Provider value={{ open, toast }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="lead-modal-title"
        onClose={() => setIsOpen(false)}
        onClick={(e) => { if (e.target === dialog.current) close(); }} // clique no fundo escuro fecha
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl border border-stone-700 bg-stone-950 p-0 text-stone-300 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="lead-modal-title" className="text-xl font-semibold tracking-tight text-stone-50">Fale com o time comercial</h2>
              <p className="mt-1 text-sm text-stone-400">Deixe seu contato e retornamos para apresentar o Certificate Plus.</p>
            </div>
            <button type="button" onClick={close} aria-label="Fechar" className="-mr-2 -mt-2 rounded-md p-2 text-stone-400 hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          {isOpen && (
            <div className="mt-5">
              <LeadForm
                key={formKey}
                source={source}
                onSent={() => { close(); toast("success", "Recebemos seu contato. Nosso time entrará em contato em breve."); }}
                onError={(m) => toast("error", m)}
              />
            </div>
          )}
        </div>
      </dialog>
      {/* Toasts: ficam acima do modal (top layer) porque o popover é promovido junto. */}
      <div ref={(el) => { if (el && !el.matches(":popover-open")) try { el.showPopover(); } catch { /* sem suporte: fica no fluxo normal */ } }} popover="manual"
        className="fixed inset-auto bottom-4 right-4 m-0 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 border-0 bg-transparent p-0 text-stone-100 sm:bottom-6 sm:right-6" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} role={t.kind === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-xl ${t.kind === "success" ? "border-teal-500/40 bg-stone-900" : "border-red-500/40 bg-stone-900"}`}>
            {t.kind === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" aria-hidden /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />}
            <p className="flex-1">{t.text}</p>
            <button type="button" aria-label="Dispensar" onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))} className="text-stone-500 hover:text-stone-200"><X className="h-4 w-4" aria-hidden /></button>
          </div>
        ))}
      </div>
    </LeadCtx.Provider>
  );
}
