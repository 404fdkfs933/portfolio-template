import Image from "next/image";
import Link from "next/link";
import { getFeatured, getProjects } from "@/lib/content";
import { nameLines, site } from "@/lib/site";
import { WorkStrip, type Slide } from "@/components/work-strip";
import { SeriesTiles } from "@/components/series-tiles";

export default function Home() {
  const featured = getFeatured();
  const all = getProjects();
  const slides: Slide[] = featured.map((p) => ({
    href: p.href,
    title: p.title,
    year: p.year,
    src: p.cover.src,
    alt: p.cover.alt,
    width: p.cover.width,
    height: p.cover.height,
  }));

  /* The first slide: your portrait full-bleed, your name set huge in the
     corner, one arrow to the About page. The strip carries on from here. */
  const hero = (
    <div className="hero-lift relative h-full w-full overflow-hidden bg-bg-2 md:col-span-2">
      <Image src={site.portrait} alt={site.portraitAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-8 md:p-12 md:pb-16">
        <h1 className="display text-[clamp(3.4rem,11vw,9.5rem)]">
          {nameLines().map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <Link href="/about" className="arrow-link mt-5">
          <span className="arrow" aria-hidden />
          <span>About {site.name}</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <WorkStrip hero={hero} slides={slides} />

      <section aria-labelledby="all-series">
        <div className="shell flex flex-wrap items-end justify-between gap-6 pt-14 pb-8 md:pt-20 md:pb-10">
          <h2 id="all-series" className="display text-[clamp(2.4rem,5vw,4.5rem)]">
            Work
          </h2>
          <p className="label-quiet text-[0.8rem] font-semibold">
            {all.length} {all.length === 1 ? "series" : "series"}
          </p>
        </div>
        <SeriesTiles projects={all} />
      </section>
    </div>
  );
}
