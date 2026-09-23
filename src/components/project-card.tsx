import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  const c = project.cover;
  return (
    <Link
      href={project.href}
      className="panel ticks group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-bg-deep">
        <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="label">
          {project.year} · {project.medium}
        </p>
        <h3 className="flex items-start gap-1.5 font-display text-[1.15rem] leading-snug font-semibold text-ink">
          <span>{project.title}</span>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-ink-3 opacity-0 transition group-hover:opacity-100" />
        </h3>
        <p className="line-clamp-2 text-[0.9rem] leading-relaxed text-ink-2">{project.summary}</p>
        <p className="label mt-auto pt-2">{project.images.length} {project.images.length === 1 ? "image" : "images"}</p>
      </div>
    </Link>
  );
}
