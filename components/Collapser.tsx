import img_miFace from "../images/foto.jpg";
import Images from "./Images";
import style from "../styles/styles.module.css";
import Skills from "../containers/Skills";
import { CollapserModel } from "../models/CollapserModel";

const Collapser = (props: CollapserModel) => {
  return (
    <section id="about" aria-label="About me section" className="row">
      <div className="col-md-1 col-12"></div>
      <div className="col-md-4 col-12 imgfather">
        <div className={style.boxMe2}>
          <div className={style.span}>
            <Images
              src={img_miFace}
              Styles={""}
              alt="Foto de perfil de Lucas Castro"
              height={0}
              width={0}
            />
          </div>
        </div>
      </div>
      <div className="col-md-1 col-12"></div>

      <div className={`col-md-5 col-12 ${style.collapserCol}`}>
        <div className={style.titleWrap}>
          <h1 className={style.nameTitle} data-aos="fade-down">
            Lucas Castro
            <div className={`rounded ${style.greenUnderlineWide}`}></div>
          </h1>
        </div>

        <div className={style.aboutMeWrap}>
          <div
            className="col-8 col-sm-12"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {props.Textaboutme}
          </div>
        </div>
      </div>

      <div className={style.spacer40}></div>

      <div className="col-md-6 col-12" style={{ padding: "0px" }}>
        <div className={style.titleWrap}>
          <h2 className={style.sectionTitle} data-aos="fade-down">
            {props.Titlework}
            <div className={`rounded ${style.greenUnderlineWide}`}></div>
          </h2>
        </div>

        <div
          className={`d-flex justify-content-center align-items-center ${style.sectionText}`}
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <div className="col-8">{props.Textwork}</div>
        </div>

        <Skills title={props.skilltitle} />
      </div>

      <div className="col-md-5 col-12">
        <div className={style.titleWrap}>
          <h2
            className={`${style.sectionTitle} ${style.studiesTitle}`}
            data-aos="fade-down"
          >
            {props.Titlestudios}
            <div className={`rounded ${style.greenUnderline}`}></div>
          </h2>
        </div>
        <div
          className={`col-12 d-flex justify-content-center align-items-center ${style.studiesList}`}
        >
          <ul
            className="col-12 overflow-auto"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <li className={style.studiesItem}>{props.estudios1}</li>
            <li className={style.studiesItem}>{props.estudios2}</li>
            <li className={style.studiesItem}>{props.estudios3}</li>
            <li className={style.studiesItem}>{props.estudios4}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Collapser;
