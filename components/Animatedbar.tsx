import ProgressBar from "react-bootstrap/ProgressBar";
import { animatedmodel } from "../models/animatedmodel";

const Animatedbar = (props:animatedmodel) => {
      

  return (
    <strong style={{fontSize:"30px"}}>
      <ProgressBar
        animated
        now={props.now}
        variant={props.variant}
        label={`${props.now}%`}
      />
      
    </strong>
  );
};
export default Animatedbar