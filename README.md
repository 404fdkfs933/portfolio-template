# Portfolio template

A portfolio site for an artist: a main section with your name and a statement, then one full-bleed band per series, each with a swipeable slider of that series' pieces. Every series also gets its own page with every piece at full size.

Built with Next.js, deployed on Vercel for free, edited with Claude Code. The look comes from [southofordinary.dev](https://southofordinary.dev): warm paper by day, deep navy at night, one gold accent, three typefaces.

## Make it yours in four edits

1. **`src/lib/site.ts`** — your name, statement, intro line, email, social links, site URL.
2. **`public/art/<series>/`** — one folder per series, web-sized JPEGs numbered in the order you want them shown (`01.jpg`, `02.jpg`…). Longest side about 2400 px, quality about 85, under 2 MB each. Keep full-resolution originals out of the repo (`design/originals/` is ignored by git).
3. **`content/projects/<series>.md`** — one file per series: title, year, medium, a two-sentence summary, and the list of images with a description (`alt`) and an optional caption. Anything under the frontmatter is the series statement. The three sample files show the shape.
4. **`content/about.md`** — your story.

Then delete the three sample series (their folders in `public/art/` and files in `content/projects/`) and `scripts/make-samples.py`.

Colours live at the top of `src/app/globals.css`; fonts in `src/app/layout.tsx`. Change the tokens, not the components.

## Run it

```
npm install
npm run dev        # http://localhost:3000
npm run check      # validates content and images
npm run build      # what Vercel runs
```

If you have no artwork yet and want something to look at: `python3 -m pip install pillow` then `npm run samples` regenerates the placeholder images.

## Deploy

From inside the folder, with the Vercel CLI installed and logged in:

```
vercel            # first run creates the project and a preview
vercel --prod     # live
vercel git connect   # after that, every push to main deploys itself
```

Do not create the project in the Vercel dashboard first. Projects made there default to the "Other" framework preset and serve a blank page. Commit with the same email as your Vercel account, or Vercel will block the deploy.

## Working with Claude Code

Open a terminal in this folder and run `claude`. It reads `CLAUDE.md` for the rules and `docs/STATUS.md` for where things stand. Describe changes in plain words: "add the new series from `public/art/spring-murals`", "the hero statement is too long", "make the gold warmer". Ask it to update `docs/STATUS.md` at the end of a session.
