import "aos/dist/aos.css";
import AOS from "aos";
import style from "../styles/styles.module.css";
import Header from "../containers/Header";
import Collapser from "../components/Collapser";
import PajinasContainer from "../containers/PajinasContainer";
import Forms from "../components/Forms";
import img_spanish from "../images/españa.png";
import img_english from "../images/english.png";


import Icon from "./Icon";
import { useEffect, useState } from "react";
import { indexmodel } from "../models/indexmodel";
import { Container } from "react-bootstrap";

const IndexComponent = (props:indexmodel) => {


  const [allTheText, setAllTheText] = useState([
  ]);
  const [buttonflag, setbuttonflag] = useState(0);
    const [imageflag, setiamgeflag] = useState(img_spanish);



  
  

  function renderText(){
if(buttonflag==0){
    setAllTheText([
      "Hi I'm Lucas, I design and build web pages",
      "i'm a young web Developer, with skills of Front End Developer, in focus of functionality and good style. With the hability of work by my self or be part of a team. Expecting to give all my effort in a task or project",
      "Work Experience",
      `I worked in "Cyber Green" Since 2020 until 2022 working us a computer technical service and client service.
      Nowadays i worked as a self-checkout cashier in "Geant Parque roosevelt" (january 2023- present)`,
      "Studies",
      "Skills",
      `Realizing a course of "Full stack development" in the university of "Buenos Aires"`,
      `First year of Computer engenier in the "Facultad de Ingeniería de laRepublica"`,
      `"Jóvenes a Programar" since March 2021 until December 2022`,
      "Studing for the first Cambridge exam for the begining of 2023",
      "PROJECTS",
      "Web Sites",
      "Flyers",
      "In Process",
      "Visit Website",
      "Contact Me",
      "Email",
      "Message",
      "submit",
      "",
      "Let's get social",
      "Follow me online on",
    ]);
  setbuttonflag(1);
  setiamgeflag(img_spanish);

  }else{setAllTheText([
    "Hola Me llamo Lucas y diseño  paginas Web",
    ` Soy un desarrollador web de 21 años,con habilidades como desarrollador Front End centrado en la funcionalidad y un buen estilo. Con la capacidad de trabajar por mi
          cuenta o ser parte de un equipo, pudiendome relacionarme perfectamente
          con mis compañeros y buscando dedicarme en mi totalidad a los proyectos`,
    "Experiencia Laboral",
    ` Trabaje en "Cyber Green" desde 2020 hasta 2022 trabajando como tecnico
          informatico y servicio a equipos informaticos.
        Actualmente me encuentro trabajando como encargado de cajas automaticas en Geant Parque Roosevelt  ( enero 2023-Presente)`,
    "Estudios",
    "Habilidades",
    `Curso de "desarrollador Full Stack" en la "Universidad de Buenos Aires"`,
    ` Cursando segundo año de Tecnologo en Cyberseguridad en el "Instituto de alta especialización" de Montevideo`,
    `  "Jóvenes a Programar" desde Marzo 2021 hasta Diciembre 2022`,
    " B2 First Cambridge Certificate ",
    "PROJECTOS",
    "Sitios Web",
    "Flyers",
    "En Proceso",
    "Visitar Sitio Web",
    "Contactarme",
    "Email",
    "Mensaje",
    "Enviar",
    "",
    "Mis Redes",
    "Seguime en",
  ]);
    setbuttonflag(0)
  setiamgeflag(img_english);

    };
  }
  useEffect(() => {
renderText();

    AOS.init();
  }, []);
  return (
    <>
      <div className="col-12">
        <Header
          textpresentation={allTheText[0]}
          onClick={renderText}
          image={imageflag}
        />
      </div>
      <div
        className="row"
        style={{
          margin: "0px",
          height: "80px",

          backgroundColor: "#242424",
        }}
      ></div>
      <div
        className="row"
        style={{
          margin: "0px",

          backgroundColor: "#242424",
        }}
      >
        <Collapser
          data-aos="fade-up"
          Textaboutme={allTheText[1]}
          Titlework={allTheText[2]}
          Textwork={allTheText[3]}
          Titlestudios={allTheText[4]}
          estudios1={allTheText[6]}
          estudios2={allTheText[7]}
          estudios3={allTheText[8]}
          estudios4={allTheText[9]}
          skilltitle={allTheText[5]}
        />
      </div>
      <div
        className="row"
        style={{
          margin: "0px",
          height: "80px",

          backgroundColor: "#242424",
        }}
      ></div>
      <PajinasContainer
        TitleProjects={allTheText[10]}
        FlyersProjects={allTheText[12]}
        Titlewebsite={allTheText[11]}
        pajinatitle={allTheText[14]}
        pajinatext={allTheText[14]}
        proces={allTheText[13]}
      />


      <Forms
        title1={allTheText[15]}
        form1={allTheText[16]}
        form2={allTheText[17]}
        button={allTheText[18]}
        title2={allTheText[19]}
        title3={allTheText[20]}
        text2={allTheText[21]}
      />
    </>
  );
};

export default IndexComponent;
