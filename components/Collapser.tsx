import img_miFace from "../images/foto.jpg";
import Image from "next/image";
import Skills from "../containers/Skills";
import { CollapserModel } from "../models/CollapserModel";

const Collapser = (props: CollapserModel) => {
  return (
    <section id="about" aria-label="About me section" className="section-stack">
      <article className="led-sign section-panel about-grid parallax-large">
        <div className="about-photo-wrap">
          <Image
            src={img_miFace}
            alt="Foto de perfil de Lucas Castro"
            width={520}
            height={520}
            className="about-photo"
            priority
          />
        </div>

        <div className="about-copy">
          <h2 className="subtitle">About me</h2>
          <h3 className="about-name">Lucas Castro</h3>
          <p>{props.Textaboutme}</p>
        </div>
      </article>

      <div className="split-grid">
        <article className="led-sign section-panel parallax-large">
          <h2 className="subtitle">{props.Titlework}</h2>
          <p>{props.Textwork}</p>
        </article>

        <article className="led-sign section-panel parallax-large">
          <h2 className="subtitle">{props.Titlestudios}</h2>
          <ul className="study-list">
            <li>{props.estudios1}</li>
            <li>{props.estudios2}</li>
            <li>{props.estudios3}</li>
            <li>{props.estudios4}</li>
          </ul>
        </article>
      </div>

      <Skills title={props.skilltitle} />
    </section>
  );
};

export default Collapser;
