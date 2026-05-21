import NextLink from "next/link";
import { HeaderModel } from "../models/HeaderModel";

const Header = (props: HeaderModel) => {
  return (
    <section
      id="hero"
      className="parallax-large relative mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32"
      data-parallax-depth="0.2"
    >
      <div className="led-sign relative overflow-hidden rounded-[28px] border border-cyan-200/45 bg-slate-950/30 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.12),transparent_36%),radial-gradient(circle_at_80%_120%,rgba(59,130,246,0.18),transparent_44%)]" />
        <div className="mb-6 flex items-center justify-end gap-3">
          <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            Open for freelance
          </div>
        </div>

        <h1 className="relative z-10 max-w-3xl text-balance text-4xl font-black leading-tight tracking-tight text-slate-100 sm:text-6xl">
          {props.textpresentation}
        </h1>
        <p className="relative z-10 mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          I craft performant, conversion-focused web experiences with a clean interface and strong frontend execution.
        </p>

        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#about"
            className="led-btn led-btn-stable rounded-full border border-cyan-300/40 bg-cyan-400/20 px-5 py-2.5 text-sm font-semibold tracking-[0.06em] text-cyan-100 no-underline transition hover:bg-cyan-300/30"
          >
            Explore Work
          </a>
          <NextLink
            href="/blog"
            className="led-btn led-btn-stable rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-[0.06em] text-slate-100 no-underline transition hover:bg-white/20"
          >
            Read Journal
          </NextLink>
          <a
            href="https://github.com/lucascastro29"
            target="_blank"
            rel="noreferrer"
            className="led-btn led-btn-stable rounded-full border border-white/15 px-4 py-2 text-sm font-medium tracking-[0.04em] text-slate-300 no-underline transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            GitHub Profile
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-castro-7b4003219/"
            target="_blank"
            rel="noreferrer"
            className="led-btn led-btn-stable rounded-full border border-white/15 px-4 py-2 text-sm font-medium tracking-[0.04em] text-slate-300 no-underline transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            LinkedIn Profile
          </a>
        </div>

        <div className="relative z-10 mt-10 flex items-center gap-3 text-slate-400">
          <span className="h-px w-16 bg-white/20" />
          <a href="#about" className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 no-underline hover:text-cyan-200">
            Scroll to navigate
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
