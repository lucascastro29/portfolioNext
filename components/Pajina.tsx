import { PajinaModel } from "../models/PajinaModel";
import Card from "react-bootstrap/Card";
import style from "../styles/styles.module.css";
import Images from "./Images";

const PajinaCard = ({ props }: { props: PajinaModel }) => (
  <Card
    className={props.cardstyle}
    data-aos="fade-up"
    data-aos-delay={props.delay}
  >
    <Images
      src={props.img}
      alt={props.title || "card image"}
      width={props.widt}
      height={props.heigh}
      Styles={style.image}
    />
    <div className={props.dive}>
      <strong>{props.proces}</strong>
    </div>
    <Card.ImgOverlay className={style.imagefather}>
      <Card.Title className={style.objectspajes}>{props.title}</Card.Title>
      <Card.Text></Card.Text>
      <Card.Text>
        <button className={style.objectspajes} aria-label={props.text}>
          {props.text}
        </button>
      </Card.Text>
    </Card.ImgOverlay>
  </Card>
);

const Pajina = (props: PajinaModel) => {
  if (props.src !== "") {
    return (
      <a
        href={props.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${props.title}`}
      >
        <PajinaCard props={props} />
      </a>
    );
  }
  return <PajinaCard props={props} />;
};

export default Pajina;
