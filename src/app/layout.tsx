import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/ui/Grain";
import { ThemeProvider } from "@/lib/theme";

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const switzer = localFont({
  src: [
    { path: "../fonts/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Switzer-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Switzer-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CUDAI: Creative UI Development with AI",
  description:
    "A premium, hands-on course teaching designers, founders, and builders to ship award-winning sites and premium product UIs by directing AI to write the code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={switzer.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Grain />
        </ThemeProvider>
      </body>
    </html>
  );
}
