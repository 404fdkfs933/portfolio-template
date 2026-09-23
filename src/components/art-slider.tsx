"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ArtImage } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * A horizontal, swipeable row of one project's images.
 *
 * Scroll-snap does the work: a finger swipe on a phone and a trackpad swipe on
 * a laptop both land on a whole image. The arrow buttons scroll by one image
 * and hide themselves on touch screens, where they would only get in the way.
 * Every image keeps its own aspect ratio at a shared height, so a tall canvas
 * and a wide one sit side by side without either being cropped.
 */
export function ArtSlider({ images, title, priority = false, className }: { images: ArtImage[]; title: string; priority?: boolean; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(images.length < 2);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const items = [...el.querySelectorAll<HTMLElement>("[data-item]")];
    const left = el.scrollLeft + parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
    let best = 0;
    let bestD = Infinity;
    items.forEach((it, i) => {
      const d = Math.abs(it.offsetLeft - left);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setIndex(best);
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const items = [...el.querySelectorAll<HTMLElement>("[data-item]")];
    const target = items[Math.min(items.length - 1, Math.max(0, index + dir))];
    if (!target) return;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
    el.scrollTo({ left: target.offsetLeft - pad, behavior: "smooth" });
  };

  const current = images[index];

  return (
    <div className={cn("grid gap-3", className)}>
      <div ref={track} className="slider" style={{ "--slider-h": "clamp(220px, 34vw, 440px)" } as React.CSSProperties} aria-label={`${title}, ${images.length} images`}>
        {images.map((img, i) => (
          <figure key={img.src} data-item className="slider-item">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1024px) 60vw, 90vw"
              priority={priority && i === 0}
              draggable={false}
            />
          </figure>
        ))}
      </div>

      <div className="shell flex items-start justify-between gap-4">
        <p className="min-w-0 text-[0.85rem] leading-snug text-ink-2" aria-live="polite">
          <span className="font-mono text-[0.68rem] text-ink-3">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          {current?.caption ? <span className="ml-3">{current.caption}</span> : null}
        </p>
        {images.length > 1 ? (
          <div className="flex shrink-0 gap-2">
            <button type="button" className="slider-btn" onClick={() => go(-1)} disabled={atStart} aria-label="Previous image">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" className="slider-btn" onClick={() => go(1)} disabled={atEnd} aria-label="Next image">
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
