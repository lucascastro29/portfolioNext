import Skillsingular from "../components/Skillsingular";
import { skillsmodel } from "../models/skillsmodel";
import React, { createContext, useState,useContext } from "react";
import { EcommerceContext } from "../components/context/PortfolioContext";

const Skills=(props:skillsmodel)=>{


const { skills } = useContext(EcommerceContext);
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
                border: "2px solid #75b75d",
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
          {skills.map((element, index) => (
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

}
export default Skills;