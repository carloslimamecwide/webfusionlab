import type { Metadata } from "next";
import { IBM_Plex_Sans, Syne } from "next/font/google";
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WebFusionLab - Desenvolvimento Web, Apps & Marketing Digital",
  description:
    "Produtos digitais com foco em performance e escala. Desenvolvimento web, apps mobile, marketing digital e automação com AI em Portugal.",
  keywords: ["desenvolvimento web", "apps mobile", "marketing digital", "AI", "Portugal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${syne.variable} ${ibmPlexSans.variable}`}>
      <body>
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
