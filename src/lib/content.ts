import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { ProjectFrontmatter, type ProjectFm } from "./schema";

export type ArtImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type Project = Omit<ProjectFm, "images"> & {
  slug: string;
  href: string;
  body: string;
  images: ArtImage[];
  cover: ArtImage;
};

const CONTENT = path.join(process.cwd(), "content", "projects");
const ART = path.join(process.cwd(), "public", "art");

function readImage(slug: string, file: string, alt: string, caption?: string): ArtImage {
  const abs = path.join(ART, slug, file);
  if (!fs.existsSync(abs)) throw new Error(`content/projects/${slug}.md lists ${file}, but public/art/${slug}/${file} does not exist`);
  const { width, height } = imageSize(fs.readFileSync(abs));
  if (!width || !height) throw new Error(`Could not read the size of public/art/${slug}/${file}`);
  return { src: `/art/${slug}/${file}`, alt, caption, width, height };
}

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const out: Project[] = [];
  if (!fs.existsSync(CONTENT)) return out;
  for (const file of fs.readdirSync(CONTENT)) {
    if (!/\.mdx?$/.test(file)) continue;
    const slug = file.replace(/\.mdx?$/, "");
    const { data, content } = matter(fs.readFileSync(path.join(CONTENT, file), "utf8"));
    const parsed = ProjectFrontmatter.safeParse(data);
    if (!parsed.success) {
      const msg = `Bad frontmatter in content/projects/${file}:\n${parsed.error.message}`;
      if (process.env.NODE_ENV !== "development") throw new Error(msg);
      console.warn(msg.split("\n")[0]);
      continue;
    }
    const fm = parsed.data;
    const images = fm.images.map((i) => readImage(slug, i.file, i.alt, i.caption));
    out.push({ ...fm, slug, href: `/work/${slug}`, body: content, images, cover: images[0] });
  }
  out.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  cache = out;
  return out;
}

export const getFeatured = () => getProjects().filter((p) => p.featured);
export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);

/** The projects before and after this one in display order, wrapping around. */
export function getNeighbours(slug: string) {
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i < 0 || all.length < 2) return { prev: null, next: null };
  return { prev: all[(i - 1 + all.length) % all.length], next: all[(i + 1) % all.length] };
}

/** Optional long-form page bodies: content/about.md. */
export function getPage(name: string): string | null {
  const p = path.join(process.cwd(), "content", `${name}.md`);
  return fs.existsSync(p) ? matter(fs.readFileSync(p, "utf8")).content : null;
}
