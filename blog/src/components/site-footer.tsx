"use client";

import { useLang } from "@/lib/lang";

/** Same closing line as the portfolio's Footer component, both languages. */
export default function SiteFooter() {
  const lang = useLang();
  const made = lang === "de" ? "Gemacht mit" : "Made with";
  const by = lang === "de" ? "von" : "by";
  return (
    <footer className="mt-16 pb-8">
      <p className="text-center font-bold text-muted">
        {made}{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        {by} Sameer Shanbhag
      </p>
      <nav
        aria-label="Footer"
        className="mt-3 flex items-center justify-center gap-5 text-sm text-muted"
      >
        <a href="/blogs/feed.xml" className="transition-colors duration-200 hover:text-accent">
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
    </footer>
  );
}
