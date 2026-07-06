export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-accent-soft/40">
      <div className="mx-auto max-w-5xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://sameershanbhag.com"
            className="font-medium text-accent transition-colors duration-200 hover:text-ink"
          >
            Sameer Shanbhag
          </a>
          . All thoughts my own.
        </p>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <a
            href="/feed.xml"
            className="transition-colors duration-200 hover:text-accent"
          >
            RSS
          </a>
          <a
            href="https://github.com/sameershanbhag"
            className="transition-colors duration-200 hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sameershanbhag/"
            className="transition-colors duration-200 hover:text-accent"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
