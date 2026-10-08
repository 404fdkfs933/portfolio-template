import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

/** Two columns of big tiles, one per series: picture, piece count, giant title. */
export function SeriesTiles({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <div className="shell py-20 text-center text-ink-2">
        No series yet. Add a file to <code>content/projects/</code> and images to <code>public/art/</code>.
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2">
      {projects.map((p) => (
        <Link key={p.slug} href={p.href} className="tile md:[&:nth-child(odd):last-child]:col-span-2 md:[&:nth-child(odd):last-child]:aspect-[16/6]">
          <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} sizes="(min-width: 768px) 50vw, 100vw" />
          <div className="tile-copy relative z-10">
            <p className="label">
              {p.images.length} {p.images.length === 1 ? "piece" : "pieces"} · {p.year}
            </p>
            <h2 className="display tile-title mt-2">{p.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
