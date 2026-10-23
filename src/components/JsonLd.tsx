type Node = Record<string, unknown>;

/**
 * Dados estruturados (schema.org). Cada objeto vai no próprio <script>, cada um com seu "@context":
 * um array na raiz quebra leitores que esperam "@context" no topo do JSON.
 * Escapa "<" para o JSON nunca fechar a tag <script>.
 */
export default function JsonLd({ data }: { data: Node | Node[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
