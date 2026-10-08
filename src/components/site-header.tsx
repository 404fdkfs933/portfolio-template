"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Two things float over every page: the signature top-left and a MENU button
 * top-right. The menu slides a dark panel in from the right with the three
 * links set huge, and the social links along the bottom.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Any navigation closes the panel: the links inside it change the route.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="flex items-start justify-between px-5 py-5 md:px-10 md:py-7">
          <Link href="/" className="pointer-events-auto" aria-label={`${site.name}, home`}>
            {site.logo ? (
              <Image src={site.logo} alt={site.name} width={160} height={56} className="h-12 w-auto" priority />
            ) : (
              <span className="font-script text-[2.1rem] font-bold leading-none text-accent md:text-[2.5rem]">{site.name}</span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="label pointer-events-auto bg-bg px-5 py-3 text-[0.8rem] shadow-[0_1px_0_rgba(0,0,0,0.06)] transition-colors hover:bg-ink hover:text-bg"
          >
            Menu
          </button>
        </div>
      </header>

      <div className="menu-scrim" data-open={open} onClick={() => setOpen(false)} aria-hidden />
      <nav id="site-menu" className="menu-panel" data-open={open} aria-label="Site" aria-hidden={!open}>
        <div className="flex justify-end">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center text-panel-ink hover:text-accent">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
        <div className="mt-10 flex flex-1 flex-col justify-center">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="menu-link display" aria-current={pathname.startsWith(l.href) ? "page" : undefined} tabIndex={open ? 0 : -1}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-[0.8rem]">
          <a href={`mailto:${site.email}`} className="hover:text-accent" tabIndex={open ? 0 : -1}>{site.email}</a>
          <div className="flex gap-5">
            {site.social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-accent" tabIndex={open ? 0 : -1}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
