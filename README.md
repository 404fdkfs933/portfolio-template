# Portfolio template

A portfolio site for an artist. The home page opens on a full-screen photo of you with your name set huge in the corner, then runs sideways through one full-screen slide per featured series as you scroll, then lands on a two-column grid of every series. Each series gets its own page: a column that stays put with the title and statement, and every piece in two columns beside it.

Built with Next.js, deployed on Vercel for free, edited with Claude Code. The look is modelled on [karimrashid.com](https://www.karimrashid.com): white rooms, heavy condensed black type, one loud colour for the signature and links, a menu that slides in from the right. The pictures carry the colour; the page stays out of their way.

## Make it yours in five edits

1. **`src/lib/site.ts`** — your name (and how it breaks across lines), the About opener, email, address, social links, site URL. Point `logo` at a signature image if you have one; otherwise your name is written in the handwriting face.
2. **`public/portrait.jpg`** — a photo of you or your studio, portrait or landscape, about 2400 px on the long side. It fills the first screen of the home page and the About page. Describe it in `portraitAlt`.
3. **`public/art/<series>/`** — one folder per series, web-sized JPEGs numbered in the order you want them shown (`01.jpg`, `02.jpg`…). Longest side about 2400 px, quality about 85, under 2 MB each. Keep full-resolution originals out of the repo (`design/originals/` is ignored by git).
4. **`content/projects/<series>.md`** — one file per series: title, year, medium, a two-sentence summary, and the list of images with a description (`alt`) and an optional caption. Anything under the frontmatter is the series statement. The three sample files show the shape.
5. **`content/about.md`** — your story.

Then delete the three sample series (their folders in `public/art/` and files in `content/projects/`) and `scripts/make-samples.py`.

Colours live at the top of `src/app/globals.css` (`--accent` is the one that matters); fonts in `src/app/layout.tsx`. Change the tokens, not the components.

## Built for an AI coding agent

This repo is meant to be handed to Claude Code, Codex, Cursor or any agent that reads a repo, with the sentence "make this my site" and the five answers above. `AGENTS.md` tells the agent where everything lives and what it must never touch (your images, for one). Colours are tokens in one place, content is Markdown with a schema, a checker runs before every build, and `public/llms.txt` explains the site to assistants once it is live. Nothing in the components needs editing to make the site yours.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F404fdkfs933%2Fportfolio-template)

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
