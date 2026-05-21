import Image from "next/image";
import { PajinasModel } from "../models/PajinasModel";
import img_pajina1 from "../images/ecommerce.png";
import img_pajina4 from "../images/huerta.png";
import img_pajina5 from "../images/webs_uy.png";
import img_flyer1 from "../images/flyer1.jpg";
import img_flyer2 from "../images/flyer2.jpg";
import img_flyer3 from "../images/flyer3.jpg";

type ProjectCard = {
  title: string;
  image: any;
  href?: string;
  status?: string;
};

const PajinasContainer = (props: PajinasModel) => {
  const websites: ProjectCard[] = [
    { title: "E-Commerce", image: img_pajina1, href: "https://e-commerce-next-theta.vercel.app/" },
    { title: "Huerta Comunitaria 249", image: img_pajina4, href: "https://huerta-249.web.app/inicio" },
    { title: "Webs Uy", image: img_pajina5, href: "https://webs-uy.vercel.app/" },
  ];

  const flyers: ProjectCard[] = [
    { title: "Ecommerce", image: img_flyer1, status: props.proces },
    { title: "Direct Marketing Agency", image: img_flyer2, status: props.proces },
    { title: "Cazasubmarina", image: img_flyer3, status: props.proces },
  ];

  return (
    <section id="projects" aria-label="Projects section" className="section-stack">
      <article className="led-sign section-panel parallax-large">
        <h2 className="subtitle">{props.TitleProjects}</h2>

        <h3 className="subsection-title">{props.Titlewebsite}</h3>
        <div className="project-grid">
          {websites.map((project) => (
            <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-media">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="project-footer">
                <strong>{project.title}</strong>
                <span>{props.pajinatext}</span>
              </div>
            </a>
          ))}
        </div>

        <h3 className="subsection-title">{props.FlyersProjects}</h3>
        <div className="project-grid project-grid--flyers">
          {flyers.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-media">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="project-footer">
                <strong>{project.title}</strong>
                <span>{project.status}</span>
              </div>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
};

export default PajinasContainer;
