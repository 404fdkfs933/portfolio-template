"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";

export type Segment = { t: string; accent?: boolean };

/** Slow and wide on purpose. The whole point of this reveal is the deceleration,
 *  so the curve needs most of its life left when the line is nearly home. */
const STAGGER = 140; // between one line starting and the next
const DUR = 1150; // how long a single line takes to arrive
const TAIL = 120; // pause before the paragraph follows

/**
 * The headline, revealed a line at a time.
 *
 * Each line sits in its own clipping box and rises into it from below while it
 * fades up, one after another on a long expo curve. It is the same move the
 * project titles further down the page already use, so the hero and the bands
 * read as one piece of design rather than two.
 *
 * The work is in the line boxes. Lines are found by measuring where the text
 * actually wrapped, then the word spans are MOVED into per-line wrappers, so
 * the reveal follows the real wrap at any width instead of hard-coded breaks.
 * Once it has played the original markup is put back, which returns the text to
 * normal inline flow — it reflows on resize and selects as one run again.
 *
 * Text ships visible and is hidden in a layout effect, so anything without JS
 * — crawlers, reader modes, a failed bundle — still gets the headline.
 */
export function PrintedHeading({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.anim = "armed"; // hides the heading before first paint
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.anim !== "armed") return;
    if (el.querySelector(".pl")) return; // already restructured

    let cancelled = false;
    let restore = 0;

    const run = () => {
      if (cancelled || el.querySelector(".pl")) return;
      const words = [...el.querySelectorAll<HTMLElement>(".pw")];
      if (!words.length) return;

      // Put the markup back at the end. React never re-renders this component
      // (nothing here is state), so owning the DOM directly is safe.
      const original = el.innerHTML;

      // Recover the real line boxes from where the text actually wrapped.
      // Rounding absorbs sub-pixel drift between glyphs on the same line.
      const lines: HTMLElement[][] = [];
      let prevTop = Number.NaN;
      words.forEach((w) => {
        const top = Math.round(w.offsetTop);
        if (top !== prevTop) {
          lines.push([]);
          prevTop = top;
        }
        lines[lines.length - 1].push(w);
      });

      // Move each line's words into a clipping box of their own.
      const frag = document.createDocumentFragment();
      lines.forEach((ws, i) => {
        const box = document.createElement("span");
        box.className = "pl";
        const inner = document.createElement("span");
        inner.className = "pl-i";
        inner.style.setProperty("--d", `${i * STAGGER}ms`);
        ws.forEach((w, j) => {
          if (j) inner.appendChild(document.createTextNode(" "));
          inner.appendChild(w);
        });
        box.appendChild(inner);
        frag.appendChild(box);
      });
      el.replaceChildren(frag);

      const total = (lines.length - 1) * STAGGER + DUR;
      el.parentElement?.style.setProperty("--printed-span", `${total + TAIL}ms`);

      // Two frames: one to commit the boxes and their delays, one to flip the
      // state, or the browser coalesces both and nothing transitions.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) el.dataset.anim = "go";
        });
      });

      restore = window.setTimeout(() => {
        if (cancelled) return;
        el.innerHTML = original; // back to normal inline flow
        el.dataset.anim = "done";
      }, total + 260);
    };

    // Measure only once the real face is loaded — line breaks move otherwise.
    if (document.fonts?.status === "loaded") run();
    else document.fonts?.ready.then(run).catch(run);

    return () => {
      cancelled = true;
      window.clearTimeout(restore);
    };
  }, []);

  // Split on whitespace, NOT on the segment boundaries. A chunk is everything
  // between two spaces and colour lives inside it, so punctuation that butts
  // against an accent word ("break it" + ",") stays welded to it. Splitting per
  // segment instead puts the comma in a span of its own, and the rebuild —
  // which joins a line's chunks with single spaces — renders "break it , fix".
  //
  // Ordinary spaces only, NOT \s. In JavaScript \s also matches a non-breaking
  // space, so a phrase glued with one ("noise\u00A0floor") would be split and
  // rejoined with a normal space, and would wrap after all.
  const chunks: { text: string; accent: boolean }[][] = [];
  let cur: { text: string; accent: boolean }[] = [];
  for (const seg of segments) {
    for (const part of seg.t.split(/([ \t\r\n]+)/)) {
      if (part === "") continue;
      if (/^[ \t\r\n]+$/.test(part)) {
        if (cur.length) {
          chunks.push(cur);
          cur = [];
        }
      } else cur.push({ text: part, accent: !!seg.accent });
    }
  }
  if (cur.length) chunks.push(cur);

  return (
    <h1 ref={ref} className={`printed ${className}`}>
      {chunks.map((frags, i) => (
        <Fragment key={i}>
          <span className="pw">
            {frags.map((f, j) =>
              f.accent ? (
                <span key={j} className="pw-accent">
                  {f.text}
                </span>
              ) : (
                <span key={j}>{f.text}</span>
              ),
            )}
          </span>
          {/* The separator lives outside the chunk so the text flows and wraps
              normally; the rebuild re-adds exactly one between chunks. */}
          {i < chunks.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
