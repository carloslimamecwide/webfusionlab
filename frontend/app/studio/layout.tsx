import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Console - WebFusionLab",
  description: "Area privada para gestao de projetos, com login protegido.",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
