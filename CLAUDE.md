# Portfolio — CLAUDE.md

An artist's portfolio site modelled on karimrashid.com: a full-screen portrait with the name set huge, a pinned horizontal run of featured series, a two-column grid of every series, and a sticky-column series page. Built on Next.js and Vercel. Read `docs/STATUS.md` first after any interruption; it is the cross-session bridge.

## Where things live
- `src/lib/site.ts` — the artist's name, portrait, About opener, email, address, social links, site URL. **Change this first.**
- `public/portrait.jpg` — the full-bleed photo on the home and About pages. A generated grey placeholder until the artist supplies one.
- `content/projects/<slug>.md` — one file per series. Frontmatter = title, year, medium, summary, featured, order, images. Body = optional statement in Markdown. Schema in `src/lib/schema.ts`.
- `public/art/<slug>/` — the web-sized images for that series, referenced by file name in the frontmatter. Pixel sizes are read at build time; never hard-code them.
- `content/about.md` — the about page body.
- `design/` — sketches, colour references and working files worth versioning. In the repo, not on the site. Full-resolution originals go in `design/originals/`, which is gitignored.
- `src/app/globals.css` — every colour is a token at the top of this file. Restyling the site means editing those tokens, never hard-coding a hex in a component.
- `src/app/layout.tsx` — the three typefaces (display = Anton, body = Archivo, signature = Caveat).
- `src/components/work-strip.tsx` — the home page's pinned horizontal strip. Pins only with a mouse, a wide screen and no reduced-motion preference; otherwise it is a plain swipe row. Keep it that way.

## Hard rules
- **Never delete, resize, convert or "optimise" anything in `public/art/`.** The artist prepares those files. If a file is too big, say so; do not touch it.
- Every image needs real `alt` text that describes what it shows.
- Keep the artist's name, email and links in `site.ts` only. Never scatter copies through pages.
- No fabricated captions, prices or provenance. If a detail is unknown, leave the caption out.
- Outward copy: spell out "and" (never "&"), sentence-case headings, first person.
- Motion must respect `prefers-reduced-motion` (the strip and the menu already do), and nothing readable may rest at `opacity: 0` waiting on an observer.

## Stack
- Next.js 16 App Router (params are Promises), React 19, Tailwind 4, TypeScript. Content is Markdown parsed with gray-matter, validated with zod, rendered with `@mdx-js/mdx`.
- `npm run check` runs before every build: frontmatter schema, image files exist, image size warnings, alt text, ampersands, Markdown compiles.
- Deploys from `main` on Vercel. **Commit with the same email as the Vercel account**, or Vercel blocks the deploy.

## Working habits
- After a work block, update `docs/STATUS.md`: what changed, what is next, anything the artist must decide.
- Adding a series: new folder in `public/art/`, new file in `content/projects/`, run `npm run check`, look at it on `localhost:3000`.
- Keep `npm run build` green before every push.
