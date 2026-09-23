import Link from "next/link";
import { site } from "@/lib/site";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 md:mt-40">
      <div className="shell">
        <div className="border-t-2 border-line-strong pt-8">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="font-display text-[1.15rem] font-bold text-ink">{site.name}</p>
              <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-2">{site.description}</p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="label transition-colors hover:text-ink">
                  {l.label}
                </Link>
              ))}
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="label transition-colors hover:text-ink">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line py-5">
            <p className="font-mono text-[0.7rem] text-ink-3">
              © {new Date().getFullYear()} {site.name} ·{" "}
              <a href={`mailto:${site.email}`} className="text-ink-2 underline underline-offset-4 hover:text-accent-ink">
                {site.email}
              </a>
            </p>
            <p className="font-mono text-[0.7rem] text-ink-3">All work © the artist. Please ask before reusing an image.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
