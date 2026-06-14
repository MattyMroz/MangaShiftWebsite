import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/widgets/Header/ui/Header";
import { InkBackground } from "@/shared/ui/InkBackground/InkBackground";
import { SideRails } from "@/shared/ui/SideRails/SideRails";
import "./globals.css";

const display = Inter_Tight({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800", "900"] });
const serif = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "500", "600"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

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
        className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable} antialiased overflow-x-hidden select-none`}
      >
        <InkBackground />
        <SideRails />
        <Header />
        {children}
      </body>
    </html>
  );
}
