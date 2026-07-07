import React, { Component } from "react";
import "./ExperienceCard.css";
import { Fade } from "react-reveal";

class ExperienceCard extends Component {
  render() {
    const experience = this.props.experience;
    const index = this.props.index;
    const totalCards = this.props.totalCards;
    const theme = this.props.theme;
    return (
      <div
        className="experience-list-item"
        style={{ marginTop: index === 0 ? 30 : 50 }}
      >
        <Fade left duration={2000} distance="40px">
          <div className="experience-card-logo-div">
            <img
              className="experience-card-logo"
              style={{ border: `3px solid ${experience["color"]}` }}
              src={new URL(`../../assests/images/${experience["logo_path"]}`, import.meta.url).href}
              alt=""
            />
          </div>
        </Fade>
        <div className="experience-card-stepper">
          {index !== 0 && (
            <div
              className="stepper-line stepper-line-top"
              style={{ backgroundColor: `${theme.headerColor}` }}
            />
          )}
          <div
            className="stepper-dot"
            style={{ backgroundColor: `${experience["color"]}` }}
          />
          {index !== totalCards - 1 && (
            <div
              className="stepper-line stepper-line-bottom"
              style={{ backgroundColor: `${theme.headerColor}` }}
            />
          )}
        </div>
        <Fade right duration={2000} distance="40px">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="arrow-left"
              style={{ borderRight: `10px solid ${theme.body}` }}
            ></div>
            <div
              className="experience-card"
              style={{
                background: `linear-gradient(180deg, ${experience["color"]}14 0%, ${theme.body} 110px)`,
                borderTop: `4px solid ${experience["color"]}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {experience["roles"] ? (
                    <div className="experience-role-track">
                      {experience["roles"].map((role, roleIndex) => (
                        <div className="experience-role-row" key={roleIndex}>
                          <div className="experience-role-marker">
                            <span
                              className="experience-role-dot"
                              style={{
                                backgroundColor:
                                  roleIndex === 0
                                    ? experience["color"]
                                    : theme.headerColor,
                              }}
                            />
                            {roleIndex !== experience["roles"].length - 1 && (
                              <span
                                className="experience-role-line"
                                style={{ backgroundColor: theme.headerColor }}
                              />
                            )}
                          </div>
                          <div>
                            <h3
                              className="experience-card-title"
                              style={{ color: theme.text }}
                            >
                              {role["title"]}
                            </h3>
                            <p
                              className="experience-role-duration"
                              style={{ color: theme.secondaryText }}
                            >
                              {role["duration"]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h3
                      className="experience-card-title"
                      style={{ color: theme.text }}
                    >
                      {experience["title"]}
                    </h3>
                  )}
                  <p
                    className="experience-card-company"
                    style={{ color: theme.text }}
                  >
                    <a
                      href={experience["company_url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: `${experience["color"]}` }}
                    >
                      {experience["company"]}
                    </a>
                  </p>
                </div>
                <div>
                  <div className="experience-card-heading-right">
                    <p
                      className="experience-card-duration"
                      style={{ color: theme.secondaryText }}
                    >
                      {experience["duration"]}
                    </p>
                    <p
                      className="experience-card-location"
                      style={{ color: theme.secondaryText }}
                    >
                      {experience["location"]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: 20,
                }}
              >
                <div className="repo-description" />
                {experience["points"] ? (
                  <ul>
                    {experience["points"].map((point) => {
                      return (
                        <li
                          className="experience-card-point"
                          style={{ color: theme.text }}
                        >
                          {point}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  experience["description"]
                )}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default ExperienceCard;
