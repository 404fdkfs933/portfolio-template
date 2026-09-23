import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${site.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="shell pt-10 md:pt-14">
      <div className="max-w-[46rem]">
        <p className="label mb-4">Contact</p>
        <h1 className="font-display font-semibold text-[2.2rem] leading-[1.07] tracking-[-0.02em] text-ink md:text-[3rem]">Commissions, sales, exhibitions, or just to say hello.</h1>
        <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-ink-2">Email is the best way to reach me. I answer everything, usually within a few days.</p>
        <a href={`mailto:${site.email}`} className="group mt-8 inline-flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-full border border-line-strong text-ink transition-colors group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent-ink">
            <Mail className="size-5" />
          </span>
          <span className="text-[1.1rem] text-ink group-hover:text-accent-ink">{site.email}</span>
        </a>
        {site.social.length ? (
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {site.social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="label hover:text-ink">
                {s.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
