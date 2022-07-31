import { useEffect, useLayoutEffect, useState } from "react";
import Images from "../components/Images";
import img_icon_loading from "../images/gif_programming.gif";
import style from "../styles/styles.module.css"

const Icon =()=>{

    return (
      <>
          <Images
            src={img_icon_loading}
            width={180}
            height={180}
            alt={"icon"}
            Styles={style.imgIcon}
          />
      </>
    );
}
export default Icon;