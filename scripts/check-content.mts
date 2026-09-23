/**
 * Content checks. Run before every build (`prebuild`) and on their own with
 * `npm run check`. Each rule exists because breaking it would either break the
 * build or put something on the site that should not be there.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { ProjectFrontmatter } from "../src/lib/schema";

const CONTENT = path.join(process.cwd(), "content", "projects");
const ART = path.join(process.cwd(), "public", "art");

let errors = 0;
let warnings = 0;
const fail = (f: string, m: string) => (errors++, console.error(`✗ ${f}: ${m}`));
const warn = (f: string, m: string) => (warnings++, console.warn(`! ${f}: ${m}`));

const files = fs.existsSync(CONTENT) ? fs.readdirSync(CONTENT).filter((f) => /\.mdx?$/.test(f)) : [];
if (!files.length) warn("content/projects", "no projects yet");

const used = new Set<string>();

for (const file of files) {
  const rel = `content/projects/${file}`;
  const slug = file.replace(/\.mdx?$/, "");
  let data: unknown, content: string;
  try {
    ({ data, content } = matter(fs.readFileSync(path.join(CONTENT, file), "utf8")));
  } catch (e) {
    fail(rel, `frontmatter does not parse: ${(e as Error).message.split("\n")[0]}`);
    continue;
  }
  const parsed = ProjectFrontmatter.safeParse(data);
  if (!parsed.success) {
    fail(rel, `frontmatter\n${parsed.error.issues.map((i) => `    ${i.path.join(".")}: ${i.message}`).join("\n")}`);
    continue;
  }
  const fm = parsed.data;

  if (!/^[a-z0-9-]+$/.test(slug)) fail(rel, `file name should be lowercase letters, digits and hyphens (it becomes the URL /work/${slug})`);

  for (const img of fm.images) {
    const abs = path.join(ART, slug, img.file);
    used.add(path.join(slug, img.file));
    if (!fs.existsSync(abs)) {
      fail(rel, `image public/art/${slug}/${img.file} does not exist`);
      continue;
    }
    const mb = fs.statSync(abs).size / 1e6;
    if (mb > 2.5) warn(rel, `${img.file} is ${mb.toFixed(1)} MB; export a web-sized copy (longest side ~2400px, JPEG quality ~85)`);
    if (img.alt.trim().length < 12) warn(rel, `${img.file} alt text is very short; describe what the image shows`);
  }

  // House style: spell out "and" in prose. Proper nouns (R&D) are exempt.
  const amp = /(?<![A-Z])\s&\s(?![A-Z]\b)/.exec(content);
  if (amp) warn(rel, `ampersand in prose; spell out "and"`);

  try {
    await compile(content, { remarkPlugins: [remarkGfm] });
  } catch (e) {
    fail(rel, `body does not compile as Markdown/MDX: ${(e as Error).message.split("\n")[0]}`);
  }
}

// Images on disk that no project mentions are usually a typo in a file name.
if (fs.existsSync(ART)) {
  for (const slug of fs.readdirSync(ART)) {
    const dir = path.join(ART, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(".")) continue;
      if (!used.has(path.join(slug, f))) warn(`public/art/${slug}/${f}`, "not referenced by any project");
    }
  }
}

console.log(`\n${files.length} projects checked · ${errors} errors · ${warnings} warnings`);
process.exit(errors ? 1 : 0);
