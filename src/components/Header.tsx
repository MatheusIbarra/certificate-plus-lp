import { Menu } from "lucide-react";
import Logo from "./Logo";
import { NAV } from "@/content";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-800/80 bg-stone-950/80 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <a href="/" aria-label="Certificate Plus"><Logo /></a>
        <nav aria-label="Principal" className="hidden items-center gap-1 text-sm lg:flex">
          {NAV.map((l) => (
            <a key={l.href} href={`/${l.href}`} className="rounded-md px-3 py-2 text-stone-400 hover:text-stone-100">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/#download" className="btn-primary !px-3 !py-2 sm:!px-4">Baixar o app</a>
          <details className="relative lg:hidden">
            <summary aria-label="Menu" className="flex cursor-pointer list-none items-center rounded-md p-2 text-stone-300 hover:text-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" aria-hidden />
            </summary>
            <nav aria-label="Principal" className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-lg border border-stone-700 bg-stone-900 py-1 shadow-xl">
              {NAV.map((l) => (
                <a key={l.href} href={`/${l.href}`} className="block px-4 py-2.5 text-sm text-stone-300 hover:bg-stone-800 hover:text-stone-50">{l.label}</a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
