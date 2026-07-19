import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Educations from "../../containers/education/Educations";
import Certifications from "../../containers/certifications/Certifications";
import CompetitiveSites from "../../components/competitiveSites/CompetitiveSites";
import EducationImg from "./EducationImg";
import { competitiveSites, certifications } from "../../portfolio";
import { getPortfolio } from "../../portfolio.de.js";
import { useLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";
import "./EducationComponent.css";
import { Fade } from "react-reveal";

function Education(props) {
  const theme = props.theme;
  const lang = useLang();
  const t = getStrings(lang);
  const { education } = getPortfolio(lang);
  return (
    <div className="education-main">
      <Header theme={props.theme} />
      <div className="basic-education">
        <Fade bottom duration={2000} distance="40px">
          <div className="heading-div">
            <div className="heading-img-div">
              <EducationImg theme={theme} />
            </div>
            <div className="heading-text-div">
              <h1 className="heading-text" style={{ color: theme.text }}>
                {t.educationHeading}
              </h1>
              <h3 className="heading-sub-text" style={{ color: theme.text }}>
                {t.educationSubHeading}
              </h3>
              <p
                className="education-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {education["description"]}
              </p>
              <CompetitiveSites logos={competitiveSites.competitiveSites} />
            </div>
          </div>
        </Fade>
        <Educations theme={props.theme} />
        {certifications.certifications.length > 0 ? (
          <Certifications theme={props.theme} />
        ) : null}
      </div>
      <Footer theme={props.theme} />
      <TopButton theme={props.theme} />
    </div>
  );
}

export default Education;
