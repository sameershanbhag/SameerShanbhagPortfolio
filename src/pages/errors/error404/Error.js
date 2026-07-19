import React from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import TopButton from "../../../components/topButton/TopButton";
import { Fade } from "react-reveal";
import "./Error.css";
import { Link } from "react-router-dom";
import { useLang } from "../../../i18n/lang.js";
import { getStrings } from "../../../i18n/strings.js";

export default function Error(props) {
  const theme = props.theme;
  const t = getStrings(useLang());
  return (
    <div className="error-main">
      <Header theme={props.theme} />
      <div className="error-class">
        <Fade bottom duration={2000} distance="40px">
          <h1>{t.errorWoops}</h1>
          <h1 className="error-404">404</h1>
          <p>{t.errorMessage}</p>
          <Link
            className="main-button"
            to="/home"
            style={{
              color: theme.body,
              backgroundColor: theme.text,
              border: `solid 1px ${theme.text}`,
              display: "inline-flex",
            }}
          >
            {t.errorGoHome}
          </Link>
        </Fade>
      </div>
      <Footer theme={props.theme} />
      <TopButton theme={props.theme} />
    </div>
  );
}
