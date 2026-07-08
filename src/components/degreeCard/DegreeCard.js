import React, { Component } from "react";
import "./DegreeCard.css";
import { Fade, Flip } from "react-reveal";

class DegreeCard extends Component {
  render() {
    const degree = this.props.degree;
    const theme = this.props.theme;
    return (
      <div className="degree-card">
        {degree.logo_path && (
          <Flip left duration={2000}>
            <div
              className="card-img"
              style={{ border: `3px solid ${degree.color || theme.headerColor}` }}
            >
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: "scale(0.9)",
                }}
                src={new URL(`../../assests/images/${degree.logo_path}`, import.meta.url).href}
                alt={degree.alt_name}
              />
            </div>
          </Flip>
        )}
        <Fade right duration={2000} distance="40px">
          <div
            className="card-body"
            style={{
              width: degree.logo_path ? "90%" : "100%",
              borderTop: `4px solid ${degree.color || theme.headerColor}`,
              background: `linear-gradient(180deg, ${degree.color || theme.headerColor}12 0%, transparent 120px)`,
            }}
          >
            <div
              className="body-header"
              style={{ backgroundColor: `${degree.color || theme.headerColor}22` }}
            >
              <div className="body-header-title">
                <h2 className="card-title" style={{ color: theme.text }}>
                  {degree.title}
                </h2>
                <h3 className="card-subtitle" style={{ color: theme.text }}>
                  {degree.subtitle}
                </h3>
              </div>
              <div className="body-header-duration">
                <h3 className="duration" style={{ color: theme.text }}>
                  {degree.duration}
                </h3>
              </div>
            </div>
            <div className="body-content">
              {degree.descriptions.map((sentence) => {
                return (
                  <p className="content-list" style={{ color: theme.text }}>
                    {sentence}
                  </p>
                );
              })}
              {degree.website_link && (
                <a
                  href={degree.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="visit-btn"
                    style={{ backgroundColor: degree.color || theme.headerColor }}
                  >
                    <p className="btn" style={{ color: "#ffffff" }}>
                      Visit Website
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default DegreeCard;
