"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Reveal on scroll: content rises and fades once as it enters the viewport.
 * Anything still hidden when JS is unavailable, or when the visitor prefers
 * reduced motion, is shown immediately.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);

    // Safety net: anything that never gets scrolled past still has to appear.
    // A crawler rendering the page without scrolling, a full-page screenshot,
    // or a very tall viewport would otherwise leave content at zero opacity,
    // which is invisible content rather than a subtle animation.
    const fallback = window.setTimeout(() => {
      // Only if it is already at or near the fold. Revealing something far down
      // the page on a timer spends its entrance while nobody is looking at it.
      if (el.getBoundingClientRect().top < window.innerHeight * 1.5) {
        setShown(true);
        io.disconnect();
      }
    }, 2000);

    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} data-shown={shown} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", className)}>
      {children}
    </div>
  );
}

/** Circular outlined button with an arrow, paired with a letterspaced label. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-5 bottom-5 z-30 grid size-11 place-items-center rounded-full border border-line-strong bg-surface-strong text-ink backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent-ink",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
