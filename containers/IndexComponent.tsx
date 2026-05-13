import "aos/dist/aos.css";
import AOS from "aos";
import Header from "../containers/Header";
import Collapser from "../components/Collapser";
import PajinasContainer from "../containers/PajinasContainer";
import Forms from "../components/Forms";
import img_spanish from "../images/españa.png";
import img_english from "../images/english.png";
import { useEffect, useState } from "react";
import { IndexModel } from "../models/IndexModel";
import translations from "../content/translations.json";

type Lang = "es" | "en";

const IndexComponent = (props: IndexModel) => {
  const [lang, setLang] = useState<Lang>("es");

  const t = translations[lang];
  const flagImage = lang === "es" ? img_english : img_spanish;

  const toggleLang = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main>
      <div className="col-12">
        <Header
          textpresentation={t.headerTitle}
          onClick={toggleLang}
          image={flagImage}
        />
      </div>
      <div
        className="row"
        style={{ margin: "0px", height: "80px", backgroundColor: "var(--bg-color)" }}
      ></div>
      <div className="row" style={{ margin: "0px", backgroundColor: "var(--bg-color)" }}>
        <Collapser
          Textaboutme={t.aboutMe}
          Titlework={t.workTitle}
          Textwork={t.workText}
          Titlestudios={t.studiesTitle}
          estudios1={t.study1}
          estudios2={t.study2}
          estudios3={t.study3}
          estudios4={t.study4}
          skilltitle={t.skillsTitle}
        />
      </div>
      <div
        className="row"
        style={{ margin: "0px", height: "80px", backgroundColor: "var(--bg-color)" }}
      ></div>
      <PajinasContainer
        TitleProjects={t.projectsTitle}
        FlyersProjects={t.flyersTitle}
        Titlewebsite={t.websitesTitle}
        pajinatitle={t.visitWebsite}
        pajinatext={t.visitWebsite}
        proces={t.inProcess}
      />
      <Forms
        title1={t.contactTitle}
        form1={t.formEmail}
        form2={t.formMessage}
        button={t.formSubmit}
        title2={""}
        title3={t.socialTitle}
        text2={t.contactSubtitle}
        sentMessage={t.formSent}
      />
    </main>
  );
};

export default IndexComponent;
