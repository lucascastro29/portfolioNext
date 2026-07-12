"use client";

import { useContext } from "react";
import { PortfolioContext } from "../components/context/PortfolioContext";
import { SkillsModel } from "../models/SkillsModel";
import { TECH_ICON_MAP } from "../components/TechIcons";
import translations from "../content/translations.json";

type TechItem = {
  name: string;
  level: number;
  note: { es: string; en: string };
  category: { es: string; en: string };
  accent: string;
};

const TECHS: TechItem[] = [
  {
    name: "Python",
    level: 92,
    category: { es: "IA · Automatización", en: "AI · Automation" },
    note: {
      es: "Automatización, integraciones, apps de escritorio y data tooling",
      en: "Automation, integrations, desktop apps and data tooling",
    },
    accent: "#3776AB",
  },
  {
    name: "OpenCV · YOLO",
    level: 88,
    category: { es: "Visión Computacional", en: "Computer Vision" },
    note: {
      es: "Detección, seguimiento y control de calidad en entornos reales",
      en: "Detection, tracking and QA in real-world environments",
    },
    accent: "#5C9BD6",
  },
  {
    name: "TensorFlow / Keras",
    level: 83,
    category: { es: "Machine Learning", en: "Machine Learning" },
    note: {
      es: "Entrenamiento de redes CNN y optimización de modelos de clasificación",
      en: "CNN model training and classification model optimization",
    },
    accent: "#FF6F00",
  },
  {
    name: "Next.js · TypeScript",
    level: 84,
    category: { es: "Desarrollo Web", en: "Web Development" },
    note: {
      es: "Arquitectura frontend, rendimiento y experiencia de usuario",
      en: "Frontend architecture, performance and user experience",
    },
    accent: "#22d3ee",
  },
  {
    name: "Node.js · JavaScript",
    level: 76,
    category: { es: "Backend · APIs", en: "Backend · APIs" },
    note: {
      es: "APIs REST, middleware y automatización de flujos de trabajo",
      en: "REST APIs, middleware and workflow automation",
    },
    accent: "#339933",
  },
  {
    name: "SQL · MySQL · PostgreSQL",
    level: 72,
    category: { es: "Bases de Datos", en: "Databases" },
    note: {
      es: "Diseño de bases relacionales y consultas optimizadas",
      en: "Relational database design and optimized queries",
    },
    accent: "#00618A",
  },
  {
    name: "Node-RED",
    level: 70,
    category: { es: "Automatización · IoT", en: "Automation · IoT" },
    note: {
      es: "Flujos visuales para integración de sistemas e interfaces IoT",
      en: "Visual flows for system integration and IoT interfaces",
    },
    accent: "#8F0000",
  },
  {
    name: "C++ · Java · PHP",
    level: 65,
    category: { es: "Lenguajes", en: "Languages" },
    note: {
      es: "Apps de escritorio, backend web y sistemas embebidos",
      en: "Desktop apps, web backend and embedded systems",
    },
    accent: "#00599C",
  },
];

const Skills = (props: SkillsModel) => {
  const ctx = useContext(PortfolioContext);
  const language = (ctx?.language ?? "es") as "es" | "en";
  const t = translations[language];

  return (
    <section id="skills" className="led-sign section-panel parallax-large" data-aos="fade-up">
      <div className="section-label">{props.title}</div>
      <p className="section-kicker">{t.skillsKicker}</p>

      <div className="tech-grid">
        {TECHS.map((tech) => {
          const Icon = TECH_ICON_MAP[tech.name];
          return (
            <article
              key={tech.name}
              className="tech-card"
              style={{ "--card-accent": tech.accent } as React.CSSProperties}
            >
              <div className="tech-card-header">
                {Icon && (
                  <span className="tech-icon-wrap">
                    <Icon size={30} />
                  </span>
                )}
                <div className="tech-row-head">
                  <h3 className="tech-row-name">{tech.name}</h3>
                  <span className="tech-row-percent">{tech.level}%</span>
                </div>
              </div>

              <div className="tech-category-badge">◆ {tech.category[language]}</div>

              <div
                className="tech-progress"
                role="progressbar"
                aria-label={`${tech.name} — ${tech.level}%`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={tech.level}
              >
                <div
                  className="tech-progress-fill"
                  style={{
                    width: `${tech.level}%`,
                    background: `linear-gradient(90deg, ${tech.accent}99 0%, ${tech.accent} 60%, rgba(255,255,255,0.85) 100%)`,
                    boxShadow: `0 0 12px ${tech.accent}88, 0 0 24px ${tech.accent}44`,
                  }}
                >
                  <span className="tech-progress-scan" aria-hidden="true" />
                </div>
              </div>

              <p className="tech-note">{tech.note[language]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
