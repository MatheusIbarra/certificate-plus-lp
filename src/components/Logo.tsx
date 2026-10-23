/** Marca do app (escudo com balança), igual ao ícone do aplicativo desktop. */
export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width={28} height={28} viewBox="0 0 512 512" aria-hidden className="shrink-0">
        <rect width="512" height="512" rx="96" fill="#0E1320" />
        <path d="M256 64L416 120V256C416 346 348 414 256 448C164 414 96 346 96 256V120L256 64Z" fill="#2DD4BF" stroke="#5EEAD4" strokeWidth="12" strokeLinejoin="round" />
        <path d="M256 112V368M176 176H336M176 176L144 256H208L176 176ZM336 176L304 256H368L336 176ZM200 368H312" stroke="#090C13" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="whitespace-nowrap text-lg font-bold tracking-tight text-stone-50">
        Certificate<span className="text-teal-300">Plus</span>
      </span>
    </span>
  );
}
