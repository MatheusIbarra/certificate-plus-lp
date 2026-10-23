# Certificate Plus: site

Landing page do aplicativo desktop (`certificate-plus-electron`). Mesmo design do `resolve-hub/tunnel` (Vinext, Tailwind 3, stone + teal, Geist), em pt-BR. O único backend é o formulário de contato (`/api/leads`), que repassa à `certificate-plus-api`.

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3002
npm run typecheck && npm run build
```

| Variável | Para quê |
|---|---|
| `SITE_URL` | URL pública (canonical, sitemap, Open Graph) |
| `UPDATES_BASE_URL` | Pasta pública com `latest.json` (a mesma do auto-update do app). Os botões de download e a versão vêm dele; sem ele, aparece "Solicitar acesso" |
| `CONTACT_EMAIL` | E-mail de contato (rodapé e dados estruturados) |
| `LEADS_API_URL` / `LEADS_API_KEY` | API e service key (`public.leads.write`) para onde o formulário comercial envia os leads |

## Regra de conteúdo

Este site é público. **Não descreva o funcionamento interno** (túneis, proxy, interceptação, scripts, protocolos, hosts, arquitetura): isso é segredo de negócio. Fale só do que o usuário vê e controla. Os textos ficam em `src/content.ts`.

## Segurança do site

- Cabeçalhos em `src/middleware.ts`: CSP restritiva (sem origens externas, sem frames), HSTS, nosniff, Referrer-Policy, Permissions-Policy. O `eval` bloqueado que aparece no console em `dev` é do React em desenvolvimento, não ocorre em produção.
- `src/lib/release.ts` trata `latest.json` como dado externo: só gera link `https` dentro da base configurada, com versão e SHA-256 válidos; falha = botão de pedir acesso.
- Um formulário (`src/components/LeadForm.tsx` → `src/app/api/leads/route.ts`): honeypot, validação no servidor, checagem de `Origin` e rate limit por IP (5 por 10 min na instância, mais o limite firme da API). A origem (UTMs, referrer, página de entrada) fica em `sessionStorage`; sem cookies nem scripts de terceiros.

## Pendências

- Domínio definitivo (`SITE_URL`) e e-mail de contato.
- Instaladores ainda sem assinatura de editor (aviso no FAQ); trocar o texto quando houver assinatura.
- Revisão jurídica/LGPD da seção "Transparência" (os docs do app marcam o texto final como decisão humana).
- `scripts/make-og.mjs` gera `public/og-image.png` (precisa de `sharp`).
