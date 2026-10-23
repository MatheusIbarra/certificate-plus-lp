import Logo from "./Logo";
import { NAV } from "@/content";
import { GUIDES } from "@/guides";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/80 py-10 sm:py-12">
      <div className="page-container grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-stone-500">Acesso a tribunais PJe com certificado digital, com controle de quem usa e registro de tudo o que acontece.</p>
        </div>
        <nav aria-label="Navegação">
          <h2 className="text-sm font-semibold text-stone-200">Produto</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            {NAV.map((l) => (
              <li key={l.href}><a href={`/${l.href}`} className="hover:text-stone-200">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-stone-200">Guias</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            {GUIDES.map((g) => (
              <li key={g.slug}><a href={`/${g.slug}`} className="hover:text-stone-200">{g.h1.split(":")[0]}</a></li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-semibold text-stone-200">Contato</h2>
          <p className="mt-3 text-sm text-stone-500">
            {CONTACT_EMAIL ? <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-stone-200">{CONTACT_EMAIL}</a> : "Fale com o administrador da sua organização."}
          </p>
        </div>
      </div>
      <div className="page-container mt-10 border-t border-stone-800/80 pt-6 text-xs text-stone-600">
        <p>© {new Date().getFullYear()} Certificate Plus. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
