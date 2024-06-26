import Pajina from "../components/Pajina";
import style from "../styles/styles.module.css";
import img_pajina1 from "../images/ecommerce.png"
import img_pajina4 from "../images/huerta.png";
import img_pajina3 from "../images/caza.png";
import img_pajina5 from "../images/webs_uy.png";

import img_flyer1 from "../images/flyer1.jpg";
import img_flyer2 from "../images/flyer2.jpg";
import img_flyer3 from "../images/flyer3.jpg";
import { Pajinasmodel } from "../models/Pajinasmodel";



const PajinasContainer =(props:Pajinasmodel)=>{

    return (
      <>
        <div className="col-12 col-md-12 ">
          <div className={style.projects}>
            <div className="d-flex col-12">
              <div className={style.filterxd}>
                <div
                  className="col-12 d-flex justify-content-center align-items-center"
                  style={{ marginTop: "30px" }}
                >
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <strong
                      className="tittlestyle "
                      style={{ marginBottom: "10px",fontSize:"250%" }}
                    >
                      {props.TitleProjects}
                    </strong>
                  </div>
                </div>

                <div
                  className="col-12 d-flex justify-content-center align-items-center "
                  style={{ zIndex: "4" }}
                >
                  <div className="col-12  ">
                    <div>
                      <div className={style.Tittle}>
                        <h2
                          className={style.tittlestylewebsites}
                          style={{ marginBottom: "10px" }}
                        >
                          <strong>{props.Titlewebsite}</strong>
                        </h2>
                      </div>
                    </div>
                    <div className="  d-flex justify-content-center align-items-center">
                      <Pajina
                       heigh={1000}
                       widt={0}
                        img={img_pajina1}
                        src={"https://e-commerce-next-theta.vercel.app/"}
                        dive={style.inprocess}
                        text={props.pajinatext}
                        title={"E-Commerce"}
                        delay={0}
                        cardstyle={style.card}
                        proces={props.proces}
                      />
                      {/*<Pajina
                        img={img_pajina2}
                        src={"https://lucascastroecommerce.herokuapp.com/"}
                        dive={style.inprocesss}
                        delay={200}
                        text={props.pajinatext}
                        title={props.pajinatitle}
                        cardstyle={style.card}
                        proces={props.proces}
    />
                      <Pajina
                       heigh={1000}
                       widt={0}
                        img={img_pajina3}
                        src={"https://cazasubmarina.com.uy/"}
                        delay={500}
                        dive={style.inprocesss}
                        text={props.pajinatext}
                        title={props.pajinatitle}
                        cardstyle={style.card}
                        proces={props.proces}
                      />*/}
                      <Pajina
                       heigh={1000}
                       widt={0}
                        img={img_pajina4}
                        src={"https://huerta-249.web.app/inicio"}
                        dive={style.inprocess}
                        text={props.pajinatext}
                        title={"Huerta Comunitaria 249"}
                        delay={0}
                        cardstyle={style.card}
                        proces={props.proces}
                      />
                      <Pajina
                       heigh={1000}
                       widt={0}
                        img={img_pajina5}
                        src={"https://webs-uy.vercel.app/"}
                        dive={style.inprocess}
                        text={props.pajinatext}
                        title={"Webs Uy"}
                        delay={0}
                        cardstyle={style.card}
                        proces={props.proces}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 d-flex justify-content-center align-items-center "
                  style={{ zIndex: "4" }}
                >
                  <div className="col-12  ">
                    <div>
                      <div className={style.Tittle2}>
                        <h2
                          className={style.tittlestyleflyers}
                          style={{ marginBottom: "10px" }}
                        >
                          <strong>{props.FlyersProjects}</strong>
                        </h2>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-center align-items-center"
                        >
                      <Pajina
                        img={img_flyer1}
                        heigh={0}
                        widt={0}
                        src={""}
                        dive={style.inprocessnot}
                        text={"Visit Website"}
                        title={"Ecommerce"}
                        delay={0}
                        cardstyle={style.cardflyer1}
                        proces={props.proces}
                      />

                      <Pajina
                       heigh={2000}
                       widt={0}
                        img={img_flyer2}
                        src={""}
                        dive={style.inprocessnot}
                        delay={200}
                        text={"Visit Website"}
                        title={"Direct Marketing Agency"}
                        cardstyle={style.cardflyer}
                        proces={props.proces}
                      />

                      <Pajina
                       heigh={2500}
                       widt={0}
                        img={img_flyer3}
                        src={""}
                        delay={500}
                        dive={style.inprocessnot}
                        text={"Visit Website"}
                        title={"Cazasubmarina"}
                        cardstyle={style.cardflyer}
                        proces={props.proces}
                      />
                      
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 d-flex"
                  style={{
                    justifyContent: "center",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <div
                    className={style.borderbottomx}
                    style={{ marginBottom: "60px", marginTop: "20px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default PajinasContainer