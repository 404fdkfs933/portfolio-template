import { z } from "zod";

/**
 * The frontmatter of one file in content/projects/. Everything a project page
 * and its homepage band need. Image files live in public/art/<slug>/ and are
 * referenced here by file name only; their pixel size is read at build time.
 */
export const ProjectFrontmatter = z.object({
  title: z.string(),
  /** A year or a range, shown as text: "2025" or "2023–2025". */
  year: z.union([z.number(), z.string()]).transform(String),
  /** "Oil on linen", "Risograph", "Digital". Free text. */
  medium: z.string(),
  /** One or two sentences. Shown on the homepage band and the work index. */
  summary: z.string(),
  /** Featured projects get a band on the homepage. Everything is on /work. */
  featured: z.boolean().default(true),
  /** Lower numbers come first. Ties fall back to title. */
  order: z.number().int().default(100),
  images: z
    .array(
      z.object({
        file: z.string(),
        /** What the image shows, for people who cannot see it. Required. */
        alt: z.string(),
        /** Optional line under the image: title, size, year, availability. */
        caption: z.string().optional(),
      }),
    )
    .min(1),
});

export type ProjectFm = z.infer<typeof ProjectFrontmatter>;
