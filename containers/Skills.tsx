import Skillsingular from "../components/Skillsingular";
import { SkillsModel } from "../models/SkillsModel";
import { useContext } from "react";
import { EcommerceContext } from "../components/context/PortfolioContext";

const Skills = (props: SkillsModel) => {
  const ctx = useContext(EcommerceContext);
  const skills = ctx?.skills ?? [];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: "0px",
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
            className="rounded"
            style={{
              paddingTop: "0px",
              border: "2px solid var(--accent-color)",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              width: "400px",
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
        }}
        data-aos="fade-right"
        data-aos-delay="300"
      >
        {skills.map((element: any, index: number) => (
          <div key={index} style={{ margin: "15px" }}>
            <Skillsingular
              now={element.now}
              variant={element.variant}
              text={element.Text}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Skills;
