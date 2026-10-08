import type { Metadata } from "next";
import Image from "next/image";
import { getPage, getProjects } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
  alternates: { canonical: "/about" },
};

/** Portrait on the left, a numbered opener on the right, then the long story below. */
export default function AboutPage() {
  const body = getPage("about") ?? "Write your story in `content/about.md`. It appears here.";
  const n = getProjects().length;
  return (
    <div>
      <section className="grid min-h-[100dvh] md:grid-cols-[1fr_minmax(320px,42vw)]">
        <div className="relative min-h-[60vh] overflow-hidden bg-bg-2">
          <Image src={site.portrait} alt={site.portraitAlt} fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-8 px-5 pt-12 pb-14 md:px-12 md:pt-28">
          <p className="rule-label">01</p>
          <h1 className="display -ml-[0.04em] text-[clamp(4rem,12vw,9rem)] text-accent">About</h1>
          <p className="max-w-[40ch] text-[1.02rem] leading-relaxed text-ink-2">{site.intro}</p>
          <a href="#story" className="arrow-link">
            <span className="arrow" aria-hidden />
            <span>Read more</span>
          </a>
        </div>
      </section>

      <section id="story" className="shell grid gap-10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:py-24">
        <div>
          <p className="rule-label">02</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5rem)]">Story</h2>
          <p className="mt-6 text-[0.85rem] text-ink-3">
            {n} {n === 1 ? "series" : "series"} on this site.
          </p>
        </div>
        <div className="prose max-w-[62ch]">
          <Mdx source={body} />
        </div>
      </section>
    </div>
  );
}
