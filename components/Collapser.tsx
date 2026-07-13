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

  const workPeriod = language === "es" ? "jul. 2024 — Presente" : "Jul 2024 — Present";
  const cyberPeriod = "2020 — 2022";

  // Academic education (degrees / in-progress studies), bilingual.
  const education: {
    es: string;
    en: string;
    detEs: string;
    detEn: string;
    badgeEs: string;
    badgeEn: string;
    status: "ongoing" | "incomplete";
  }[] = [
    {
      es: "Ingeniería en Computación",
      en: "Computer Engineering",
      detEs: "Facultad de Ingeniería, UdelaR · 2021 – presente (retomada en 2025)",
      detEn: "Faculty of Engineering, UdelaR · 2021 – present (resumed in 2025)",
      badgeEs: "En curso",
      badgeEn: "In progress",
      status: "ongoing",
    },
    {
      es: "Tecnicatura en Ciberseguridad",
      en: "Cybersecurity Technical Degree",
      detEs: "2022 – 2024 · 1½ años cursados",
      detEn: "2022 – 2024 · 1.5 years completed",
      badgeEs: "Incompleta",
      badgeEn: "Incomplete",
      status: "incomplete",
    },
  ];

  const formalEduLabel = language === "es" ? "Educación formal" : "Formal education";
  const certsLabel = language === "es" ? "Certificaciones y cursos" : "Certifications & courses";

  // Certifications (linked to the original documents on Google Drive), bilingual.
  const certs: { es: string; en: string; issuer: string; url: string }[] = [
    {
      es: "Computer Vision e Image Processing en Python",
      en: "Computer Vision & Image Processing in Python",
      issuer: "OpenCV University · 94%",
      url: "https://drive.google.com/file/d/1nMubvg1ITb4DnCAVtFZOY08vS_wpqzd2/view",
    },
    {
      es: "Analista Junior GeneXus 17",
      en: "GeneXus 17 Junior Analyst",
      issuer: "GeneXus",
      url: "https://drive.google.com/file/d/1mmlx3IreOc3TjBMk1gzzoXOO7ms7g5E2/view",
    },
    {
      es: "Jóvenes a Programar — Desarrollo Web Full Stack (430 h)",
      en: "Jóvenes a Programar — Full Stack Web Development (430 h)",
      issuer: "Plan Ceibal · 2021",
      url: "https://drive.google.com/file/d/1xdzI-cSk247U-3A-S8kx8UJInyDiW9Yb/view",
    },
    {
      es: "Gobernanza de la Inteligencia Artificial (50 h)",
      en: "Artificial Intelligence Governance (50 h)",
      issuer: "UBA IALAB",
      url: "https://drive.google.com/file/d/1YlSBRFV_zI6g5KOOur-Ij9VbYmxMCTPP/view",
    },
    {
      es: "Gobernanza de Datos (120 h)",
      en: "Data Governance (120 h)",
      issuer: "UBA IALAB",
      url: "https://drive.google.com/file/d/1knOQ4IptZjNoRivuFzahSLFq_5JJAdWW/view",
    },
    {
      es: "Node.js — Start Coding (50 h)",
      en: "Node.js — Start Coding (50 h)",
      issuer: "UBA IALAB",
      url: "https://drive.google.com/file/d/1IcN2Byj-6yJp1KOmq1OJu-P_tdDuO5Wn/view",
    },
    {
      es: "React Avanzado — Start Coding (25 h)",
      en: "Advanced React — Start Coding (25 h)",
      issuer: "UBA IALAB",
      url: "https://drive.google.com/file/d/1xdm2ECd4R05rWsAoq84DAIakmSLnMsVu/view",
    },
    {
      es: "React Básico — Start Coding (40 h)",
      en: "React Basics — Start Coding (40 h)",
      issuer: "UBA IALAB",
      url: "https://drive.google.com/file/d/1IOWxGMvPZ6iHm2L7-ewFb-E6-Nzena5M/view",
    },
    {
      es: "JavaScript — Start Coding (25 h)",
      en: "JavaScript — Start Coding (25 h)",
      issuer: "UBA IALAB",
      url: "https://drive.google.com/file/d/1YW0vCKdcAUI2hUgSwIXQ22R62aLRrU4y/view",
    },
    {
      es: "Crash Course on Python",
      en: "Crash Course on Python",
      issuer: "Google · Coursera",
      url: "https://drive.google.com/file/d/1vVofGW7xMsP_wPkdUQn6vsNjNW1RD_iO/view",
    },
    {
      es: "First Certificate in English (B2)",
      en: "First Certificate in English (B2)",
      issuer: "Cambridge English",
      url: "https://drive.google.com/file/d/1W1ut3CcLvplLFAHSTV-ggrcsnlC9wPgn/view",
    },
  ];

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
            alt={language === "es" ? "Foto de perfil de Lucas Castro" : "Profile photo of Lucas Castro"}
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
          <p style={{ marginTop: "0.5rem", fontSize: "0.92rem", color: "var(--text-muted)" }}>
            {language === "es" ? "23 años · Montevideo, Uruguay" : "23 years old · Montevideo, Uruguay"}
          </p>
          <p style={{ marginTop: "0.75rem" }}>{props.Textaboutme}</p>
        </div>
      </article>

      {/* ── Work + Studies ────────────────────────────────────── */}
      <div className="split-grid">

        {/* Work */}
        <article className="led-sign section-panel parallax-large" data-aos="fade-up" data-aos-delay="60">
          <div className="section-label">{props.Titlework}</div>
          
          <div className="timeline">
            <div className="timeline-item">
              <p className="timeline-title">
                {language === "es" ? "Analista de IT — SOMIL S.A." : "IT Analyst — SOMIL S.A."}
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
          
          <p className="study-subheading">{formalEduLabel}</p>
          <ul className="edu-list">
            {education.map((e) => (
              <li className="edu-item" key={e.es}>
                <div className="edu-item-head">
                  <span className="edu-degree">{language === "es" ? e.es : e.en}</span>
                  <span
                    className={
                      e.status === "incomplete"
                        ? "edu-badge edu-badge--incomplete"
                        : "edu-badge"
                    }
                  >
                    {language === "es" ? e.badgeEs : e.badgeEn}
                  </span>
                </div>
                <span className="edu-detail">{language === "es" ? e.detEs : e.detEn}</span>
              </li>
            ))}
          </ul>

          <hr className="study-divider" />

          <p className="study-subheading">{certsLabel}</p>
          <ul className="study-list">
            {certs.map((c) => (
              <li key={c.url}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="study-cert-link"
                >
                  <span className="study-cert-name">{language === "es" ? c.es : c.en}</span>
                  <span className="study-cert-issuer">{c.issuer}</span>
                  <span className="study-cert-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* ── Skills ────────────────────────────────────────────── */}
      <Skills title={props.skilltitle} />
    </section>
  );
};

export default Collapser;
