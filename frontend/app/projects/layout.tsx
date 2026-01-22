import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos - WebFusionLab",
  description:
    "Portfólio de projetos desenvolvidos pela WebFusionLab. Websites, apps mobile, plataformas SaaS e soluções com AI.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
