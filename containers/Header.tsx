"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { PortfolioContext } from "../components/context/PortfolioContext";
import translations from "../content/translations.json";
import heroPhoto from "../images/foto.jpg";

const TECH_CHIPS = ["Python", "OpenCV · YOLO", "TensorFlow", "Next.js", "Node-RED", "C++"];

// Terminal-style headline: types the title out character by character with a
// blinking block caret. Pure text (transparent) so it blends with the hero
// gradient, stays crisp, and re-types instantly when the language changes.
function TypedHeadline({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(text.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, 90);
    return () => window.clearInterval(id);
  }, [text]);

  const done = count >= text.length;

  return (
    <h1 className="hero-title max-w-2xl">
      <span className="sr-only">{text}</span>
      <span className="hero-term-prompt" aria-hidden="true">$</span>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span
        className={`hero-term-caret${done ? " hero-term-caret--blink" : ""}`}
        aria-hidden="true"
      />
    </h1>
  );
}

function useCountUp(target: number, duration = 1100) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * ease));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const Header = () => {
  const ctx = useContext(PortfolioContext);
  const language = ctx?.language ?? "es";
  const t = translations[language];

  const yearsCounter = useCountUp(3);
  const projectsCounter = useCountUp(10, 900);

  const stats =
    language === "es"
      ? [
          { value: yearsCounter.count, suffix: "+", label: "Años de exp.", ref: yearsCounter.ref },
          { value: projectsCounter.count, suffix: "+", label: "Proyectos", ref: projectsCounter.ref },
          { value: null, suffix: "ML/CV", label: "Especialidad", ref: null },
        ]
      : [
          { value: yearsCounter.count, suffix: "+", label: "Years exp.", ref: yearsCounter.ref },
          { value: projectsCounter.count, suffix: "+", label: "Projects", ref: projectsCounter.ref },
          { value: null, suffix: "ML/CV", label: "Specialty", ref: null },
        ];

  return (
    <section
      id="hero"
      className="parallax-large relative mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32"
      data-parallax-depth="0.2"
    >
      <div className="led-sign hero-panel relative overflow-hidden rounded-[2rem] border border-cyan-200/40 bg-slate-950/30 p-7 shadow-[0_24px_80px_rgba(2,6,23,0.62)] backdrop-blur-xl sm:p-12">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.08),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(59,130,246,0.1),transparent_46%)]" />

        {/* Badge */}
        <div className="relative z-10 mb-7">
          <div className="hero-chip">
            <span className="hero-chip-dot" />
            {t.headerBadge}
          </div>
        </div>

        {/* Split: copy + photo */}
        <div className="hero-split relative z-10">

          {/* Left: text */}
          <div>
            <TypedHeadline key={language} text={t.headerTitle} />
            <p className="hero-subtitle mt-5">
              {t.headerSubtitle}
            </p>

            {/* Tech chips */}
            <div className="hero-tech-strip">
              {TECH_CHIPS.map((tech) => (
                <span key={tech} className="hero-tech-chip">{tech}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#about"
                className="led-btn led-btn-stable rounded-full border border-cyan-300/40 bg-cyan-400/15 px-6 py-2.5 text-sm font-bold tracking-[0.05em] text-cyan-50 no-underline transition hover:bg-cyan-300/25"
              >
                {t.headerExplore}
              </a>
              <NextLink
                href="/blog"
                className="led-btn led-btn-stable rounded-full border border-white/16 bg-white/6 px-6 py-2.5 text-sm font-bold tracking-[0.05em] text-slate-100 no-underline transition hover:bg-white/12"
                style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.16)" }}
              >
                {t.headerJournal}
              </NextLink>
              <a
                href="https://github.com/lucascastro29"
                target="_blank"
                rel="noreferrer"
                className="led-btn led-btn-stable rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-slate-300 no-underline hover:border-cyan-300/40 hover:text-cyan-100"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-castro-7b4003219/"
                target="_blank"
                rel="noreferrer"
                className="led-btn led-btn-stable rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-slate-300 no-underline hover:border-cyan-300/40 hover:text-cyan-100"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: photo + face detection overlay */}
          <div className="hero-photo-col">
            <div className="face-detect-wrap">
              <Image
                src={heroPhoto}
                alt="Lucas Castro"
                layout="fill"
                objectFit="cover"
                objectPosition="center top"
                className="face-detect-img"
                priority
                sizes="(max-width: 700px) 160px, 260px"
              />
              <div className="face-detect-overlay" aria-hidden="true">
                <div className="fd-corner fd-corner--tl" />
                <div className="fd-corner fd-corner--tr" />
                <div className="fd-corner fd-corner--bl" />
                <div className="fd-corner fd-corner--br" />
                <div className="fd-scan" />
                <div className="fd-label">
                  {language === "es" ? "Persona" : "Person"}: Lucas Castro · 99.8%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-stats relative z-10">
          {stats.map((s) => (
            <div key={s.label}>
              <span className="hero-stat-value" ref={s.ref ?? undefined}>
                {s.value !== null ? `${s.value}${s.suffix}` : s.suffix}
              </span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll relative z-10">
          <span className="hero-scroll-line" />
          <a href="#about" className="hero-scroll-text">
            {t.headerScroll}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
