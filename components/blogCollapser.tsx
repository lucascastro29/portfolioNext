import img_miFace from "../images/foto.jpg";
import Images from "./Images";
import Skills from "../containers/Skills";
import { CollapserModel as Collapsermodel } from "../models/CollapserModel";

const BlogCollapser = (props: Collapsermodel) => {
  return (
    <section className="w-full">
      {/* TOP: Foto + About */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Foto */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <div className="w-full max-w-[420px] rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
            <div className="overflow-hidden rounded-2xl">
              <Images
                src={img_miFace}
                Styles={""}
                alt="Foto de perfil"
                height={0}
                width={0}
              />
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="lg:col-span-7">
          <h1
            className="text-justify lg:text-justify text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow"
            data-aos="fade-down"
          >
            Lucas Castro
            <div className="subtitle-accent-line" />
          </h1>

          <p
            className="mt-6 text-justify lg:text-justify text-lg sm:text-xl leading-relaxed text-white/80"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {props.Textaboutme}
          </p>
        </div>
      </div>

      {/* Divider spacing */}
      <div className="h-10 md:h-14 lg:h-16" />

      {/* BOTTOM: Work + Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Work + Skills */}
        <div className="lg:col-span-7">
          <h2
            className="text-justify lg:text-justify text-3xl sm:text-4xl font-bold text-white drop-shadow"
            data-aos="fade-down"
          >
            {props.Titlework}
            <div className="subtitle-accent-line" />
          </h2>

          <p
            className="mt-6 text-justify lg:text-justify text-lg sm:text-xl leading-relaxed text-white/80"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            {props.Textwork}
          </p>

          <div className="mt-8">
            <Skills title={props.skilltitle} />
          </div>
        </div>

        {/* Studies */}
        <div className="lg:col-span-5">
          <h2
            className="text-justify lg:text-justify text-3xl sm:text-4xl font-bold text-white drop-shadow"
            data-aos="fade-down"
          >
            {props.Titlestudios}
            <div className="subtitle-accent-line" />
          </h2>

          <ul
            className="mt-6 space-y-4 text-base sm:text-lg text-white/80"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
              {props.estudios1}
            </li>
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
              {props.estudios2}
            </li>
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
              {props.estudios3}
            </li>
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
              {props.estudios4}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BlogCollapser;
