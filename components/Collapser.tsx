import img_miFace from "../images/foto.jpg"
import Images from "./Images";
import style from "../styles/styles.module.css"
import Skills from "../containers/Skills";
import { Collapsermodel } from "../models/Collapsermodel";

const Collapser =(props:Collapsermodel)=>{


return (
  <>
    <div className="col-md-1 col-12"></div>
    <div
      className="col-md-4  col-12  imgfather"
      /*data-aos={this.state.aosFR}*/
    >
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
    <div className="col-md-1 col-12"></div>

    <div
      className="col-md-5  col-12  "
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
          data-aos="fade-down"
        >
          Lucas Castro
          <div className="rounded"
            style={{
              padding: "0px",
              border: "2px solid green",
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
        className="col-12 col-sm-12 d-flex justify-content-center align-items-center"
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
          className="col-8 col-sm-12 "
          data-aos="fade-left"
          data-aos-delay="300"
        >
          {props.Textaboutme}
        </div>
      </div>
    </div>
    <div
      className="col-12"
      style={{ display: "flex", marginTop: "40px", padding: "0px" }}
    ></div>
    <div className="col-md-6 col-12" style={{ padding: "0px" }}>
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
          data-aos="fade-down"
        >
          {props.Titlework}
          <div className="rounded"
            style={{
              padding: "0px",
              border: "2px solid green",
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
        data-aos="fade-right"
        data-aos-delay="300"
      >
        <div className="col-8">{props.Textwork}</div>
      </div>

      <Skills title={props.skilltitle} />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          color: "white",
          fontSize: "40px",
          textShadow: "5px 2px 5px black",
          overflow: "hidden",
          padding: "0px",
        }}
        data-aos="fade-right"
        data-aos-delay="300"
      ></div>
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
            width:"400px"
          }}
          data-aos="fade-down"
        >
          {props.Titlestudios}
          <div className="rounded"
            style={{
              border: "2px solid green",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
            }}
          ></div>
        </h1>
      </div>
      <div
        className="col-12 d-flex justify-content-center align-items-center"
        style={{
          color: "white",
          fontSize: "30px",
          marginLeft: "10px",
          textShadow: "5px 2px 5px black",
        }}
      >
        <ul
          className="col-12  overflow-auto"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <li style={{ margin: "20px" }}>{props.estudios1}</li>
          <li style={{ margin: "20px" }}>{props.estudios2}</li>
          <li style={{ margin: "20px" }}>{props.estudios3}</li>
          <li style={{ margin: "20px" }}>{props.estudios4}</li>

        </ul>
      </div>
    </div>
  </>
);
}
export default Collapser;