import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  size = "lg",
  className = "",
  children,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";
  const subtitleAlignment = align === "center" ? "mx-auto" : "";
  const titleSize = size === "md" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl";
  const subtitleSize = size === "md" ? "text-sm md:text-base" : "text-base md:text-lg";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow && (
        <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--accent)] mb-3">{eyebrow}</div>
      )}
      <h2 className={`${titleSize} font-semibold text-white tracking-tight leading-tight text-balance`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-white/60 max-w-2xl ${subtitleAlignment} ${subtitleSize} leading-relaxed text-balance`}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
