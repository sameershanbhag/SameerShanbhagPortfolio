"use client";

import Link from "next/link";
import { useLang, setLang } from "@/lib/lang";

const PORTFOLIO = "https://sameershanbhag.com";

const NAV = {
  en: {
    home: "Home",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact Me",
  },
  de: {
    home: "Startseite",
    education: "Ausbildung",
    experience: "Erfahrung",
    projects: "Projekte",
    blog: "Blog",
    contact: "Kontakt",
  },
};

/**
 * Pixel-faithful port of the portfolio's Header (components/header/Header.js):
 * same logo mark, nav items, spacing, hover fill, mobile hamburger, and the
 * EN|DE language toggle, so the blog reads as another page of the same site.
 */
export default function SiteHeader() {
  const lang = useLang();
  const t = NAV[lang];
  return (
    <header className="pf-header">
      <Link href="/" className="pf-logo">
        <span>&nbsp;&lt;</span>
        <span className="pf-logo-name">SameerShanbhag</span>
        <span>/&gt;</span>
      </Link>
      <input className="pf-menu-btn" type="checkbox" id="pf-menu-btn" />
      <label className="pf-menu-icon" htmlFor="pf-menu-btn" aria-label="Toggle menu">
        <span className="pf-navicon"></span>
      </label>
      <ul className="pf-menu">
        <li>
          <a href={`${PORTFOLIO}/home`}>{t.home}</a>
        </li>
        <li>
          <a href={`${PORTFOLIO}/education`}>{t.education}</a>
        </li>
        <li>
          <a href={`${PORTFOLIO}/experience`}>{t.experience}</a>
        </li>
        <li>
          <a href={`${PORTFOLIO}/projects`}>{t.projects}</a>
        </li>
        <li>
          <Link href="/" className="pf-active" aria-current="page">
            {t.blog}
          </Link>
        </li>
        <li>
          <a href={`${PORTFOLIO}/contact`}>{t.contact}</a>
        </li>
        <li>
          <span className="pf-lang-toggle" role="button" aria-label="Language / Sprache">
            <button
              type="button"
              className={`pf-lang-option ${lang === "en" ? "pf-lang-active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <span className="pf-lang-divider">|</span>
            <button
              type="button"
              className={`pf-lang-option ${lang === "de" ? "pf-lang-active" : ""}`}
              onClick={() => setLang("de")}
            >
              DE
            </button>
          </span>
        </li>
      </ul>
    </header>
  );
}
