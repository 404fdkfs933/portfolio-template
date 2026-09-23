"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ArtImage } from "@/lib/content";

/**
 * A defocused preview of the first work, beside the headline. It dissolves
 * as the visitor scrolls: opacity is written to a CSS variable inside a
 * requestAnimationFrame, so scrolling schedules no React render.
 */
export function HeroGhost({ image }: { image: ArtImage }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const gone = Math.min(1, window.scrollY / (window.innerHeight * 0.55));
        el.style.setProperty("--ghost-o", String(1 - gone));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="hero-ghost hidden lg:block" aria-hidden>
      <div className="hero-ghost-img">
        <Image src={image.src} alt="" fill sizes="50vw" priority className="object-cover" />
      </div>
    </div>
  );
}
