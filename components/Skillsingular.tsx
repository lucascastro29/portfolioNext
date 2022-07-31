import ProgressBar from "react-bootstrap/ProgressBar";
import { skillssingularmodel } from "../models/skillssingularmodel";
import Animatedbar from "./Animatedbar";

const Skillsingular = ( props:skillssingularmodel) => {


  return (
    <div className="col-12 " style={{ margin: "10px" }}>
      <div className="col-12 d-flex justify-content-center align-items-center">
        <div
          className="col-8 d-flex align-items-center"
          style={{ height: "50px",}}
        >
          <div className="col-12">
            <Animatedbar variant={props.variant} now={props.now}  />
          </div>
        </div>
        <div
          className="col-2 d-flex align-items-center"
          style={{
            height: "50px",
            fontSize: "20px",
          }}
        >
          <div>
            <strong style={{marginLeft:"15px"}}>{props.text}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skillsingular;
