import Link from "next/link";
import { site } from "@/lib/site";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-bg-2">
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-8 py-12 md:py-16">
        <div>
          <p className="font-script text-[2.2rem] font-bold leading-none text-accent">{site.name}</p>
          <a href={`mailto:${site.email}`} className="mt-4 block text-[0.95rem] font-semibold text-ink hover:text-accent-ink">
            {site.email}
          </a>
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="label hover:text-accent-ink">
              {l.label}
            </Link>
          ))}
          {site.social.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="label hover:text-accent-ink">
              {s.label}
            </a>
          ))}
        </nav>
        <p className="w-full text-[0.75rem] text-ink-3">
          © {new Date().getFullYear()} {site.name}. All work © the artist. Please ask before reusing an image.
        </p>
      </div>
    </footer>
  );
}
