import React from "react";
import "./Footer.css";
import { Fade } from "react-reveal";
import { greeting } from "../../portfolio.js";
import { useLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  const t = getStrings(useLang());
  return (
    <div className="footer-div">
      <Fade>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          {t.madeWithLoveBy} <span role="img">❤️</span> {t.by} {greeting.title}
        </p>
        {/* <ToggleSwitch theme={props.theme} onToggle={props.onToggle}/> */}
      </Fade>
    </div>
  );
}
