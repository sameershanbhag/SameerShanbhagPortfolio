import React from "react";
import "./Skills.css";
import SkillSection from "./SkillSection";
import { Fade } from "react-reveal";
import { useLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";

export default function Skills(props) {
  const theme = props.theme;
  const t = getStrings(useLang());
  return (
    <div className="main" id="skills">
      <div className="skills-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="skills-header" style={{ color: theme.text }}>
            {t.whatIDo}
          </h1>
        </Fade>
      </div>
      <SkillSection theme={theme} />
    </div>
  );
}
