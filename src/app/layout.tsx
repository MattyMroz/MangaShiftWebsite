import type { Metadata } from "next";
import { Montserrat, Inter, Noto_Sans_JP } from "next/font/google";
import { Header } from "@/widgets/Header/ui/Header";
import { JapaneseBackground } from "@/shared/ui/JapaneseBackground/JapaneseBackground";
import SplashCursor from "@/shared/ui/SplashCursor/SplashCursor";
import LightRays from "@/shared/ui/LightRays/LightRays";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

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
      var theme = localStorage.getItem('theme') || 'dark';
      var effects = localStorage.getItem('effects');
      var root = document.documentElement;
      var bg = theme === 'dark' ? '#0a0a0a' : '#fcfcfc';
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
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${notoSansJP.variable} antialiased overflow-x-hidden`}
      >
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          CAPTURE_RESOLUTION={512}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={1.5}
          PRESSURE={0.4}
          PRESSURE_ITERATIONS={50}
          CURL={30}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          SHADING={true}
          COLOR_UPDATE_SPEED={3}
          BACK_COLOR={{ r: 0.5, g: 0, b: 0 }}
          TRANSPARENT={true}
        />
        <JapaneseBackground />
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={1.0}
            pulsating={false}
            fadeDistance={1.0}
            saturation={1.0}
            followMouse={false}
            mouseInfluence={0.5}
            noiseAmount={0.0}
            distortion={0.0}
            className="w-full h-full"
            hideInLightMode={true}
          />
        </div>
        <Header />
        <main className="min-h-screen relative z-10 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
