import type { ReactNode } from "react";

export function SectionHead({ title, kicker, action }: { title: string; kicker?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-3">
      <div className="min-w-0">
        {kicker ? <p className="label mb-1.5">{kicker}</p> : null}
        <h2 className="font-display font-semibold text-[1.55rem] leading-tight tracking-[-0.015em] text-ink md:text-[1.8rem]">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
