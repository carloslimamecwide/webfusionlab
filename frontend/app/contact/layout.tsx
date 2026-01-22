import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - WebFusionLab",
  description:
    "Entre em contacto connosco para discutir o teu projeto. Estamos prontos para transformar as tuas ideias em realidade digital.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
