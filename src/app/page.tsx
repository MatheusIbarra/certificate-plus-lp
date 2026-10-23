import { ArrowRight, Camera, Check, Download, Laptop, Mail, ShieldCheck, ShieldOff, UserRound, Cloud, Clock } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import AuditPanel from "@/components/AuditPanel";
import AppWindow from "@/components/AppWindow";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { AUDIT, COMPARE, FAQ, FEATURES, HERO, PRIVACY, ROLES, SECURITY, STEPS, SYSTEMS, WHY } from "@/content";
import { getRelease } from "@/lib/release";
import { CONTACT_EMAIL, PAGE_DESCRIPTION, PAGE_TITLE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export const revalidate = 300;

function SectionHeader({ id, title, subtitle, center = true }: { id: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <header data-reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 id={id} className="text-2xl font-semibold leading-tight tracking-tight text-stone-50 sm:text-3xl lg:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-stone-400 sm:mt-4 sm:text-lg">{subtitle}</p>}
    </header>
  );
}

/** Fluxo de uso em alto nível: o que a pessoa faz e o que ela obtém. */
function Flow() {
  const node = "flex flex-col items-center gap-2 rounded-lg border border-stone-800 bg-stone-900/70 px-4 py-4 text-center text-xs text-stone-300 sm:text-sm";
  const link = <div className="flex justify-center text-teal-400 max-md:rotate-90 max-md:py-1" aria-hidden><ArrowRight className="h-5 w-5 animate-flow" /></div>;
  return (
    <div data-reveal className="mx-auto mt-10 grid max-w-3xl items-center gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <div className={node}><Laptop className="h-6 w-6 text-stone-400" aria-hidden />Você abre o app</div>
      {link}
      <div className={`${node} border-teal-500/40`}><Cloud className="h-6 w-6 text-teal-300" aria-hidden />A plataforma cuida do certificado</div>
      {link}
      <div className={node}><ShieldCheck className="h-6 w-6 text-teal-300" aria-hidden />O tribunal abre autenticado</div>
    </div>
  );
}

export default async function Home() {
  const release = await getRelease();
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png"), width: 512, height: 512 },
      ...(CONTACT_EMAIL ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: CONTACT_EMAIL, availableLanguage: "pt-BR" } } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS, Windows",
      description: HERO.subtitle,
      url: SITE_URL,
      image: absoluteUrl("/og-image.png"),
      inLanguage: "pt-BR",
      featureList: FEATURES.map((f) => f.title),
      publisher: { "@id": `${SITE_URL}/#organization` },
      ...(release ? { softwareVersion: release.version, ...(release.publishedAt ? { dateModified: release.publishedAt } : {}) } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      ...(release?.publishedAt ? { dateModified: release.publishedAt } : {}),
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#app` },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/og-image.png") },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "pt-BR", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const mailto = CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Quero conhecer o Certificate Plus")}` : "#download";

  return (
    <>
      <JsonLd data={structured} />

      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] animate-drift bg-[radial-gradient(60%_60%_at_70%_0%,rgba(20,184,166,0.16),transparent)]" />
        <div className="page-container relative grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-24">
          <div className="min-w-0 animate-fade-up">
            <p className="mb-4 inline-flex sm:mb-5 items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden />{HERO.badge}
            </p>
            <h1 id="hero-title" className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-stone-50 sm:text-5xl lg:text-[3.25rem]">
              {HERO.title} <span className="text-teal-400">{HERO.highlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-400 sm:mt-6 sm:text-lg">{HERO.subtitle}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
              <a href="#download" className="btn-primary"><Download className="h-4 w-4" aria-hidden /> Baixar o app</a>
              <a href="#contato" className="btn-secondary"><Mail className="h-4 w-4" aria-hidden /> Falar com o comercial</a>
              <a href="#seguranca" className="btn-secondary"><ShieldCheck className="h-4 w-4" aria-hidden /> Como protegemos</a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-stone-500"><Check className="h-4 w-4 shrink-0 text-teal-400" aria-hidden /> {HERO.note}</p>
          </div>
          <div className="min-w-0 animate-fade-up [animation-delay:120ms]"><AppWindow /></div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container">
          <SectionHeader id="why-title" title="Menos fricção, mais controle" subtitle="Pensado para escritórios e equipes que precisam de acesso rápido sem abrir mão de segurança." />
          <ul className="mt-10 grid sm:mt-14 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="card p-5 sm:p-6">
                <Icon className="h-6 w-6 text-teal-400" aria-hidden />
                <h3 className="mt-4 font-semibold text-stone-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="comparativo" aria-labelledby="compare-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container">
          <SectionHeader id="compare-title" title={COMPARE.title} subtitle={COMPARE.subtitle} />
          <div data-reveal className="mt-10 overflow-x-auto rounded-xl border border-stone-800 bg-stone-900/40 sm:mt-14">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">Comparativo entre certificado A1, certificado A3 e Certificate Plus</caption>
              <thead>
                <tr className="border-b border-stone-800 bg-stone-900/70">
                  <td className="px-5 py-4" />
                  {COMPARE.columns.map((c, i) => (
                    <th key={c} scope="col" className={`px-5 py-4 font-semibold ${i === 2 ? "text-teal-300" : "text-stone-100"}`}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {COMPARE.rows.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row" className="px-5 py-4 font-medium text-stone-100">{label}</th>
                    {cells.map((cell, i) => (
                      <td key={i} className={`px-5 py-4 leading-relaxed ${i === 2 ? "text-stone-200" : "text-stone-400"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-reveal className="mx-auto mt-6 max-w-2xl text-center text-sm text-stone-500">{COMPARE.note}</p>
          <div data-reveal id="contato-certificados" className="card mx-auto mt-10 max-w-3xl p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-stone-50">Quantos certificados a sua equipe usa?</h3>
            <p className="mb-4 mt-1 text-sm text-stone-400">Deixe seu contato e o time comercial fala com você.</p>
            <LeadForm source="certificados" wide />
          </div>
          <p data-reveal className="mx-auto mt-3 max-w-2xl text-center text-sm">
            <a href="/certificado-a1-a3-ou-nuvem" className="text-teal-300 hover:text-teal-200">Certificado A1, A3 ou em nuvem: qual escolher</a>
            <span className="text-stone-600" aria-hidden> · </span>
            <a href="/certificado-digital-em-nuvem" className="text-teal-300 hover:text-teal-200">O que é certificado digital em nuvem</a>
            <span className="text-stone-600" aria-hidden> · </span>
            <a href="/pje-sem-token" className="text-teal-300 hover:text-teal-200">Como acessar o PJe sem token</a>
          </p>
        </div>
      </section>

      <section id="como-funciona" aria-labelledby="how-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container">
          <SectionHeader id="how-title" title="Três passos até o processo" subtitle="Sem instalar certificado, sem assinador separado, sem configurar navegador." />
          <ol className="mt-10 grid sm:mt-14 gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className="card p-5 sm:p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 font-mono text-sm font-semibold text-teal-300">{i + 1}</span>
                <h3 className="mt-4 font-semibold text-stone-50">{s.title}</h3>
                <p className="mt-2 text-sm text-stone-400">{s.text}</p>
              </li>
            ))}
          </ol>
          <Flow />
        </div>
      </section>

      <section id="recursos" aria-labelledby="features-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container">
          <SectionHeader id="features-title" title="Tudo o que a rotina jurídica pede" subtitle="Do login à revogação de acesso, o app cobre o ciclo inteiro." />
          <ul className="mt-10 grid sm:mt-14 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <li key={title} data-reveal style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties} className="card p-5 sm:p-6">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-300"><Icon className="h-5 w-5" aria-hidden /></span>
                <h3 className="text-base font-semibold text-stone-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="sistemas" aria-labelledby="systems-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container">
          <SectionHeader id="systems-title" title="Mais de 180 tribunais no catálogo" subtitle="PJe em todas as esferas. O catálogo evolui sem que você precise reinstalar o app." />
          <ul className="mt-10 grid sm:mt-14 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((c, i) => (
              <li key={c.title} data-reveal style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties} className="card p-5 sm:p-6">
                <span className="badge-tag">{c.tag}</span>
                <h3 className="mt-3 font-semibold text-stone-50">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="auditoria" aria-labelledby="audit-title" className="relative overflow-hidden border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(50%_60%_at_30%_0%,rgba(20,184,166,0.12),transparent)]" />
        <div className="page-container relative">
          <SectionHeader id="audit-title" title={AUDIT.title} subtitle={AUDIT.subtitle} />
          <div className="mt-10 grid items-center gap-10 sm:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <ul className="space-y-5">
              {AUDIT.pillars.map((p, i) => {
                const Icon = p.icon === "trail" ? Clock : p.icon === "shot" ? Camera : ShieldOff;
                return (
                  <li key={p.title} data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties} className="card flex gap-4 p-5 sm:p-6">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-300"><Icon className="h-5 w-5" aria-hidden /></span>
                    <div>
                      <h3 className="font-semibold text-stone-50">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div data-reveal style={{ "--d": "150ms" } as React.CSSProperties} className="min-w-0"><AuditPanel /></div>
          </div>
          <p data-reveal className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-stone-500"><Check className="h-4 w-4 shrink-0 text-teal-400" aria-hidden />{AUDIT.note}</p>
        </div>
      </section>

      <section id="equipes" aria-labelledby="roles-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container">
          <SectionHeader id="roles-title" title="Cada pessoa com o seu papel" subtitle="O certificado tem um dono. Quem usa, quem acompanha e quem administra enxergam o que precisam." />
          <ul className="mt-10 grid sm:mt-14 gap-5 md:grid-cols-3">
            {ROLES.map((r, i) => (
              <li key={r.title} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className="card p-5 sm:p-6">
                <UserRound className="h-6 w-6 text-teal-400" aria-hidden />
                <h3 className="mt-4 font-semibold text-stone-50">{r.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-stone-400">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden />{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="seguranca" aria-labelledby="security-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container grid items-start gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHeader id="security-title" title="Segurança que você consegue explicar ao cliente" subtitle="Controles pensados para quem responde pelo certificado digital de um escritório." center={false} />
            <ul className="mt-8 space-y-5">
              {SECURITY.map((s, i) => (
                <li key={s.title} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" aria-hidden />
                  <div>
                    <h3 className="font-medium text-stone-100">{s.title}</h3>
                    <p className="mt-1 text-sm text-stone-400">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ "--d": "150ms" } as React.CSSProperties} className="min-w-0 overflow-hidden rounded-xl border border-stone-800 bg-stone-900/40">
            <div className="border-b border-stone-800 bg-stone-900/70 px-5 py-4">
              <h3 className="font-semibold text-stone-50">{PRIVACY.title}</h3>
              <p className="mt-1 text-sm text-stone-400">{PRIVACY.subtitle}</p>
            </div>
            <dl className="divide-y divide-stone-800">
              {PRIVACY.rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <dt className="text-sm font-medium text-teal-300">{k}</dt>
                  <dd className="text-sm leading-relaxed text-stone-400">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="download" aria-labelledby="download-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container max-w-3xl">
          <SectionHeader id="download-title" title="Baixe o Certificate Plus" subtitle={release ? `Versão atual: ${release.version}. O app se atualiza sozinho depois de instalado.` : "Peça acesso e receba o instalador da sua organização."} />
          {release && release.downloads.length > 0 ? (
            <ul data-reveal className="mt-10 space-y-4">
              {release.downloads.map((d) => (
                <li key={d.os} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-stone-50">{d.label}</p>
                    {d.sha256 && <p className="mt-1 truncate font-mono text-xs text-stone-500" title={d.sha256}>SHA-256 {d.sha256}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {d.sha256 && <CopyButton text={d.sha256} label="Copiar hash" copiedLabel="Copiado" />}
                    <a href={d.url} rel="noopener" className="btn-primary !py-2"><Download className="h-4 w-4" aria-hidden /> Baixar</a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-center">
              <a href={mailto} className="btn-primary"><Mail className="h-4 w-4" aria-hidden /> Solicitar acesso</a>
            </p>
          )}
          <p className="mt-6 text-center text-sm text-stone-500">Baixe apenas por esta página. Em Macs com chip M1, M2 ou M3 use a versão Apple Silicon.</p>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container max-w-3xl">
          <SectionHeader id="faq-title" title="Dúvidas frequentes" />
          <div data-reveal className="mt-10 divide-y divide-stone-800 rounded-xl border border-stone-800 bg-stone-900/40">
            {FAQ.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-stone-100 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-teal-400 transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="border-t border-stone-800/80 py-14 sm:py-20 lg:py-24">
        <div className="page-container">
          <div data-reveal className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-stone-900/60 px-5 py-12 text-center sm:px-6 sm:py-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(20,184,166,0.18),transparent)]" />
            <h2 id="cta-title" className="relative text-2xl font-semibold tracking-tight text-stone-50 sm:text-3xl lg:text-4xl">Pronto para tirar o certificado do pen drive?</h2>
            <p className="relative mt-3 text-stone-400">Fale com a gente e coloque a sua equipe para trabalhar com acesso controlado e auditável.</p>
            <div id="contato" className="relative mx-auto mt-8 max-w-2xl scroll-mt-24"><LeadForm source="cta-principal" wide /></div>
            <p className="relative mt-6"><a href="#seguranca" className="btn-secondary">Ver segurança</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
