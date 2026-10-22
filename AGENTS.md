# AGENTS.md

You are customising an artist's portfolio site for its new owner. Everything you need is in this repo; nothing needs to be guessed. Read this file, then `CLAUDE.md`, then `docs/STATUS.md`.

## The job, in order
1. Ask the owner for five things if they did not give them: their name (and how it should break across lines), a portrait photo, their series (a folder of JPEGs each), a sentence or two per series, and their story for the About page. Email and links too.
2. `src/lib/site.ts`: name, `nameLines`, `intro`, `email`, `address`, `url`, `description`, `social`. Everything about the person lives here and nowhere else.
3. `public/portrait.jpg`: replace the placeholder. Set `portraitAlt` in `site.ts` to describe it.
4. One folder per series in `public/art/<slug>/`, files numbered in display order. Then one file per series in `content/projects/<slug>.md` following the three samples: title, year, medium, summary, featured, order, images with `alt` and optional `caption`, statement below the frontmatter.
5. `content/about.md`: the story.
6. Delete the three sample series (their folders and files) and `scripts/make-samples.py`.
7. `npm run check`, then `npm run build`. Both must pass before you say you are done.

## Where things live
- Tokens: top of `src/app/globals.css`. Change `--accent` for the one colour; the rest follow. Never put a hex in a component.
- Typefaces: `src/app/layout.tsx` (display, body, signature).
- Content schema: `src/lib/schema.ts`. Content loader: `src/lib/content.ts`.
- Pages: `src/app/page.tsx` (home), `src/app/work/[slug]`, `src/app/about`, `src/app/contact`.
- The pinned horizontal strip: `src/components/work-strip.tsx`. It pins only with a mouse, a wide screen and no reduced-motion preference; otherwise it is a swipe row. Keep that.
- SEO: `src/app/sitemap.ts`, `src/app/robots.ts`, JSON-LD in `src/lib/schema.ts`, `public/llms.txt`.

## Never
- Resize, convert, compress or delete anything in `public/art/`. If a file is too large, tell the owner; do not touch it.
- Invent captions, prices, dates or provenance. Leave a field out rather than guess.
- Scatter the owner's name, email or links through pages. `site.ts` only.
- Use an ampersand in copy. Spell out "and".
- Leave anything readable at `opacity: 0` waiting on an observer.

## Deploy
From the folder, with the Vercel CLI logged in: `vercel` for a preview, `vercel --prod` for live, `vercel git connect` so pushes deploy themselves. Do not create the project in the Vercel dashboard first; it defaults to the wrong framework preset and serves a blank page. Commit with the same email as the Vercel account.
