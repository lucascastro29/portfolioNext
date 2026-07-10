import "aos/dist/aos.css";
import AOS from "aos";
import Header from "../containers/Header";
import Collapser from "../components/Collapser";
import PajinasContainer from "../containers/PajinasContainer";
import Forms from "../components/Forms";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { IndexModel } from "../models/IndexModel";
import translations from "../content/translations.json";
import { PortfolioContext } from "../components/context/PortfolioContext";

const IndexComponent = (props: IndexModel) => {
  const ctx = useContext(PortfolioContext);
  const language = ctx?.language ?? "es";

  const t = translations[language];

  useEffect(() => {
    AOS.init({ duration: 1100, once: true, offset: 30, easing: "ease-out-cubic" });
  }, []);

  return (
    <main id="main-content" className="site-shell">
      <Header />
      <div>
        <Collapser
          aboutLabel={t.aboutLabel}
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
      <PajinasContainer
        TitleProjects={t.projectsTitle}
        FlyersProjects={t.flyersTitle}
        Titlewebsite={t.websitesTitle}
        pajinatitle={t.visitWebsite}
        pajinatext={t.visitWebsite}
        proces={t.inProcess}
      />
      <Forms />
      <Footer />
    </main>
  );
};

export default IndexComponent;
