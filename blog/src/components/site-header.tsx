import Link from "next/link";

const PORTFOLIO_URL = "https://sameershanbhag.com";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur border-b border-accent-soft/40">
      <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-baseline text-xl text-ink transition-colors duration-200 hover:text-accent"
        >
          <span>&lt;</span>
          <span className="font-logo px-1 pt-1">Sameer Shanbhag</span>
          <span>/&gt;</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2 text-[15px] font-medium">
          <Link
            href="/"
            className="px-3 py-2 rounded-lg text-ink transition-colors duration-200 hover:bg-highlight hover:text-accent"
          >
            Posts
          </Link>
          <Link
            href="/tags/"
            className="px-3 py-2 rounded-lg text-ink transition-colors duration-200 hover:bg-highlight hover:text-accent"
          >
            Tags
          </Link>
          <a
            href={PORTFOLIO_URL}
            className="ml-1 px-4 py-2 rounded-lg bg-accent text-white transition-colors duration-200 hover:bg-ink"
          >
            Portfolio
          </a>
        </nav>
      </div>
    </header>
  );
}
