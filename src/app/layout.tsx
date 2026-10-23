import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { LeadProvider } from "@/components/LeadModal";
import Motion from "@/components/Motion";
import Header from "@/components/Header";
import { GOOGLE_VERIFICATION, INDEXABLE, PAGE_DESCRIPTION, PAGE_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const TITLE = PAGE_TITLE;
const DESCRIPTION = PAGE_DESCRIPTION;
const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Certificate Plus: certificado digital em nuvem para tribunais PJe" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  keywords: ["certificado digital", "certificado digital em nuvem", "certificado digital na nuvem", "certificado digital para advogados", "PJe sem token", "PJe", "tribunais", "TRT", "TJ", "TRF", "TRE", "assinatura digital", "advocacia", "escritório de advocacia", "token A3", "peticionamento"],
  alternates: { canonical: "/", languages: { "pt-BR": "/", "x-default": "/" } },
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: { type: "website", url: "/", siteName: SITE_NAME, locale: "pt_BR", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }] },
  robots: INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  verification: GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : undefined,
};

export const viewport: Viewport = { themeColor: "#0c0a09", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-stone-950 font-sans text-stone-300 antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-teal-500 focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-stone-950">
          Pular para o conteúdo
        </a>
        <Motion />
        <LeadProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LeadProvider>
      </body>
    </html>
  );
}
