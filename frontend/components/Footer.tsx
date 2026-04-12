import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="max-w-xl">
          <div className="text-sm font-semibold tracking-[0.12em] text-[color:var(--foreground)]">
            <Link href="/">
              Web<span className="text-[color:var(--accent)]">Fusion</span>Lab
            </Link>
          </div>
          <p className="mt-3 text-sm text-[color:var(--muted)]">
            Websites, apps e automacao com foco em clareza, performance e resultado.
          </p>
        </div>

        <div className="space-y-2 text-sm text-[color:var(--muted)] lg:text-right">
          <p>Portugal</p>
          <p>
            <a href="mailto:contact@webfusionlab.pt" className="transition-colors hover:text-[color:var(--foreground)]">
              contact@webfusionlab.pt
            </a>
          </p>
          <p>&copy; {currentYear} WebFusionLab.</p>
        </div>
      </div>
    </footer>
  );
}
