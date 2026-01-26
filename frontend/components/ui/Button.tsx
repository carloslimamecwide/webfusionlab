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
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-[0.12em] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[color:var(--accent)] text-[color:var(--background)] border border-transparent shadow-[0_10px_30px_rgba(216,242,106,0.2)] hover:bg-[color:var(--accent-strong)]",
    secondary:
      "bg-transparent text-[color:var(--foreground)] border border-[color:var(--border-strong)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]",
    outline:
      "bg-transparent text-[color:var(--foreground)] border border-[color:var(--border)] hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface)]",
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
