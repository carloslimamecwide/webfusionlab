import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "subtle" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[color:var(--surface-strong)] text-[color:var(--foreground)] border border-[color:var(--border)]",
    subtle: "bg-transparent text-[color:var(--muted)] border border-[color:var(--border)]",
    outline: "border border-[color:var(--border-strong)] text-[color:var(--muted)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.18em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
