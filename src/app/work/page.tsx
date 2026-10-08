import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { SeriesTiles } from "@/components/series-tiles";

export const metadata: Metadata = {
  title: "Work",
  description: "Every series, in order.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const projects = getProjects();
  return (
    <div className="pt-28 md:pt-36">
      <header className="shell flex flex-wrap items-end justify-between gap-6 pb-8 md:pb-10">
        <h1 className="display text-[clamp(3.4rem,10vw,9rem)]">Work</h1>
        <p className="label-quiet text-[0.8rem] font-semibold">{projects.length} series</p>
      </header>
      <SeriesTiles projects={projects} />
    </div>
  );
}
