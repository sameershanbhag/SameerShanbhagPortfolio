import React from "react";
import "./CertificationCard.css";
import { Fade } from "react-reveal";
import { useLang } from "../../i18n/lang.js";
import { getStrings } from "../../i18n/strings.js";

function CertificationCard({ certificate, theme }) {
  const t = getStrings(useLang());
  return (
    <Fade bottom duration={2000} distance="20px">
      <div className="cert-card">
        <div className="content">
          <a
            href={certificate.certificate_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="content-overlay"></div>
            <div
              className="cert-header"
              style={{ backgroundColor: certificate.color_code }}
            >
              <img
                className="logo_img"
                src={
                  new URL(
                    `../../assests/images/${certificate.logo_path}`,
                    import.meta.url
                  ).href
                }
                alt={certificate.alt_name}
              />
            </div>
            <div className="content-details fadeIn-top">
              <h3 className="content-title" style={{ color: theme.body }}>
                {t.certificate}
              </h3>
            </div>
          </a>
        </div>
        <div className="cert-body">
          <h2 className="cert-body-title" style={{ color: theme.text }}>
            {certificate.title}
          </h2>
          <h3
            className="cert-body-subtitle"
            style={{ color: theme.secondaryText }}
          >
            {certificate.subtitle}
          </h3>
        </div>
      </div>
    </Fade>
  );
}

export default CertificationCard;
