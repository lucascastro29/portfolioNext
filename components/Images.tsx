import Image from "next/image";
import { ImagesModel } from "../models/ImagesModel";

const Images = (props: ImagesModel) => {
  return (
    <Image
      src={props.src}
      height={props.height}
      width={props.width}
      alt={props.alt}
      className={props.Styles}
    />
  );
};

export default Images;
