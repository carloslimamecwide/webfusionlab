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
        bg-[color:var(--surface)] border border-[color:var(--border)] rounded-2xl p-6 shadow-[var(--shadow-soft)]
        ${hover ? "hover:-translate-y-0.5 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)] transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
