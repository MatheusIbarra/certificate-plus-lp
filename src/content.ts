import { Eye, FileSignature, Gauge, KeyRound, Layers, LifeBuoy, LockKeyhole, RefreshCw, ScrollText, ShieldCheck, Users, type LucideIcon } from "lucide-react";

// Texto público. Regra de negócio: descrevemos o que o usuário vê e controla, nunca como a conexão funciona por dentro.

export const NAV = [
  { href: "#recursos", label: "Recursos" },
  { href: "#auditoria", label: "Auditoria" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#equipes", label: "Equipes" },
  { href: "#download", label: "Download" },
  { href: "#faq", label: "Dúvidas" },
];

export const HERO = {
  badge: "Aplicativo desktop para macOS e Windows",
  title: "Tribunais PJe com certificado digital,",
  highlight: "sem instalar o certificado no computador.",
  subtitle:
    "O Certificate Plus abre PJe, TRTs, TJs, TRFs, TREs e Justiça Federal já autenticados. O login, o segundo fator e a assinatura acontecem sozinhos, e quem administra o certificado decide quem pode usar.",
  note: "Acesso por conta, criada pelo administrador da sua organização.",
};

export const WHY: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: KeyRound, title: "Certificado fora da máquina", text: "O certificado digital fica sob custódia da plataforma. Não há arquivo .pfx para copiar, nem token para levar de um computador a outro." },
  { icon: Gauge, title: "Do clique ao processo", text: "Escolha o certificado e o sistema. O app cuida do login, do código de verificação e da assinatura enquanto você trabalha." },
  { icon: Layers, title: "Várias sessões, sem mistura", text: "Abra vários tribunais ao mesmo tempo, cada um em uma instância isolada, com abas e navegação próprias." },
  { icon: Users, title: "Quem acessa, você decide", text: "O dono do certificado concede e retira acessos, acompanha o uso e encerra uma sessão quando precisar." },
];

export const STEPS = [
  { title: "Entre com a sua conta", text: "Faça login no app com o e-mail e a senha da sua organização. A primeira senha é trocada no primeiro acesso." },
  { title: "Escolha certificado e sistema", text: "Veja só os certificados liberados para você e o catálogo de tribunais disponíveis." },
  { title: "Trabalhe", text: "O tribunal abre dentro do app, já autenticado. Assine, peticione e consulte como de costume." },
];

export const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: ScrollText, title: "Catálogo sempre atualizado", description: "Novos tribunais e ajustes chegam pela plataforma, sem esperar uma nova versão do aplicativo." },
  { icon: FileSignature, title: "Assinatura integrada", description: "Fluxos de assinatura dos tribunais funcionam dentro do app, sem instalar assinador à parte." },
  { icon: ShieldCheck, title: "Segundo fator automático", description: "Códigos de verificação (OTP) exigidos pelo PJe são preenchidos para quem tem permissão." },
  { icon: Layers, title: "Multi-instância", description: "Vários acessos simultâneos, identificados por cor, cada um com cookies e armazenamento separados." },
  { icon: Gauge, title: "Progresso à vista", description: "Uma janela mostra cada etapa da conexão e avisa, em português claro, quando algo exige atenção." },
  { icon: Eye, title: "Acompanhamento para o dono", description: "Sessões ativas, trilha de atividade e print sob pedido, para o dono do certificado acompanhar e encerrar um acesso." },
  { icon: LockKeyhole, title: "Revogação imediata", description: "Acesso removido, usuário bloqueado ou certificado desativado: o app fecha o sistema em segundos." },
  { icon: LifeBuoy, title: "Suporte dentro do app", description: "Abra chamados e acompanhe respostas sem sair da ferramenta, com o contexto do acesso anexado automaticamente." },
  { icon: RefreshCw, title: "Atualização automática", description: "Novas versões são baixadas, conferidas por hash e instaladas sozinhas." },
];

export const SYSTEMS = [
  { tag: "Trabalhista", title: "TRT1 a TRT24", text: "PJe com login por certificado e verificação em duas etapas." },
  { tag: "Estadual", title: "Tribunais de Justiça", text: "PJe estadual e fluxos simplificados, como TJRO, TJMA, TJMG e TJDF." },
  { tag: "Federal", title: "TRF1 a TRF6 e Justiça Federal", text: "Incluindo TRF3 e as seções judiciárias." },
  { tag: "Eleitoral", title: "TREs", text: "PJe eleitoral com o fluxo próprio de cada regional." },
  { tag: "PJe Cloud", title: "PJe Cloud e SSO", text: "Autenticação centralizada do PJe, sem etapas manuais." },
];

export const AUDIT = {
  title: "Auditoria contínua, com o dono no controle",
  subtitle: "Cada acesso ao certificado deixa rastro e pode ser acompanhado, conferido e encerrado enquanto acontece.",
  pillars: [
    { icon: "trail", title: "Trilha de atividade contínua", text: "Entradas, sistema usado, abas, navegação e cliques ficam registrados em ordem cronológica, com CPF, CNPJ e número de processo mascarados." },
    { icon: "shot", title: "Print em tempo real", text: "Durante um acesso, o dono do certificado pede uma captura da tela do tribunal e a vê na hora. O usuário é avisado, e a imagem é apagada quando a visualização é fechada." },
    { icon: "revoke", title: "Revogação na hora", text: "Viu algo estranho? Um clique encerra a sessão: o app fecha as abas e apaga os dados do acesso em segundos, e o histórico continua disponível." },
  ],
  note: "Transparência primeiro: quem usa o app é informado do registro e de cada pedido de captura.",
};

export const ROLES = [
  { title: "Membro", items: ["Usa os certificados liberados", "Abre vários tribunais em paralelo", "Pede ajuda pelo suporte do app"] },
  { title: "Dono do certificado", items: ["Concede e retira acessos", "Acompanha sessões ativas e histórico", "Pede print em tempo real e encerra a sessão na hora"] },
  { title: "Administrador", items: ["Gerencia usuários e certificados", "Consulta auditoria e atividade", "Bloqueia contas e revoga acessos"] },
];

export const SECURITY = [
  { title: "Certificado nunca instalado no computador", text: "Quem usa o app não recebe o arquivo do certificado nem a senha dele. Perder ou trocar de computador não expõe o certificado." },
  { title: "Acesso por conta e por permissão", text: "Cada pessoa entra com a própria conta e vê apenas o que lhe foi liberado. Senhas iniciais precisam ser trocadas no primeiro acesso." },
  { title: "Revogação em tempo real", text: "Sessão revogada, usuário bloqueado ou certificado desativado encerram o acesso: abas, cookies e dados da sessão são apagados." },
  { title: "Navegação restrita", text: "O navegador embutido só abre os endereços do sistema escolhido e os do login oficial. Links para fora são bloqueados." },
  { title: "Sessões isoladas", text: "Cada instância guarda seus próprios cookies e dados. Fechar uma não afeta nem expõe as outras." },
  { title: "Auditoria contínua", text: "Logins, sessões, bloqueios, concessões e a atividade de cada acesso ficam registrados e consultáveis por quem administra." },
  { title: "Atualizações verificadas", text: "Cada atualização tem hash SHA-256 conferido antes da instalação. Se algo não bate, nada é instalado." },
];

export const PRIVACY = {
  title: "Transparência sobre o que é registrado",
  subtitle: "Quem usa o app precisa saber o que a organização enxerga. É isto, sem letra miúda:",
  rows: [
    ["Registrado", "Acessos e sessões, sistema usado, momento e dispositivo; cliques e navegação (com CPF, CNPJ e número de processo mascarados antes de sair do seu computador)."],
    ["Captura de tela", "Só sob pedido do dono do certificado ou de um administrador. O app avisa você, a imagem é mantida apenas temporariamente e apagada quando quem pediu fecha a visualização."],
    ["Nunca exposto", "O certificado digital e a sua senha de acesso ao app. Nenhum dos dois aparece em registros ou telas."],
    ["Retenção", "Registros de atividade são mantidos por prazo limitado e depois apagados automaticamente."],
  ] as [string, string][],
};

export const FAQ = [
  { q: "Preciso instalar o certificado digital no meu computador?", a: "Não. O certificado fica sob custódia da plataforma e é usado apenas durante as sessões autorizadas para você." },
  { q: "Como consigo uma conta?", a: "As contas são criadas pelo administrador da sua organização. Se você é responsável por um escritório ou área, fale conosco para contratar." },
  { q: "Quais tribunais e sistemas funcionam?", a: "Mais de 180 tribunais na versão atual: PJe de TRTs, TJs, TRFs, TREs e Justiça Federal, além do PJe Cloud. O catálogo cresce sem exigir nova versão do app." },
  { q: "O dono do certificado consegue ver o que estou fazendo?", a: "Ele acompanha a trilha de atividade e pode pedir uma captura da tela do tribunal durante o acesso. Você é avisado a cada pedido. Ele também pode encerrar a sessão na hora." },
  { q: "O que o administrador consegue ver sobre o meu uso?", a: "Acessos, sessões e atividade de navegação, sempre com CPF, CNPJ e números de processo mascarados. Veja a tabela de transparência acima." },
  { q: "O que acontece se meu acesso for removido?", a: "Em até cerca de 20 segundos o app fecha as abas, apaga os dados da sessão e leva você de volta ao login." },
  { q: "O instalador é assinado?", a: "As versões atuais ainda não passam por assinatura de editor reconhecida. Por isso o macOS ou o Windows podem pedir confirmação na primeira abertura. Baixe só desta página e, no Windows, confira o SHA-256 publicado antes de instalar." },
  { q: "Como as atualizações chegam?", a: "O app verifica uma nova versão ao abrir, baixa, confere o hash e instala. No Windows reabre sozinho; no macOS troca o aplicativo ao fechar." },
  { q: "Quais sistemas operacionais são suportados?", a: "macOS (Apple Silicon) e Windows 64 bits. Em Macs M1, M2 ou M3 use sempre a versão Apple Silicon." },
];
