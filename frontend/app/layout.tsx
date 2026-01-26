import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="pt-PT" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
