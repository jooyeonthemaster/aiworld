import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Grain from "@/components/ui/Grain";

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-noto-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "거인의 어깨 위에서 — AI 시대에 살아남기",
  description:
    "2026 인터랙티브 키노트. 당신은 지금, AI를 얼마나 활용하고 있습니까?",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07060a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${serif.variable} ${mono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-ink text-bone font-body antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <Grain />
      </body>
    </html>
  );
}
