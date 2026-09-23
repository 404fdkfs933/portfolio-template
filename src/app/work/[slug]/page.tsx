import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNeighbours, getProject, getProjects } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { Reveal } from "@/components/motion";

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

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = getNeighbours(slug);

  return (
    <article className="shell pt-8 md:pt-12">
      <nav className="label mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/work" className="hover:text-ink">Work</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-2">{project.title}</span>
      </nav>

      <header className="max-w-[46rem]">
        <p className="label mb-4">
          {project.year} · {project.medium}
        </p>
        <h1 className="font-display font-semibold text-[2.1rem] leading-[1.07] tracking-[-0.02em] text-ink md:text-[2.9rem]">{project.title}</h1>
        <p className="mt-4 max-w-[60ch] text-[1.12rem] leading-relaxed text-ink-2">{project.summary}</p>
      </header>

      {/* Every piece, large, in order. */}
      <div className="mt-10 grid gap-10 md:gap-14">
        {project.images.map((img, i) => (
          <Reveal key={img.src}>
            <figure className="grid gap-3">
              <div className="panel ticks overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1200px) 1130px, 100vw"
                  priority={i === 0}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[0.88rem] text-ink-2">
                <span className="font-mono text-[0.68rem] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {img.caption ? <span>{img.caption}</span> : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {project.body.trim() ? (
        <section className="mt-16 max-w-[46rem]">
          <p className="label mb-4">About this series</p>
          <div className="prose">
            <Mdx source={project.body} />
          </div>
        </section>
      ) : null}

      {prev && next ? (
        <nav className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="Other series">
          <Link href={prev.href} className="group flex items-center gap-3 text-ink-2 hover:text-accent-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="label block">Previous</span>
              <span className="text-ink">{prev.title}</span>
            </span>
          </Link>
          <Link href={next.href} className="group flex items-center justify-end gap-3 text-right text-ink-2 hover:text-accent-ink">
            <span>
              <span className="label block">Next</span>
              <span className="text-ink">{next.title}</span>
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
