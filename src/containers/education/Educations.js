import React from "react";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard.js";
import { getPortfolio } from "../../portfolio.de.js";
import { useLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";
import { Fade } from "react-reveal";

function Educations({ theme }) {
  const lang = useLang();
  const t = getStrings(lang);
  const { degrees } = getPortfolio(lang);
  return (
    <div className="main" id="educations">
      <div className="educations-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="educations-header" style={{ color: theme.text }}>
            {t.degreesReceived}
          </h1>
        </Fade>
      </div>
      <div className="educations-body-div">
        {degrees.degrees.map((degree) => {
          return <DegreeCard degree={degree} theme={theme} />;
        })}
      </div>
    </div>
  );
}

export default Educations;
