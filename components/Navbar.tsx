"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "./context/PortfolioContext";

export default function Navbar() {
  const { language, toggleLanguage } = useContext(PortfolioContext);
  const { pathname } = useRouter();
  const [activeSection, setActiveSection] = useState<string>("");

  const links =
    language === "en"
      ? [
          { name: "Profile",  href: "/#about",    section: "about" },
          { name: "Skills",   href: "/#skills",   section: "skills" },
          { name: "Blog",     href: "/#blog",     section: "blog" },
          { name: "Projects", href: "/#projects", section: "projects" },
          { name: "Contact",  href: "/#contact",  section: "contact" },
        ]
      : [
          { name: "Perfil",    href: "/#about",    section: "about" },
          { name: "Skills",    href: "/#skills",   section: "skills" },
          { name: "Blog",      href: "/#blog",     section: "blog" },
          { name: "Proyectos", href: "/#projects", section: "projects" },
          { name: "Contacto",  href: "/#contact",  section: "contact" },
        ];

  useEffect(() => {
    if (pathname !== "/" && !pathname.startsWith("/blog")) return;
    const sectionIds = ["hero", "about", "skills", "blog", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  const isActive = (link: { href: string; section: string }) => {
    return activeSection === link.section;
  };

  return (
    <div className="fixed top-5 left-1/2 z-[9999] -translate-x-1/2 px-3 w-full max-w-4xl">
      <nav
        className="neon-frame relative flex items-center justify-between gap-2 overflow-hidden rounded-full border border-cyan-200/45 bg-slate-950/80 px-3 py-2 shadow-[0_0_24px_rgba(34,211,238,0.16),0_12px_32px_rgba(2,6,23,0.7)] backdrop-blur-xl"
        aria-label="Main navigation"
      >
        {/* Ambient glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_50%,rgba(34,211,238,0.13),transparent_42%),radial-gradient(circle_at_88%_50%,rgba(59,130,246,0.14),transparent_42%)]"
        />

        {/* Nav links */}
        <div className="relative z-10 flex items-center gap-0.5">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <Link key={link.name} href={link.href} legacyBehavior>
                <a
                  className={`group relative overflow-hidden rounded-full px-3 py-2 text-xs font-semibold tracking-[0.07em] no-underline transition-colors duration-250 sm:px-4 sm:text-sm ${
                    active ? "nav-link--active text-white" : "text-cyan-100/80 hover:text-white"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`nav-link-bg pointer-events-none absolute inset-0 rounded-full border border-cyan-200/28 bg-cyan-300/12 transition-all duration-250 ${
                      active ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  />
                  <span className="relative z-10">{link.name}</span>
                </a>
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="relative z-10 flex items-center gap-2">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
            className="lang-switch"
          >
            <span className={`lang-opt ${language === "es" ? "lang-opt--active" : ""}`}>ES</span>
            <span className="lang-divider">|</span>
            <span className={`lang-opt ${language === "en" ? "lang-opt--active" : ""}`}>EN</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
