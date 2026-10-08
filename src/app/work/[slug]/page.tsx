import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNeighbours, getProject, getProjects } from "@/lib/content";
import { Mdx } from "@/lib/mdx";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: p.href },
    openGraph: { title: p.title, description: p.summary, type: "article", url: p.href, images: [{ url: p.cover.src, width: p.cover.width, height: p.cover.height }] },
  };
}

/**
 * One series. A column on the left that stays put while you scroll (title set
 * huge, medium, year, the statement, a way back to all work) and every piece
 * on the right in two columns, each at a good size with its caption under it.
 */
export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = getNeighbours(slug);

  return (
    <article>
      <div className="grid lg:grid-cols-[minmax(280px,30vw)_1fr]">
        <aside className="series-side gutter pt-28 pb-10 lg:pt-32 lg:pb-12">
          <div>
            <h1 className="display text-[clamp(3rem,6.5vw,6rem)]">{project.title}</h1>
            <dl className="mt-8 text-[0.95rem] leading-relaxed">
              <div>
                <dt className="sr-only">Medium</dt>
                <dd className="font-semibold text-ink">{project.medium}</dd>
              </div>
              <div>
                <dt className="sr-only">Year</dt>
                <dd className="text-ink-3">{project.year}</dd>
              </div>
            </dl>
            <p className="mt-6 max-w-[34ch] text-[0.95rem] leading-relaxed text-ink-2">{project.summary}</p>
            {project.body.trim() ? (
              <div className="prose mt-6 max-w-[38ch] text-[0.95rem]">
                <Mdx source={project.body} />
              </div>
            ) : null}
          </div>
          <Link href="/work" className="label mt-10 inline-flex items-center gap-3 hover:text-accent-ink">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <rect x="0" y="0" width="6" height="6" /><rect x="8" y="0" width="6" height="6" /><rect x="0" y="8" width="6" height="6" /><rect x="8" y="8" width="6" height="6" />
            </svg>
            All work
          </Link>
        </aside>

        <div className="grid gap-px bg-line sm:grid-cols-2">
          {project.images.map((img, i) => (
            <figure key={img.src} className="bg-bg">
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-2">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw" className="object-cover" priority={i < 2} />
              </div>
              {img.caption ? <figcaption className="px-4 py-3 text-[0.78rem] text-ink-3">{img.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>

      {/* Before and after this one, in display order. */}
      {prev && next ? (
        <nav className="grid border-t border-line md:grid-cols-2" aria-label="Other series">
          {[
            { p: prev, label: "Previous" },
            { p: next, label: "Next" },
          ].map(({ p, label }) => (
            <Link key={label} href={p.href} className="tile !aspect-[16/7]">
              <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="tile-copy relative z-10">
                <p className="label">{label}</p>
                <h2 className="display tile-title mt-2 !text-[clamp(2.2rem,4.5vw,4.5rem)]">{p.title}</h2>
              </div>
            </Link>
          ))}
        </nav>
      ) : null}
    </article>
  );
}
