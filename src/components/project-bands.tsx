"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ArtImage } from "@/lib/content";
import { ArtSlider } from "./art-slider";

export type Band = {
  slug: string;
  href: string;
  title: string;
  year: string;
  medium: string;
  summary: string;
  images: ArtImage[];
};

/**
 * The homepage as a stack of bands, one per featured project.
 *
 * Each band slides in as it arrives, alternating from the left and the right,
 * and carries a swipeable slider of that project's images. The copy cascades
 * in after the band, driven by the same data-shown attribute.
 */
export function ProjectBands({ bands }: { bands: Band[] }) {
  const [shown, setShown] = useState<Set<string>>(new Set());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = [...root.querySelectorAll<HTMLElement>("[data-band]")];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(new Set(els.map((e) => e.dataset.band!)));
      return;
    }

    const enter = new IntersectionObserver(
      (rs) => {
        const hit = rs.filter((r) => r.isIntersecting).map((r) => (r.target as HTMLElement).dataset.band!);
        if (hit.length) setShown((prev) => new Set([...prev, ...hit]));
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((e) => enter.observe(e));

    // Safety net for anything never scrolled past (a crawler, a full-page
    // capture), but ONLY for bands already at or near the fold. Revealing
    // every band at once would spend the whole page's motion up front.
    const fallback = window.setTimeout(() => {
      const near = els.filter((e) => e.getBoundingClientRect().top < window.innerHeight * 1.5).map((e) => e.dataset.band!);
      if (near.length) setShown((prev) => new Set([...prev, ...near]));
    }, 2200);

    return () => {
      window.clearTimeout(fallback);
      enter.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="grid">
      {bands.map((b, i) => {
        const fromLeft = i % 2 === 0;
        return (
          <section key={b.slug} data-band={b.slug} data-shown={shown.has(b.slug)} className={cn("band py-10 md:py-14", fromLeft ? "band-l" : "band-r")} aria-labelledby={`band-${b.slug}`}>
            <div className="shell mb-6 md:mb-8">
              <div className={cn("band-copy max-w-[40rem]", !fromLeft && "ml-auto text-right")}>
                <p className="label">
                  {b.year} · {b.medium}
                </p>
                <h2 id={`band-${b.slug}`} className="band-title mt-2 font-display text-[1.6rem] leading-[1.08] font-semibold tracking-[-0.02em] text-ink sm:text-[2.1rem] md:text-[2.6rem]">
                  <span>{b.title}</span>
                </h2>
                <p className="mt-2 max-w-[48ch] text-[0.95rem] leading-snug text-ink-2 md:text-[1.02rem]">{b.summary}</p>
                <Link href={b.href} className={cn("group mt-3 inline-flex items-center gap-2 text-[0.8rem] text-ink-2 transition-colors hover:text-accent-ink", !fromLeft && "flex-row-reverse")}>
                  <ArrowRight className={cn("size-3.5 transition-transform duration-300 group-hover:translate-x-0.5", !fromLeft && "rotate-180 group-hover:-translate-x-0.5")} />
                  <span className="label !text-[0.62rem] !text-inherit">See the whole series</span>
                </Link>
              </div>
            </div>
            <ArtSlider images={b.images} title={b.title} priority={i === 0} />
          </section>
        );
      })}
    </div>
  );
}
