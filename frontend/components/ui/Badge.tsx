import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "subtle" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white border border-white/10",
    subtle: "bg-transparent text-white/60 border border-white/15",
    outline: "border border-white/25 text-white/70",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
