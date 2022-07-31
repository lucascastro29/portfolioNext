import Skillsingular from "../components/Skillsingular";
import { skillsmodel } from "../models/skillsmodel";

const Skills=(props:skillsmodel)=>{


    return (
      <div className="col-sm-12 col-sm-12 ">
        <div
          data-aos="fade-right"
          data-aos-delay={0}
          className=" justify-content-center align-items-center"
        >
          <div
            className="col-12 col-sm-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              padding: "0px ",
            }}
          >
            <h1
              style={{
                paddingTop: "20px",
                color: "white",
                fontSize: "350%",
                textShadow: "5px 2px 5px black",
                overflow: "hidden",
              }}
            >
              {props.title}

              <div
                style={{
                  paddingTop: "0px",
                  border: "4px solid black",
                  borderTop: "0px",
                  borderLeft: "0px",
                  borderRight: "0px",
                  width: "120%",
                }}
              ></div>
            </h1>
          </div>

          <div
            className="col-12 col-sm-12"
            style={{
              justifyContent: "center",
              color: "white",
              fontSize: "40px",
              textShadow: "5px 2px 5px black",
              overflow: "hidden",
              paddingTop: "20px",
            }}
          >
            <div style={{ margin: "15px" }}>
              <Skillsingular now={90} variant={"info"} text={"JavaScript"} />
            </div>

            <div style={{ margin: "15px" }}>
              <Skillsingular now={80} variant={"danger"} text={"React"} />
            </div>
            <div style={{ margin: "15px" }}>
              <Skillsingular now={60} variant={""} text={"Next.Js"} />
            </div>

            <div style={{ margin: "15px" }}>
              <Skillsingular now={20} variant={"warning"} text={"Node"} />
            </div>

            <div style={{ margin: "15px" }}>
              <Skillsingular now={75} variant={""} text={"Bootstrap"} />
            </div>
          </div>
        </div>
      </div>
    );

}
export default Skills;