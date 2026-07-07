import Link from "next/link";

const PORTFOLIO = "https://sameershanbhag.com/#";

/**
 * Pixel-faithful port of the portfolio's Header (components/header/Header.js):
 * same logo mark, nav items, spacing, hover fill and mobile hamburger, so the
 * blog reads as another page of sameershanbhag.com.
 */
export default function SiteHeader() {
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
          <a href={`${PORTFOLIO}/home`}>Home</a>
        </li>
        <li>
          <a href={`${PORTFOLIO}/education`}>Education</a>
        </li>
        <li>
          <a href={`${PORTFOLIO}/experience`}>Experience</a>
        </li>
        <li>
          <a href={`${PORTFOLIO}/projects`}>Projects</a>
        </li>
        <li>
          <Link href="/" className="pf-active" aria-current="page">
            Blog
          </Link>
        </li>
        <li>
          <a href={`${PORTFOLIO}/contact`}>Contact Me</a>
        </li>
      </ul>
    </header>
  );
}
