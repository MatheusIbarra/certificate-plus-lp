// Gera public/og-image.png (1200x630). Uso: node scripts/make-og.mjs  (requer `sharp`, ex.: NODE_PATH de outro projeto)
import sharp from "sharp";
const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#0c0a09"/>
<defs><radialGradient id="g" cx="75%" cy="0%" r="70%"><stop offset="0" stop-color="#14b8a6" stop-opacity=".28"/><stop offset="1" stop-color="#14b8a6" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<g transform="translate(80,80) scale(.25)"><rect width="512" height="512" rx="96" fill="#0E1320"/><path d="M256 64L416 120V256C416 346 348 414 256 448C164 414 96 346 96 256V120L256 64Z" fill="#2DD4BF" stroke="#5EEAD4" stroke-width="12" stroke-linejoin="round"/><path d="M256 112V368M176 176H336M176 176L144 256H208L176 176ZM336 176L304 256H368L336 176ZM200 368H312" stroke="#090C13" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>
<text x="225" y="148" font-family="Helvetica, Arial, sans-serif" font-size="44" font-weight="700" fill="#fafaf9">Certificate<tspan fill="#5eead4">Plus</tspan></text>
<text x="80" y="330" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Tribunais PJe com</text>
<text x="80" y="410" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#2dd4bf">certificado digital na nuvem</text>
<text x="80" y="500" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#a8a29e">Aplicativo para macOS e Windows. Acesso controlado e auditável.</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
