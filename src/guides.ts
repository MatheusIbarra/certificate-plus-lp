// Guias informativos. Mesma regra do restante do site: falamos do que o usuário vê e controla, nunca de como a conexão funciona por dentro.
// TODO: confirmar informação com o time: tipos de certificado aceitos (A1/A3, e-CPF/e-CNPJ), se a empresa emite certificados e prazos/preços. Nada disso é afirmado nos guias.

export type Guide = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { id: string; h2: string; paragraphs?: string[]; bullets?: string[]; table?: boolean }[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "certificado-digital-em-nuvem",
    title: "Certificado digital em nuvem: o que é | Certificate Plus",
    description: "Entenda o que é certificado digital em nuvem, quando faz sentido para escritórios de advocacia e o que avaliar antes de adotar.",
    h1: "Certificado digital em nuvem: o que é, quando usar e o que avaliar",
    intro: "Certificado digital em nuvem é o uso do certificado sem que ele fique instalado no computador ou em um token de quem trabalha. Para escritórios de advocacia, isso muda como a equipe acessa o PJe e como o responsável acompanha quem usou o certificado.",
    sections: [
      {
        id: "o-que-e",
        h2: "O que é certificado digital em nuvem",
        paragraphs: [
          "No modelo tradicional, o certificado vive onde a pessoa está: como arquivo no computador ou em um token ou cartão. No modelo em nuvem, o certificado permanece sob custódia de uma plataforma e é usado apenas em sessões que o dono do certificado autorizou.",
          "Na prática, quem usa não recebe o arquivo nem a senha do certificado. Entra com a própria conta e trabalha no sistema do tribunal já autenticado.",
        ],
      },
      {
        id: "quando-faz-sentido",
        h2: "Quando faz sentido para um escritório de advocacia",
        bullets: [
          "Várias pessoas (advogados, estagiários, equipe de apoio) precisam usar o mesmo certificado.",
          "A equipe trabalha em computadores diferentes ou de forma remota.",
          "O responsável pelo certificado quer saber quem usou, quando e em qual tribunal.",
          "É preciso encerrar o acesso de alguém na hora, sem trocar o certificado.",
        ],
      },
      {
        id: "riscos-do-modelo-tradicional",
        h2: "Riscos do modelo tradicional",
        bullets: [
          "Arquivo de certificado e senha copiados para vários computadores, sem controle de onde estão.",
          "Token ou cartão que passa de mão em mão e fica preso a um computador por vez.",
          "Falta de registro de quem usou o certificado em cada acesso.",
          "Troca de computador ou desligamento de alguém sem como retirar o acesso com segurança.",
        ],
      },
      {
        id: "o-que-avaliar",
        h2: "O que avaliar antes de adotar uma solução",
        bullets: [
          "Quem concede e retira acessos, e se o dono do certificado mantém esse controle.",
          "Se há trilha de atividade e como dados sensíveis (CPF, CNPJ, número de processo) são tratados nos registros.",
          "Se é possível revogar um acesso imediatamente.",
          "Se quem usa é informado do que é registrado, com transparência sobre privacidade.",
          "Quais tribunais e sistemas são suportados.",
          "Como as atualizações do aplicativo são conferidas antes de instalar.",
        ],
      },
      {
        id: "regras-do-certificado",
        h2: "Regras do seu certificado",
        paragraphs: ["Cada certificado e cada tribunal têm regras próprias. Confirme com a autoridade certificadora que emitiu o seu certificado e com o tribunal as condições de uso que se aplicam à sua organização."],
      },
      {
        id: "certificate-plus",
        h2: "Como o Certificate Plus se encaixa",
        paragraphs: ["O Certificate Plus é um aplicativo para macOS e Windows que abre PJe de TRTs, TJs, TRFs e TREs já autenticado, com controle de acessos pelo dono do certificado, auditoria contínua, print em tempo real e revogação imediata."],
      },
    ],
    faq: [
      { q: "Certificado digital em nuvem é seguro?", a: "Depende dos controles da solução. Vale conferir se há acesso por conta e permissão, trilha de atividade, revogação imediata, sessões isoladas e atualizações verificadas, e se quem usa é informado do que é registrado." },
      { q: "Preciso trocar o meu certificado para usar em nuvem?", a: "Esta página não substitui a orientação da sua autoridade certificadora. Fale com o time do Certificate Plus para saber como o certificado da sua organização é utilizado." },
      { q: "Posso tirar o certificado do computador dos advogados?", a: "Sim, esse é o objetivo: quem usa o app não recebe o arquivo do certificado nem a senha dele." },
    ],
    related: ["certificado-a1-a3-ou-nuvem", "pje-sem-token"],
  },
  {
    slug: "certificado-a1-a3-ou-nuvem",
    title: "Certificado A1, A3 ou nuvem: como escolher | Certificate Plus",
    description: "Compare certificado A1 (arquivo), A3 (token ou cartão) e uso em nuvem em mobilidade, controle de acesso e rastreabilidade para advocacia.",
    h1: "Certificado A1, A3 ou em nuvem: qual escolher para o escritório?",
    intro: "A1 e A3 descrevem onde o certificado fica guardado: em arquivo ou em token e cartão. O uso em nuvem é uma terceira forma de acessar o certificado. A escolha afeta mobilidade, controle de quem usa e rastreabilidade.",
    sections: [
      {
        id: "a1",
        h2: "Certificado A1: arquivo no computador",
        paragraphs: ["O A1 é um arquivo instalado no computador. É prático para automações, mas quem tiver o arquivo e a senha consegue usá-lo, e cada cópia é mais um lugar a proteger."],
      },
      {
        id: "a3",
        h2: "Certificado A3: token ou cartão",
        paragraphs: ["O A3 fica em uma mídia física, protegida por PIN. Evita copiar o arquivo, mas prende o uso a quem está com a mídia e ao computador onde ela está ligada."],
      },
      {
        id: "nuvem",
        h2: "Uso em nuvem",
        paragraphs: ["No uso em nuvem, o certificado fica sob custódia da plataforma e cada pessoa acessa com a própria conta. O dono do certificado define quem usa e pode encerrar um acesso quando precisar."],
      },
      { id: "comparativo", h2: "Comparativo", table: true },
      {
        id: "como-escolher",
        h2: "Como escolher",
        bullets: [
          "Uma pessoa, um computador: A1 ou A3 costumam bastar.",
          "Várias pessoas usando o mesmo certificado: pesa o controle de acesso e o registro de uso.",
          "Equipe remota ou que troca de computador: pesa não depender de arquivo ou mídia física.",
          "Necessidade de auditoria: avalie trilha de atividade e revogação imediata.",
        ],
      },
      {
        id: "regras-do-certificado",
        h2: "Regras do seu certificado",
        paragraphs: ["Tipos, prazos e condições de uso variam por autoridade certificadora e por sistema. Confirme com quem emitiu o seu certificado e com o tribunal antes de decidir."],
      },
    ],
    faq: [
      { q: "O Certificate Plus é um tipo de certificado?", a: "Não. É o aplicativo que dá acesso controlado ao certificado digital da sua organização." },
      { q: "Qual é mais seguro: A1, A3 ou nuvem?", a: "Não há resposta única. Segurança depende de quem tem acesso ao certificado, de como o uso é controlado e de haver registro. Compare esses pontos na tabela acima." },
    ],
    related: ["certificado-digital-em-nuvem", "pje-sem-token"],
  },
  {
    slug: "pje-sem-token",
    title: "PJe sem token: como acessar os tribunais | Certificate Plus",
    description: "Veja como acessar o PJe de TRTs, TJs, TRFs e TREs sem depender de token no computador e como manter controle de quem usa.",
    h1: "PJe sem token: como acessar os tribunais com certificado digital",
    intro: "Depender de um token para entrar no PJe prende o trabalho a um computador e a uma pessoa por vez. Existe uma forma de acessar os tribunais sem token no computador e ainda saber quem acessou.",
    sections: [
      {
        id: "problemas-do-token",
        h2: "Onde o token costuma atrapalhar",
        bullets: [
          "Só funciona no computador em que está ligado.",
          "Passa de mão em mão quando mais de uma pessoa precisa do certificado.",
          "Exige configurar navegador e assinador para cada máquina.",
          "Não deixa registro de quem usou.",
        ],
      },
      {
        id: "alternativa",
        h2: "Alternativa: acessar por conta, com o certificado em nuvem",
        paragraphs: [
          "Com o Certificate Plus, a pessoa entra no app com a própria conta, escolhe o certificado liberado para ela e o sistema do tribunal. O tribunal abre dentro do app já autenticado, com login, código de verificação e assinatura integrados.",
          "Não há arquivo para copiar nem token para levar entre computadores, e o app funciona em macOS e Windows.",
        ],
      },
      {
        id: "tribunais",
        h2: "Tribunais e sistemas",
        paragraphs: ["O catálogo atual reúne mais de 180 tribunais: PJe de TRT1 a TRT24, Tribunais de Justiça, TRF1 a TRF6 e Justiça Federal, TREs e PJe Cloud. O catálogo evolui sem exigir nova versão do app."],
      },
      {
        id: "controle",
        h2: "Controle de quem acessa",
        bullets: [
          "O dono do certificado concede e retira acessos.",
          "A trilha de atividade registra os acessos, com CPF, CNPJ e número de processo mascarados.",
          "O dono pode pedir um print em tempo real; o usuário é avisado.",
          "Um clique encerra a sessão e apaga os dados do acesso.",
        ],
      },
      {
        id: "como-comecar",
        h2: "Como começar",
        paragraphs: ["As contas são criadas pelo administrador da sua organização. Se você é responsável por um escritório ou área, solicite acesso pela página inicial."],
      },
    ],
    faq: [
      { q: "Preciso do token para usar o Certificate Plus?", a: "Não. Quem usa o app não precisa ter o certificado nem token no computador." },
      { q: "Funciona em qualquer tribunal?", a: "O catálogo atual tem mais de 180 tribunais PJe, e novos chegam pela plataforma. Confira a lista de sistemas na página inicial." },
    ],
    related: ["certificado-digital-em-nuvem", "certificado-a1-a3-ou-nuvem"],
  },
];

export function getGuide(slug: string): Guide {
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guia não encontrado: ${slug}`);
  return g;
}
