# STATUS

Cross-session bridge. Update at the end of every work block. Newest first.

## 2026-09-22 — template created

- Built from the southofordinary.dev design system: tokens, ground, shell, header, footer, Reveal, printed headline, band cascade.
- Homepage = hero (statement left, blurred first artwork right, fades on scroll) + one band per featured series with a scroll-snap slider.
- Pages: `/`, `/work`, `/work/<slug>`, `/about`, `/contact`, 404, sitemap, robots.
- Three SAMPLE series with code-generated placeholder images. Delete them once real work is in.
- `npm run check` guards frontmatter, image files, sizes, alt text.

## Next for the owner
1. Fill in `src/lib/site.ts`.
2. Replace the sample series with real ones (see README, "Make it yours in four edits").
3. Write `content/about.md`.
4. Deploy: `vercel`, then `vercel --prod`, then `vercel git connect`.
