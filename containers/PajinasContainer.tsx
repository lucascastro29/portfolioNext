"use client";

import Image from "next/image";
import { useContext } from "react";
import { PajinasModel } from "../models/PajinasModel";
import { PortfolioContext } from "../components/context/PortfolioContext";
import translations from "../content/translations.json";
import img_pajina1 from "../images/ecommerce.png";
import img_pajina4 from "../images/huerta.png";
import img_pajina5 from "../images/webs_uy.png";
import img_routine from "../images/desarrollo-web.jpeg";
import img_flyer1 from "../images/flyer1.jpg";
import img_flyer2 from "../images/flyer2.jpg";
import img_flyer3 from "../images/flyer3.jpg";

const PajinasContainer = (props: PajinasModel) => {
  const ctx = useContext(PortfolioContext);
  const language = (ctx?.language ?? "es") as "es" | "en";
  const t = translations[language];

  const websites = [
    { key: "ecommerce" as const,     image: img_pajina1, href: "https://e-commerce-next-theta.vercel.app/", tag: "E-Commerce · Web App" },
    { key: "huerta" as const,        image: img_pajina4, href: "https://huerta-249.web.app/inicio",          tag: "Community · Web Site" },
    { key: "valdnar" as const,       image: img_pajina5, href: "https://valdnar.com",                        tag: "Agency · Tech Studio" },
    { key: "routineuniverse" as const, image: img_routine, href: "https://routineuniverse.com",              tag: "Productivity · Web App" },
  ];

  const designs = [
    { key: "ecommerce" as const, image: img_flyer1 },
    { key: "marketing" as const, image: img_flyer2 },
    { key: "caza" as const,      image: img_flyer3 },
  ];

  return (
    <section id="projects" aria-label="Projects section" className="section-stack">
      <article className="led-sign section-panel parallax-large">

        <div className="section-label" data-aos="fade-up">{t.projectsTitle}</div>
        <h2 className="subtitle" data-aos="fade-up" data-aos-delay="60">{t.projectsHeading}</h2>

        {/* Web projects */}
        <h3 className="subsection-title" data-aos="fade-up" data-aos-delay="100">{props.Titlewebsite}</h3>
        <div className="project-grid">
          {websites.map(({ key, image, href, tag }, i) => {
            const info = t.projects[key];
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                aria-label={`${info.title} — ${t.visitWebsite}`}
                data-aos="fade-up"
                data-aos-delay={120 + i * 100}
              >
                <div className="project-media">
                  <Image
                    src={image}
                    alt={info.title}
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                  {/* Detection overlay */}
                  <div className="project-detect" aria-hidden="true">
                    <div className="pdc pdc--tl" />
                    <div className="pdc pdc--tr" />
                    <div className="pdc pdc--bl" />
                    <div className="pdc pdc--br" />
                    <span className="pdc-label">{tag}</span>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-info-copy">
                    <strong className="project-info-title">{info.title}</strong>
                    <p className="project-info-desc">{info.desc}</p>
                  </div>
                  <span className="project-info-stack">{info.stack}</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Design section */}
        <h3 className="subsection-title" data-aos="fade-up" data-aos-delay="60">{props.FlyersProjects}</h3>
        <div className="project-grid">
          {designs.map(({ key, image }, i) => {
            const info = t.design[key];
            return (
              <article
                key={key}
                className="project-card"
                data-aos="fade-up"
                data-aos-delay={80 + i * 100}
              >
                <div className="project-media">
                  <Image
                    src={image}
                    alt={info.title}
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>
                <div className="project-info">
                  <div className="project-info-copy">
                    <strong className="project-info-title">{info.title}</strong>
                    <p className="project-info-desc">{info.desc}</p>
                  </div>
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
