import { ArrowRight, Check } from "lucide-react";
import { LeadButton } from "@/components/LeadModal";
import JsonLd from "@/components/JsonLd";
import { COMPARE } from "@/content";
import { GUIDES, type Guide } from "@/guides";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export function guideMetadata(g: Guide) {
  const path = `/${g.slug}`;
  return {
    title: { absolute: g.title },
    description: g.description,
    alternates: { canonical: path },
    openGraph: { type: "article" as const, url: path, siteName: SITE_NAME, locale: "pt_BR", title: g.title, description: g.description, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image" as const, title: g.title, description: g.description },
  };
}

export default function GuideLayout({ guide }: { guide: Guide }) {
  const url = absoluteUrl(`/${guide.slug}`);
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.h1,
      description: guide.description,
      inLanguage: "pt-BR",
      mainEntityOfPage: url,
      image: absoluteUrl("/og-image.png"),
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: guide.h1, item: url },
      ],
    },
    { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "pt-BR", mainEntity: guide.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const related = GUIDES.filter((g) => guide.related.includes(g.slug));

  return (
    <article className="py-12 sm:py-16">
      <JsonLd data={structured} />
      <div className="page-container max-w-3xl">
        <nav aria-label="Você está em" className="text-sm text-stone-500">
          <a href="/" className="hover:text-stone-200">{SITE_NAME}</a> <span aria-hidden>/</span> <span className="text-stone-400">Guias</span>
        </nav>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-stone-50 sm:text-4xl">{guide.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-400">{guide.intro}</p>

        <nav aria-label="Neste guia" className="card mt-8 p-5">
          <p className="text-sm font-semibold text-stone-200">Neste guia</p>
          <ul className="mt-3 space-y-1.5 text-sm text-stone-400">
            {guide.sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`} className="hover:text-teal-300">{s.h2}</a></li>
            ))}
          </ul>
        </nav>

        {guide.sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="mt-12 scroll-mt-24">
            <h2 id={`${s.id}-t`} className="text-2xl font-semibold tracking-tight text-stone-50">{s.h2}</h2>
            {s.paragraphs?.map((p) => <p key={p} className="mt-4 leading-relaxed text-stone-400">{p}</p>)}
            {s.bullets && (
              <ul className="mt-4 space-y-2.5 text-stone-400">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0 text-teal-400" aria-hidden />{b}</li>
                ))}
              </ul>
            )}
            {s.table && (
              <div className="mt-5 overflow-x-auto rounded-xl border border-stone-800 bg-stone-900/40">
                <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                  <caption className="sr-only">Comparativo entre certificado A1, certificado A3 e Certificate Plus</caption>
                  <thead>
                    <tr className="border-b border-stone-800 bg-stone-900/70">
                      <td className="px-4 py-3" />
                      {COMPARE.columns.map((c, i) => <th key={c} scope="col" className={`px-4 py-3 font-semibold ${i === 2 ? "text-teal-300" : "text-stone-100"}`}>{c}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {COMPARE.rows.map(([label, ...cells]) => (
                      <tr key={label}>
                        <th scope="row" className="px-4 py-3 font-medium text-stone-100">{label}</th>
                        {cells.map((cell, i) => <td key={i} className={`px-4 py-3 leading-relaxed ${i === 2 ? "text-stone-200" : "text-stone-400"}`}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        <section aria-labelledby="faq-t" className="mt-12">
          <h2 id="faq-t" className="text-2xl font-semibold tracking-tight text-stone-50">Dúvidas frequentes</h2>
          <div className="mt-5 divide-y divide-stone-800 rounded-xl border border-stone-800 bg-stone-900/40">
            {guide.faq.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-stone-100 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-teal-400 transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="cta-t" className="card mt-12 p-6 text-center sm:p-8">
          <h2 id="cta-t" className="text-xl font-semibold text-stone-50">Conheça o Certificate Plus</h2>
          <p className="mt-2 text-stone-400">Certificado digital em nuvem para PJe, com controle de acessos e auditoria contínua.</p>
          <p className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="/#download" className="btn-primary">Baixar ou solicitar acesso</a>
            <LeadButton source="guia" className="btn-secondary">Falar com o comercial</LeadButton>
            <a href="/#seguranca" className="btn-secondary">Ver segurança</a>
          </p>
        </section>

        {related.length > 0 && (
          <aside aria-labelledby="rel-t" className="mt-12">
            <h2 id="rel-t" className="text-lg font-semibold text-stone-50">Continue lendo</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}><a href={`/${r.slug}`} className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200"><ArrowRight className="h-4 w-4" aria-hidden />{r.h1}</a></li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}
