import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[100dvh] flex-col justify-center py-24">
      <h1 className="display display-outline text-[clamp(4rem,14vw,12rem)]">404</h1>
      <p className="mt-6 max-w-[44ch] text-ink-2">That page is not here. It may have moved, or the link was wrong.</p>
      <div className="mt-8 flex flex-wrap gap-6">
        <Link href="/work" className="arrow-link">
          <span className="arrow" aria-hidden />
          <span>All work</span>
        </Link>
        <Link href="/" className="arrow-link">
          <span className="arrow" aria-hidden />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
