import Link from "next/link";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "onClick">;

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-full text-[11px] font-medium uppercase tracking-[0.35em] transition-all duration-300 inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[color:var(--accent)] text-black border border-transparent hover:bg-[color:var(--accent-strong)]",
    secondary: "bg-transparent text-white/70 border border-white/20 hover:border-white hover:text-white",
    outline: "bg-white/5 text-white border border-white/30 hover:border-white hover:bg-white/10",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
