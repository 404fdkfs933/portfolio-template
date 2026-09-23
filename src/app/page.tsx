import Link from "next/link";
import { getFeatured, getProjects } from "@/lib/content";
import { site } from "@/lib/site";
import { PrintedHeading } from "@/components/printed-heading";
import { HeroGhost } from "@/components/hero-ghost";
import { ProjectBands, type Band } from "@/components/project-bands";

export default function Home() {
  const featured = getFeatured();
  const all = getProjects();
  const bands: Band[] = featured.map((p) => ({
    slug: p.slug,
    href: p.href,
    title: p.title,
    year: p.year,
    medium: p.medium,
    summary: p.summary,
    images: p.images,
  }));

  return (
    <div>
      {/* ── Main section: statement left, blurred preview right ────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="hero-grid relative grid gap-12">
          <div className="hero-copy flex flex-col justify-center lg:justify-start">
            <PrintedHeading
              className="max-w-[18ch] font-display text-[2.4rem] leading-[1.04] font-semibold tracking-[-0.03em] text-ink sm:text-[3.2rem] lg:text-[3.9rem]"
              segments={[
                { t: site.statement.before },
                // A non-breaking space glues the accent phrase to its first word,
                // so it never splits across lines.
                { t: " " + site.statement.accent.replace(/ /g, " "), accent: true },
                { t: site.statement.after },
              ]}
            />
            <p className="printed-after mt-8 max-w-[46ch] text-[1.12rem] leading-relaxed text-ink-2">{site.intro}</p>
          </div>
          {featured[0] ? <HeroGhost image={featured[0].cover} /> : null}
        </div>
      </section>

      {/* ── One band per featured project ──────────────────────────────── */}
      {bands.length ? (
        <ProjectBands bands={bands} />
      ) : (
        <div className="shell py-20 text-center text-ink-2">
          No projects yet. Add a file to <code>content/projects/</code> and images to <code>public/art/</code>.
        </div>
      )}

      <div className="shell mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="max-w-[58ch] text-[0.85rem] leading-relaxed text-ink-3">Swipe, or use the arrows, to move through each series. Open a series for every piece at full size.</p>
        <Link href="/work" className="label !text-accent-ink hover:underline">
          All {all.length} series →
        </Link>
      </div>
    </div>
  );
}
