import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white/[0.02] border border-white/10 rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)]
        ${hover ? "hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
