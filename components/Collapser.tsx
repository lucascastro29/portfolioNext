import img_miFace from "../images/foto.jpg"
import Images from "./Images";
import style from "../styles/styles.module.css"
import Skills from "../containers/Skills";
import { Collapsermodel } from "../models/Collapsermodel";
import { useEffect, useState } from "react";

const Collapser =(props:Collapsermodel)=>{
const [hook, usehook] = useState("d-flex");
useEffect(()=>{
  function as(){
    if (window.innerWidth <= 768) {
      usehook("");
    } else {
      usehook("d-flex");
    }
  }



    window.addEventListener("resize", as);

},[])
return (
  <>
    <div className="col-md-12 col-12"></div>
    <div
      className="col-12 col-sm-12 "
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div className="col-md-1 "></div>
      <div className={`col-12 ${hook}`}>
        <div className="col-md-1"></div>
        <div className="col-md-4  col-12  imgfather" data-aos={props.aos0}>
          <div className={style.boxMe2}>
            <div className={style.span}>
              <Images
                src={img_miFace}
                Styles={""}
                alt="Foto de perfil"
                height={0}
                width={0}
              />
            </div>
          </div>
        </div>
        <div className="col-md-1  col-12"></div>
        <div
          className="col-md-5 col-12  "
          style={{
            padding: "0px",
          }}
        >
          <div
            className="col-md-12 col-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              padding: "0px",
            }}
          >
            <h1
              style={{
                padding: "0px",
                color: "white",
                fontSize: "400%",
                textShadow: "5px 2px 5px black",
                overflow: "hidden",
              }}
              data-aos={props.aos1}
            >
              Lucas Castro
              <div
                style={{
                  padding: "0px",
                  border: "4px solid black",
                  borderTop: "0px",
                  borderLeft: "0px",
                  borderRight: "0px",
                  width: "500px",
                  margin: "0px",
                }}
              ></div>
            </h1>
          </div>

          <div
            className="col-12 col-md-12 d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              color: "white",
              fontSize: "40px",
              textShadow: "5px 2px 5px black",
              overflow: "hidden",
              padding: "0px",
            }}
          >
            <div
              className="col-8 col-md-12"
              data-aos={props.aos2}
              data-aos-delay={props.aos2time}
            >
              {props.Textaboutme}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="col-12"
      style={{ display: "flex", marginTop: "40px", padding: "0px" }}
    ></div>
    <div className={`col-12 ${hook}`}>
      <div
        className="col-md-6 col-12 justify-content-center align-items-center"
        style={{ padding: "0px" }}
      >
        <div className="col-md-12">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              padding: "0px ",
            }}
          >
            <h1
              style={{
                padding: "0px",
                color: "white",
                fontSize: "350%",
                textShadow: "5px 2px 5px black",
                overflow: "hidden",
              }}
              data-aos={props.aos3}
            >
              {props.Titlework}
              <div
                style={{
                  padding: "0px",
                  border: "4px solid black",
                  borderTop: "0px",
                  borderLeft: "0px",
                  borderRight: "0px",
                  width: "600px",
                }}
              ></div>
            </h1>
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              fontSize: "40px",
              textShadow: "5px 2px 5px black",
              overflow: "hidden",
              padding: "0px",
            }}
            data-aos={props.aos4}
            data-aos-delay={props.aos4time}
          >
            <div className="col-8">{props.Textwork}</div>
          </div>
        </div>
        <Skills title={props.skilltitle}  aos={props.aos0}/>
      </div>
      <div className="col-md-5 col-12">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "350%",

              textShadow: "5px 2px 5px black",
              overflow: "hidden",
            }}
            data-aos={props.aos6}
          >
            {props.Titlestudios}
            <div
              style={{
                border: "4px solid black",
                borderTop: "0px",
                borderLeft: "0px",
                borderRight: "0px",
                width: "300px",
              }}
            ></div>
          </h1>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            color: "white",
            fontSize: "30px",
            marginLeft: "10px",
            textShadow: "5px 2px 5px black",
          }}
        >
          <div
            className="col-md-8 col-12 "
            data-aos={props.aos7}
            data-aos-delay={props.aos7time}
          >
            <ul>
              <li style={{ margin: "20px" }}>{props.estudios1}</li>
              <li style={{ margin: "20px" }}>{props.estudios2}</li>
              <li style={{ margin: "20px" }}>{props.estudios3}</li>
              <li style={{ margin: "20px" }}>{props.estudios4}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
export default Collapser;