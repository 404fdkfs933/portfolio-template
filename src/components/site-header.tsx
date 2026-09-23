"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[border-color,background-color] duration-300",
        scrolled || open ? "border-line bg-[var(--header)] backdrop-blur-xl backdrop-saturate-150" : "border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center gap-6">
        <Link href="/" className="shrink-0 font-display text-[1.15rem] font-bold tracking-[-0.01em] text-ink">
          {site.name}
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[0.875rem] whitespace-nowrap transition-colors",
                  active ? "bg-accent-soft text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full border border-line text-ink-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-2.5 w-3.5">
              <span className={cn("absolute left-0 h-px w-full bg-current transition", open ? "top-1 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-px w-full bg-current transition", open ? "top-1 -rotate-45" : "top-2.5")} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="shell grid gap-1 pb-4 md:hidden" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-2 py-2.5 text-ink-2 hover:bg-accent-soft hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
