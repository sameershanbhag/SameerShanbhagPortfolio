import React from "react";
import "./Header.css";
import { Fade } from "react-reveal";
import { NavLink, Link } from "react-router-dom";
import { settings } from "../../portfolio.js";
import { getPortfolio } from "../../portfolio.de.js";
import { useLang, setLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";
import SeoHeader from "../seoHeader/SeoHeader";
import AskMeAnything from "../askMeAnything/AskMeAnything";

function LangToggle({ theme, lang }) {
  return (
    <a
      className="lang-toggle"
      role="button"
      aria-label="Language / Sprache"
      tabIndex={0}
    >
      <span
        className={`lang-toggle-option ${lang === "en" ? "active" : ""}`}
        style={{ color: theme.text, opacity: lang === "en" ? 1 : 0.5 }}
        onClick={() => setLang("en")}
      >
        EN
      </span>
      <span className="lang-toggle-divider" style={{ color: theme.text }}>
        |
      </span>
      <span
        className={`lang-toggle-option ${lang === "de" ? "active" : ""}`}
        style={{ color: theme.text, opacity: lang === "de" ? 1 : 0.5 }}
        onClick={() => setLang("de")}
      >
        DE
      </span>
    </a>
  );
}

function Header({ theme }) {
  const lang = useLang();
  const t = getStrings(lang);
  const { greeting, contactPageData } = getPortfolio(lang);
  const link = settings.isSplash ? "/splash" : "home";
  return (
    <Fade top duration={1000} distance="20px">
      <SeoHeader />
      <div>
        <header
          className="header"
          style={{ "--header-highlight": theme.highlight }}
        >
          <NavLink to={link} tag={Link} className="logo">
            <span style={{ color: theme.text }}> &lt;</span>
            <span className="logo-name" style={{ color: theme.text }}>
              {greeting.logo_name}
            </span>
            <span style={{ color: theme.text }}>/&gt;</span>
          </NavLink>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon"></span>
          </label>
          <ul className="menu" style={{ backgroundColor: theme.body }}>
            <li>
              <NavLink
                to="/home"
                tag={Link}
                className="nav-link"
                activeStyle={{ fontWeight: "bold" }}
                style={{ color: theme.text }}
              >
                {t.navHome}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/education"
                tag={Link}
                className="nav-link"
                activeStyle={{ fontWeight: "bold" }}
                style={{ color: theme.text }}
              >
                {t.navEducation}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/experience"
                tag={Link}
                className="nav-link"
                activeStyle={{ fontWeight: "bold" }}
                style={{ color: theme.text }}
              >
                {t.navExperience}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                tag={Link}
                className="nav-link"
                activeStyle={{ fontWeight: "bold" }}
                style={{ color: theme.text }}
              >
                {t.navProjects}
              </NavLink>
            </li>
            <li>
              <a
                href={contactPageData.blogSection.link}
                className="nav-link"
                style={{ color: theme.text }}
              >
                {t.navBlog}
              </a>
            </li>
            <li>
              <NavLink
                to="/contact"
                tag={Link}
                className="nav-link"
                activeStyle={{ fontWeight: "bold" }}
                style={{ color: theme.text }}
              >
                {t.navContact}
              </NavLink>
            </li>
            <li>
              <LangToggle theme={theme} lang={lang} />
            </li>
          </ul>
        </header>
        <AskMeAnything theme={theme} />
      </div>
    </Fade>
  );
}

export default Header;
