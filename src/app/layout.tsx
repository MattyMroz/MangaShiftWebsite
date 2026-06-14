import type { Metadata } from "next";
// ── Typografia: 3 pary do wyboru. AKTYWNA = para 1 (zmień import + .variable niżej).
//    Para 1 (domyślna): Inter Tight (display) + Playfair Display (serif emfaza) + Inter (body) + JetBrains Mono
//    Para 2: Noto Serif JP + Noto Sans JP + JetBrains Mono   (japoński, manga)
//    Para 3: Cormorant Garamond + Inter + IBM Plex Mono      (luksusowy książkowy)
import { Inter_Tight, Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/widgets/Header/ui/Header";
import { InkBackground } from "@/shared/ui/InkBackground/InkBackground";
import "./globals.css";

// ── PARA 1 (aktywna) ──────────────────────────────────────────────────────────
const display = Inter_Tight({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800", "900"] });
const serif = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "500", "600"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

// ── PARA 2 (zakomentowana — japońska, yohaku) ─────────────────────────────────
// import { Noto_Serif_JP, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
// const display = Noto_Serif_JP({ variable: "--font-display", subsets: ["latin"], weight: ["600","700","900"] });
// const serif   = Noto_Serif_JP({ variable: "--font-serif",   subsets: ["latin"], weight: ["500","600"] });
// const body    = Noto_Sans_JP({  variable: "--font-body",    subsets: ["latin"], weight: ["300","400","500"] });
// const mono    = JetBrains_Mono({ variable: "--font-mono",   subsets: ["latin"], weight: ["400","500"] });

// ── PARA 3 (zakomentowana — luksusowy książkowy, eguide) ──────────────────────
// import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
// const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500","600","700"] });
// const serif   = Cormorant_Garamond({ variable: "--font-serif",   subsets: ["latin"], style: ["italic"], weight: ["500","600"] });
// const body    = Inter({ variable: "--font-body", subsets: ["latin"], weight: ["300","400","500"] });
// const mono    = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400","500"] });

export const metadata: Metadata = {
  title: {
    default: "MangaShift - Automatic Manga to Video Generator",
    template: "%s | MangaShift"
  },
  description: "Transform manga and manhwa into immersive audiovisual experiences. MangaShift automatically generates videos from static pages using AI-powered OCR, translation, and text-to-speech technology.",
  keywords: ["manga", "manhwa", "video generator", "AI", "OCR", "translation", "text-to-speech", "anime", "webtoon"],
  authors: [{ name: "MangaShift Team" }],
  creator: "MangaShift",
  publisher: "MangaShift",
  metadataBase: new URL("https://mattymroz.github.io/MangaShiftWebsite"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mattymroz.github.io/MangaShiftWebsite",
    siteName: "MangaShift",
    title: "MangaShift - Automatic Manga to Video Generator",
    description: "Transform manga and manhwa into immersive audiovisual experiences with AI-powered technology.",
    images: [
      {
        url: "/images/chainsawman/RezeArc.webp",
        width: 644,
        height: 1024,
        alt: "MangaShift - Chainsaw Man Demo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MangaShift - Automatic Manga to Video Generator",
    description: "Transform manga and manhwa into immersive audiovisual experiences with AI-powered technology.",
    images: ["/images/chainsawman/RezeArc.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico"
  }
};

// Inline script to prevent FOUC (Flash of Unstyled Content)
const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme') || 'light';
      var effects = localStorage.getItem('effects');
      var root = document.documentElement;
      var bg = theme === 'dark' ? '#14131a' : '#efeae0';
      root.setAttribute('data-theme', theme);
      root.setAttribute('data-effects', effects === 'false' ? 'disabled' : 'enabled');
      root.style.colorScheme = theme;
      root.style.backgroundColor = bg;
      document.body && (document.body.style.backgroundColor = bg);
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      // Update meta theme-color
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', bg);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden" style={{ backgroundColor: '#efeae0' }}>
      <head>
        <meta name="theme-color" content="#efeae0" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable} antialiased overflow-x-hidden`}
      >
        <InkBackground />
        <Header />
        <main className="min-h-screen relative z-10 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
