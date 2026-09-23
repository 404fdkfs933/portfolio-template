import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <p className="label">404</p>
        <h1 className="mt-3 font-display font-semibold text-[2.1rem] leading-tight text-ink">That page is not here.</h1>
        <p className="mt-4 text-ink-2">It may have moved, or the link was wrong. Everything on the site is one click from the work index.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/work" className="rounded-full bg-ink px-5 py-2.5 text-[0.92rem] text-bg hover:opacity-85">All work</Link>
          <Link href="/" className="rounded-full border border-line-strong px-5 py-2.5 text-[0.92rem] text-ink hover:bg-accent-soft">Home</Link>
        </div>
      </div>
    </div>
  );
}
