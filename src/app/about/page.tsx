import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getPage, getProjects } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const body = getPage("about") ?? "Write your story in `content/about.md`. It appears here.";
  const n = getProjects().length;
  return (
    <div className="shell pt-10 md:pt-14">
      <section className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="label mb-4">About</p>
          <div className="prose">
            <Mdx source={body} />
          </div>
        </div>
        <aside className="lg:pt-10">
          <div className="panel ticks p-6">
            <p className="font-display text-[1.3rem] font-semibold text-ink">{site.name}</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">{site.description}</p>
            <div className="mt-6 grid gap-2 border-t border-line pt-5 text-[0.9rem]">
              <p className="label">Get in touch</p>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-ink hover:text-accent-ink">
                <Mail className="size-4" /> {site.email}
              </a>
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="text-ink-2 hover:text-accent-ink">
                  {s.label}
                </a>
              ))}
              <p className="mt-2 font-mono text-[0.7rem] text-ink-3">{n} series on this site</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
