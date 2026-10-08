"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type Slide = {
  href: string;
  title: string;
  year: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * The home page's opening run: the hero, then one full-screen slide per
 * featured series, laid side by side. On a desktop with a mouse the section
 * pins and the vertical scroll drives it sideways, which is the site's one
 * trick. On touch, narrow screens, or with reduced motion it is a plain
 * swipe row with snap points, no pin.
 */
export function WorkStrip({ hero, slides }: { hero: ReactNode; slides: Slide[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    const on = () => setPinned(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const el = outer.current;
    const tr = track.current;
    if (!el || !tr) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      tr.style.transform = `translate3d(${-p * (tr.scrollWidth - window.innerWidth)}px, 0, 0)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
      tr.style.transform = "";
    };
  }, [pinned, slides.length]);

  const count = slides.length + 1;
  const items = (
    <>
      <div className="strip-slide">{hero}</div>
      {slides.map((s, i) => (
        <article key={s.href} className="strip-slide">
          <div className="slide-art">
            <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 768px) 66vw, 100vw" priority={i === 0} />
          </div>
          <div className="slide-panel">
            <p className="label-quiet text-[0.8rem] font-semibold">{s.year}</p>
            <h2 className="display text-[clamp(2.8rem,5.2vw,5.6rem)]">{s.title}</h2>
            <Link href={s.href} className="arrow-link">
              <span className="arrow" aria-hidden />
              <span className="sr-only">Open {s.title}</span>
              <span aria-hidden>see series</span>
            </Link>
          </div>
        </article>
      ))}
    </>
  );

  if (!pinned) {
    return (
      <section className="strip-snap" aria-label="Featured series">
        {items}
      </section>
    );
  }
  return (
    <section ref={outer} style={{ height: `${count * 100}vh` }} aria-label="Featured series">
      <div className="strip-pin">
        <div ref={track} className="strip-track">
          {items}
        </div>
      </div>
    </section>
  );
}
