import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços - WebFusionLab",
  description:
    "Desenvolvimento web, apps mobile, marketing digital, automação com AI e consultoria tech. Soluções digitais completas para o teu negócio.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
