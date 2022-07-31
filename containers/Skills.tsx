import Skillsingular from "../components/Skillsingular";
import { skillsmodel } from "../models/skillsmodel";

const Skills=(props:skillsmodel)=>{


    return (
      <>
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
              paddingTop: "20px",
              color: "white",
              fontSize: "350%",
              textShadow: "5px 2px 5px black",
              overflow: "hidden",
            }}
            data-aos="fade-down"
          >
            {props.title}

            <div
              style={{
                paddingTop: "0px",
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
          className="col-12"
          style={{
            color: "white",
            fontSize: "40px",
            textShadow: "5px 2px 5px black",
            overflow: "hidden",
            paddingTop: "20px",
          }}
          data-aos="fade-right"
          data-aos-delay="300"
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
      </>
    );

}
export default Skills;