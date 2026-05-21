import { SkillsModel } from "../models/SkillsModel";

type TechItem = {
  name: string;
  level: number;
  note: string;
  tone: string;
};

const TECHS: TechItem[] = [
  { name: "Python", level: 92, note: "Automation, integrations, data tooling", tone: "var(--led-cyan)" },
  { name: "OpenCV + YOLO", level: 88, note: "Detection, tracking and QA in real environments", tone: "var(--led-blue)" },
  { name: "TensorFlow / Keras", level: 83, note: "CNN training and optimization", tone: "var(--led-amber)" },
  { name: "Next.js + TypeScript", level: 84, note: "Frontend architecture and performance", tone: "var(--led-cyan)" },
  { name: "Node.js", level: 76, note: "APIs, middleware and workflow automation", tone: "var(--led-violet)" },
  { name: "SQL (MySQL/PostgreSQL)", level: 72, note: "Relational data design and queries", tone: "var(--led-blue)" },
];

const Skills = (props: SkillsModel) => {
  return (
    <section id="skills" className="led-sign section-panel parallax-large">
      <h2 className="subtitle">{props.title}</h2>
      <p className="section-kicker">Core technologies for AI, automation and scalable product delivery.</p>

      <div className="tech-grid">
        {TECHS.map((tech) => (
          <article key={tech.name} className="tech-card">
            <div className="tech-row-head">
              <h3 className="tech-row-name">{tech.name}</h3>
              <span className="tech-row-percent">{tech.level}%</span>
            </div>

            <div className="tech-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={tech.level}>
              <div className="tech-progress-fill" style={{ width: `${tech.level}%`, background: `linear-gradient(90deg, ${tech.tone} 0%, rgba(255,255,255,0.92) 100%)` }}>
                <span className="tech-progress-scan" aria-hidden="true" />
              </div>
            </div>

            <p>{tech.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Skills;
