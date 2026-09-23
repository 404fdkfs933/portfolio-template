import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Work",
  description: "Every series, in order.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const projects = getProjects();
  return (
    <div className="shell pt-10 md:pt-14">
      <header className="mb-10 max-w-[48rem]">
        <p className="label mb-4">Work · {projects.length} series</p>
        <h1 className="font-display font-semibold text-[2.2rem] leading-[1.07] tracking-[-0.02em] text-ink md:text-[3rem]">Everything, grouped by series.</h1>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 60}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
