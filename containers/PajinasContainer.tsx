"use client";

import Image from "next/image";
import { useContext } from "react";
import { PajinasModel } from "../models/PajinasModel";
import { PortfolioContext } from "../components/context/PortfolioContext";
import translations from "../content/translations.json";
import img_pajina1 from "../images/ecommerce.png";

import img_flyer1 from "../images/flyer1.jpg";
import img_flyer2 from "../images/flyer2.jpg";
import img_flyer3 from "../images/flyer3.jpg";
import img_pajina5 from "../images/valdnar-cover.png";
import img_routine from "../images/routineuniverse-cover.png";
import img_botbinance from "../images/bot-binance-cover.gif";
const PajinasContainer = (props: PajinasModel) => {
  const ctx = useContext(PortfolioContext);
  const language = (ctx?.language ?? "es") as "es" | "en";
  const t = translations[language];

  const websites = [
    {
      key: "ecommerce" as const,
      image: img_pajina1,
      href: "https://e-commerce-next-theta.vercel.app/",
      tag: "E-Commerce · Web App",
      colorKey: "cyan",
    },
    {
      key: "valdnar" as const,
      image: img_pajina5,
      href: "https://valdnar.com",
      tag: "Agency · Tech Studio",
      colorKey: "violet",
    },
    {
      key: "routineuniverse" as const,
      image: img_routine,
      href: "https://routineuniverse.com",
      tag: "Productivity · Web App",
      colorKey: "green",
    },/*
    {
      key: "botbinance" as const,
      image: img_botbinance,
      href: "https://github.com/lucascastro29/botBinance",
      tag: "Trading · AI Agent",
      colorKey: "amber",
    },*/ 
  ];

  const designs = [
    { key: "ecommerce" as const, image: img_flyer1 },
    { key: "marketing" as const, image: img_flyer2 },
    { key: "caza" as const,      image: img_flyer3 },
  ];

  const colorMap: Record<string, {
    chipBg: string; chipBorder: string; chipText: string;
    hoverBorder: string; hoverShadow: string;
    cornerColor: string; labelColor: string;
  }> = {
    cyan: {
      chipBg: "rgba(34,211,238,0.1)", chipBorder: "rgba(34,211,238,0.3)", chipText: "var(--cyan)",
      hoverBorder: "rgba(34,211,238,0.4)", hoverShadow: "0 0 32px rgba(56,189,248,0.22), 0 16px 48px rgba(0,0,0,0.5)",
      cornerColor: "rgba(56,189,248,0.5)", labelColor: "#7dd3fc",
    },
    violet: {
      chipBg: "rgba(167,139,250,0.1)", chipBorder: "rgba(167,139,250,0.3)", chipText: "var(--violet)",
      hoverBorder: "rgba(167,139,250,0.4)", hoverShadow: "0 0 32px rgba(167,139,250,0.18), 0 16px 48px rgba(0,0,0,0.5)",
      cornerColor: "rgba(167,139,250,0.5)", labelColor: "#c4b5fd",
    },
    green: {
      chipBg: "rgba(52,211,153,0.1)", chipBorder: "rgba(52,211,153,0.3)", chipText: "var(--green)",
      hoverBorder: "rgba(52,211,153,0.4)", hoverShadow: "0 0 32px rgba(52,211,153,0.18), 0 16px 48px rgba(0,0,0,0.5)",
      cornerColor: "rgba(52,211,153,0.5)", labelColor: "#6ee7b7",
    },
    amber: {
      chipBg: "rgba(251,191,36,0.1)", chipBorder: "rgba(251,191,36,0.3)", chipText: "var(--amber)",
      hoverBorder: "rgba(251,191,36,0.4)", hoverShadow: "0 0 32px rgba(251,191,36,0.18), 0 16px 48px rgba(0,0,0,0.5)",
      cornerColor: "rgba(251,191,36,0.5)", labelColor: "#fcd34d",
    },
  };

  return (
    <section id="projects" aria-label="Projects section" className="section-stack">
      <article className="led-sign section-panel parallax-large">

        <div className="section-label" data-aos="fade-up">{t.projectsTitle}</div>
        <p className="section-kicker" data-aos="fade-up" data-aos-delay="90">
          {language === "es" ? "Sitios web, aplicaciones y diseño." : "Websites, apps and design."}
        </p>

        {/* Web projects — alternating rows */}
        <h3 className="subsection-title" data-aos="fade-up" data-aos-delay="100">{props.Titlewebsite}</h3>
        <div className="project-rows">
          {websites.map(({ key, image, href, tag, colorKey }, i) => {
            const info = t.projects[key];
            const colors = colorMap[colorKey];
            const imageFirst = i % 2 !== 0;

            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-row ${imageFirst ? "project-row--img-first" : ""}`}
                aria-label={`${info.title} — ${t.visitWebsite}`}
                data-aos="fade-up"
                data-aos-delay={i * 120}
                style={{
                  "--pr-hover-border": colors.hoverBorder,
                  "--pr-hover-shadow": colors.hoverShadow,
                } as React.CSSProperties}
              >
                {imageFirst && (
                  <div className="project-row-media">
                    <Image
                      src={image}
                      alt={info.title}
                      layout="fill"
                      objectFit="cover"
                      sizes="320px"
                    />
                    <div className="project-detect" aria-hidden="true" style={{ "--corner-color": colors.cornerColor } as React.CSSProperties}>
                      <div className="pdc pdc--tl" />
                      <div className="pdc pdc--tr" />
                      <div className="pdc pdc--bl" />
                      <div className="pdc pdc--br" />
                      <span className="pdc-label" style={{ color: colors.labelColor }}>{tag}</span>
                    </div>
                  </div>
                )}

                <div className="project-row-copy">
                  <span
                    className="project-row-chip"
                    style={{
                      background: colors.chipBg,
                      borderColor: colors.chipBorder,
                      color: colors.chipText,
                    }}
                  >
                    {tag}
                  </span>
                  <strong className="project-row-title">{info.title}</strong>
                  <p className="project-row-desc">{info.desc}</p>
                  <span className="project-row-stack">{info.stack}</span>
                </div>

                {!imageFirst && (
                  <div className="project-row-media">
                    <Image
                      src={image}
                      alt={info.title}
                      layout="fill"
                      objectFit="cover"
                      sizes="320px"
                    />
                    <div className="project-detect" aria-hidden="true" style={{ "--corner-color": colors.cornerColor } as React.CSSProperties}>
                      <div className="pdc pdc--tl" />
                      <div className="pdc pdc--tr" />
                      <div className="pdc pdc--bl" />
                      <div className="pdc pdc--br" />
                      <span className="pdc-label" style={{ color: colors.labelColor }}>{tag}</span>
                    </div>
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* Design section */}
        <h3 className="subsection-title" data-aos="fade-up" data-aos-delay="60">{props.FlyersProjects}</h3>
        <div className="design-grid">
          {designs.map(({ key, image }, i) => {
            const info = t.design[key];
            return (
              <article
                key={key}
                className="design-card"
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className="design-card-media">
                  <Image
                    src={image}
                    alt={info.title}
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>
                <div className="design-card-info">
                  <strong className="design-card-title">{info.title}</strong>
                  <p className="design-card-desc">{info.desc}</p>
                </div>
              </article>
            );
          })}
        </div>

      </article>
    </section>
  );
};

export default PajinasContainer;
