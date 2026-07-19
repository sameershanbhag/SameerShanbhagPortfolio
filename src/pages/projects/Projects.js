import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard";
import PublicationCard from "../../components/publicationsCard/PublicationCard";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-reveal";
import { getPortfolio } from "../../portfolio.de.js";
import { useLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";
import ProjectsData from "./projects.json";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";

function Projects(props) {
  const theme = props.theme;
  const lang = useLang();
  const t = getStrings(lang);
  const { greeting, projectsHeader, publicationsHeader, publications } =
    getPortfolio(lang);
  return (
    <div className="projects-main">
      <Header theme={theme} />
      <div className="basic-projects">
        <Fade bottom duration={2000} distance="40px">
          <div className="projects-heading-div">
            <div className="projects-heading-img-div">
              <ProjectsImg theme={theme} />
            </div>
            <div className="projects-heading-text-div">
              <h1
                className="projects-heading-text"
                style={{ color: theme.text }}
              >
                {projectsHeader.title}
              </h1>
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {projectsHeader["description"]}
              </p>
            </div>
          </div>
        </Fade>
      </div>
      <div className="repo-cards-div-main">
        {ProjectsData.data.map((repo) => {
          return <GithubRepoCard repo={repo} theme={theme} />;
        })}
      </div>
      <Button
        text={t.moreProjects}
        className="project-button"
        href={greeting.githubProfile}
        newTab={true}
        theme={theme}
      />

      {/* Publications  */}
      {publications.data.length > 0 ? (
        <div className="basic-projects">
          <Fade bottom duration={2000} distance="40px">
            <div className="publications-heading-div">
              <div className="publications-heading-text-div">
                <h1
                  className="publications-heading-text"
                  style={{ color: theme.text }}
                >
                  {publicationsHeader.title}
                </h1>
                <p
                  className="projects-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {publicationsHeader["description"]}
                </p>
              </div>
            </div>
          </Fade>
        </div>
      ) : null}

      <div className="publication-cards-div-main">
        {publications.data.map((pub) => {
          return <PublicationCard pub={pub} theme={theme} />;
        })}
      </div>

      <Footer theme={props.theme} onToggle={props.onToggle} />
      <TopButton theme={props.theme} />
    </div>
  );
}

export default Projects;
