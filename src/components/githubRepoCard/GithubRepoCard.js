import React from "react";
import ProjectLanguages from "../../components/projectLanguages/ProjectLanguages";
import "./GithubRepoCard.css";
import { Fade } from "react-reveal";

export default function GithubRepoCard({ repo, theme }) {
  function openRepoinNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  const accent = repo.color || theme.jacketColor;
  const createdOn = new Date(repo.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <div
      className="repo-card-div"
      style={{
        background: `linear-gradient(180deg, ${accent}1f 0%, ${theme.body} 88px)`,
        borderTop: `4px solid ${accent}`,
      }}
    >
      <Fade bottom duration={2000} distance="40px">
        <div key={repo.id} className="repo-card-inner" onClick={() => openRepoinNewTab(repo.url)}>
          <div className="repo-name-div">
            <div className="repo-name-left">
              <svg
              aria-hidden="true"
              className="octicon repo-svg"
              height="16"
              role="img"
              viewBox="0 0 12 16"
              width="12"
            >
              <path
                fill-rule="evenodd"
                d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
              ></path>
            </svg>
              <p className="repo-name" style={{ color: theme.text }}>
                {repo.name}
              </p>
            </div>
            <p
              className="repo-creation-date subTitle"
              style={{ color: theme.secondaryText }}
            >
              {createdOn}
            </p>
          </div>
          <p className="repo-description" style={{ color: theme.text }}>
            {repo.description}
          </p>
          <div
            className="repo-details"
            style={{ borderTop: `1px solid ${theme.headerColor}` }}
          >
            <ProjectLanguages
              className="repo-languages"
              logos={repo.languages}
            />
            <p className="repo-view-link" style={{ color: accent }}>
              View on GitHub →
            </p>
          </div>

        </div>
      </Fade>
    </div>
  );
}
