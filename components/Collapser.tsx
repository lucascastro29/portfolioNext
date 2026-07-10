"use client";

import img_miFace from "../images/foto.jpg";
import Image from "next/image";
import Skills from "../containers/Skills";
import { CollapserModel } from "../models/CollapserModel";
import { useContext } from "react";
import { PortfolioContext } from "./context/PortfolioContext";

const stripPrefix = (s: string) =>
  s.includes(" / ") ? s.split(" / ").slice(1).join(" / ") : s;

const Collapser = (props: CollapserModel) => {
  const ctx = useContext(PortfolioContext);
  const language = ctx?.language ?? "es";

  const roleBadge =
    language === "es"
      ? "Analista IT · Desarrollador de Software"
      : "IT Analyst · Software Developer";

  const workPeriod = language === "es" ? "2022 — Presente" : "2022 — Present";
  const cyberPeriod = "2020 — 2022";

  return (
    <section id="about" aria-label="About me section" className="section-stack">

      {/* ── About ─────────────────────────────────────────────── */}
      <article
        className="led-sign section-panel about-grid parallax-large"
        style={{ marginBottom: "1.4rem" }}
        data-aos="fade-up"
      >
        <div className="about-photo-wrap">
          <Image
            src={img_miFace}
            alt="Foto de perfil de Lucas Castro"
            layout="fill"
            objectFit="cover"
            objectPosition="center top"
            className="about-photo"
            priority
            sizes="(max-width: 480px) 220px, (max-width: 980px) 380px, 380px"
          />
          {/* Detection overlay — frames the full portrait */}
          <div className="about-detect-overlay" aria-hidden="true">
            <div className="fd-corner fd-corner--tl" />
            <div className="fd-corner fd-corner--tr" />
            <div className="fd-corner fd-corner--bl" />
            <div className="fd-corner fd-corner--br" />
            <div className="fd-scan" />
            <div className="fd-label">
              {language === "es" ? "Lucas Castro · Analista IT" : "Lucas Castro · IT Analyst"}
            </div>
          </div>
        </div>

        <div className="about-copy">
          <div className="section-label">{props.aboutLabel}</div>
          <h3 className="about-name">Lucas Castro</h3>
          <div className="about-role-badge">{roleBadge}</div>
          <p style={{ marginTop: "0.75rem" }}>{props.Textaboutme}</p>
        </div>
      </article>

      {/* ── Work + Studies ────────────────────────────────────── */}
      <div className="split-grid">

        {/* Work */}
        <article className="led-sign section-panel parallax-large" data-aos="fade-up" data-aos-delay="60">
          <div className="section-label">{props.Titlework}</div>
          <h2 className="subtitle" style={{ fontSize: "var(--fs-h3)", marginBottom: "1.2rem" }}>
            {stripPrefix(props.Titlework)}
          </h2>
          <div className="timeline">
            <div className="timeline-item">
              <p className="timeline-title">
                {language === "es" ? "Desarrollo IA & Automatización" : "AI & Automation Development"}
              </p>
              <span className="timeline-period">{workPeriod}</span>
              <p className="timeline-desc">{props.Textwork}</p>
            </div>
            <div className="timeline-item">
              <p className="timeline-title">
                {language === "es" ? "Técnico Informático — Cyber Green" : "IT Technician — Cyber Green"}
              </p>
              <span className="timeline-period">{cyberPeriod}</span>
              <p className="timeline-desc">
                {language === "es"
                  ? "Soporte técnico, mantenimiento de hardware y atención al cliente."
                  : "Technical support, hardware maintenance and customer service."}
              </p>
            </div>
          </div>
        </article>

        {/* Studies */}
        <article className="led-sign section-panel parallax-large" data-aos="fade-up" data-aos-delay="120">
          <div className="section-label">{props.Titlestudios}</div>
          <h2 className="subtitle" style={{ fontSize: "var(--fs-h3)", marginBottom: "1.2rem" }}>
            {stripPrefix(props.Titlestudios)}
          </h2>
          <ul className="study-list">
            <li>{props.estudios1}</li>
            <li>{props.estudios2}</li>
            <li>{props.estudios3}</li>
            <li>{props.estudios4}</li>
          </ul>
        </article>
      </div>

      {/* ── Skills ────────────────────────────────────────────── */}
      <Skills title={props.skilltitle} />
    </section>
  );
};

export default Collapser;
