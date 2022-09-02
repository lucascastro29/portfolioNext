import { pajinamodel } from "../models/Pajinamodel";
import Card from "../node_modules/react-bootstrap/esm/Card";
import style from "../styles/styles.module.css";
import Images from "./Images";

const Pajina =(props:pajinamodel)=>{

    return (
      <Card
        className={props.cardstyle}
        data-aos="fade-up"
        data-aos-delay={props.delay}
      >
        <Images
          src={props.img}
          alt="card image"
          width={0}
          height={0}
          Styles={style.image}
        />

        <div className={props.dive}>
          <strong>{props.proces}</strong>
        </div>
        <Card.ImgOverlay className={style.imagefather}>
          <Card.Title className={style.objectspajes}>{props.title}</Card.Title>
          <Card.Text></Card.Text>
          <Card.Text>
            <a href={props.src}>
              <button  className={style.objectspajes}>
                {props.text}
              </button>
            </a>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    );
}
export default Pajina;