import React from "react";
import "./Certifications.css";
import { Fade } from "react-reveal";
import { certifications } from "../../portfolio";
import { useLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";
import CertificationCard from "../../components/certificationCard/CertificationCard";

function Certifications({ theme }) {
  const t = getStrings(useLang());
  return (
    <div className="main" id="certs">
      <div className="certs-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="certs-header" style={{ color: theme.text }}>
            {t.certifications}
          </h1>
        </Fade>
      </div>
      <div className="certs-body-div">
        {certifications.certifications.map((cert) => {
          return <CertificationCard certificate={cert} theme={theme} />;
        })}
      </div>
    </div>
  );
}

export default Certifications;
