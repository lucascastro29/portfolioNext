import { FormsModel } from "../models/FormsModel";

const Forms = (props: FormsModel) => {
  return (
    <section id="contact" aria-label="Contact section" className="section-stack">
      <article className="led-sign section-panel contact-panel parallax-large">
        <h2 className="subtitle">{props.title1}</h2>
        <p className="contact-copy">
          Contactame por LinkedIn o a través de mis redes sociales para colaboraciones en IA, automatización y desarrollo.
        </p>
        <p className="contact-copy-en">
          Contact me on LinkedIn or through my social networks for AI, automation and software projects.
        </p>

        <nav className="contact-actions" aria-label="Social links">
          <a href="https://www.linkedin.com/in/lucas-castro-7b4003219/" target="_blank" rel="noopener noreferrer" className="led-btn led-btn-stable">
            LinkedIn
          </a>
          <a href="https://github.com/lucascastro29" target="_blank" rel="noopener noreferrer" className="led-btn led-btn-stable">
            GitHub
          </a>
          <a href="mailto:lucascastro2929@gmail.com" className="led-btn led-btn-stable">
            Email
          </a>
        </nav>
      </article>
    </section>
  );
};

export default Forms;
