import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${site.name}.`,
  alternates: { canonical: "/contact" },
};

/** Half white, half grey. The title is drawn in outline so the email is the loudest thing. */
export default function ContactPage() {
  return (
    <div className="grid min-h-[100dvh] md:grid-cols-2">
      <div className="flex flex-col justify-center px-5 pt-28 pb-16 md:px-12 md:pt-32">
        <h1 className="display display-outline -ml-[0.04em] text-[clamp(3.6rem,11vw,9rem)]">Contact</h1>
        <p className="mt-8 max-w-[44ch] text-[1.02rem] leading-relaxed text-ink-2">
          Commissions, sales, exhibitions, or just to say hello. Email is the best way to reach me; I answer everything, usually within a few days.
        </p>
        <a href={`mailto:${site.email}`} className="mt-8 inline-block text-[clamp(1.2rem,2.4vw,1.7rem)] font-bold text-accent-ink hover:text-accent">
          {site.email}
        </a>
        {site.address.length ? (
          <address className="mt-8 text-[0.95rem] font-semibold not-italic leading-relaxed text-ink">
            {site.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        ) : null}
        {site.social.length ? (
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-2">
            {site.social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="label hover:text-accent-ink">
                {s.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <div className="hidden bg-bg-2 md:block" aria-hidden />
    </div>
  );
}
