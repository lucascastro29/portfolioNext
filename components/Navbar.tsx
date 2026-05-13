"use client";

import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import { useContext } from "react";
import { EcommerceContext } from "./context/PortfolioContext";
import imgSpanish from "../images/espana.png";
import imgEnglish from "../images/english.png";

export default function Navbar() {
  const { language, toggleLanguage } = useContext(EcommerceContext);
  const languageImage = language === "en" ? imgSpanish : imgEnglish;

  const links =
    language === "en"
      ? [
          { name: "Profile", href: "/#about" },
          { name: "Techs", href: "/#skills" },
          { name: "Work", href: "/#projects" },
          { name: "Blog", href: "/blog" },
          { name: "Contact", href: "/#contact" },
        ]
      : [
          { name: "Perfil", href: "/#about" },
          { name: "Techs", href: "/#skills" },
          { name: "Proyectos", href: "/#projects" },
          { name: "Blog", href: "/blog" },
          { name: "Contacto", href: "/#contact" },
        ];

  return (
    <div className="fixed top-6 left-1/2 z-[9999] -translate-x-1/2">
      <nav className="neon-frame relative flex items-center gap-2 overflow-hidden rounded-full border border-cyan-200/55 bg-slate-950/75 px-3 py-2 shadow-[0_0_20px_rgba(34,211,238,0.18),0_10px_28px_rgba(2,6,23,0.65)] backdrop-blur-xl">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_80%_120%,rgba(59,130,246,0.2),transparent_42%)]"
        />

        <div className="relative z-10 flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.name} href={link.href} legacyBehavior>
              <a className="group relative overflow-hidden rounded-full px-4 py-2.5 text-sm font-semibold tracking-[0.08em] text-cyan-100/85 no-underline transition-colors duration-300 hover:text-white">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full border border-cyan-200/30 bg-cyan-300/15 backdrop-blur-md opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                />
                <span className="relative z-10">{link.name}</span>
              </a>
            </Link>
          ))}
        </div>

        <div className="relative z-10 ml-2 flex items-center gap-2">
          <a
            href="/resume.pdf"
            className="led-btn led-btn-stable flex items-center gap-2 rounded-full border border-cyan-200/45 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.06em] text-cyan-50 no-underline transition hover:bg-cyan-200/20"
          >
            <Download size={16} />
            {language === "en" ? "CV" : "CV"}
          </a>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            className="flag-chip relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-white/15 bg-transparent p-0 text-white transition hover:border-white/35"
          >
            <Image
              src={languageImage}
              alt="language flag"
              fill
              sizes="36px"
              className="flag-chip-image"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
