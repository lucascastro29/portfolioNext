import React, { createContext, useState, ReactNode } from "react";

export type Lang = "es" | "en";

interface Skill {
  now: number;
  variant: string;
  Text: string;
}

interface PortfolioContextValue {
  hook: string;
  skills: Skill[];
  updateheight: () => void;
  updatewidth: () => void;
  height: number | undefined;
  width: number;
  useheight: React.Dispatch<React.SetStateAction<number | undefined>>;
  usewidth: React.Dispatch<React.SetStateAction<number>>;
  language: Lang;
  toggleLanguage: () => void;
  setLanguage: React.Dispatch<React.SetStateAction<Lang>>;
}

export const EcommerceContext = createContext<PortfolioContextValue>(
  {} as PortfolioContextValue
);

export const EcommerceProvider = ({ children }: { children: ReactNode }) => {
  const [hook, sethook] = useState<string>("");
  const [height, useheight] = useState<number | undefined>(undefined);
  const [width, usewidth] = useState<number>(1);
  const [language, setLanguage] = useState<Lang>("es");

  function updateheight() {
    useheight(window.innerHeight);
  }

  function updatewidth() {
    usewidth(window.innerWidth);
  }

  function toggleLanguage() {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  }

  const [skills, setskills] = useState<Skill[]>([
    { now: 90, variant: "info", Text: "JavaScript" },
    { now: 80, variant: "danger", Text: "React.Js" },
    { now: 70, variant: "", Text: "Next.Js" },
    { now: 80, variant: "info", Text: "TypeScript" },
    { now: 40, variant: "warning", Text: "Node" },
    { now: 20, variant: "", Text: "Express" },
    { now: 10, variant: "danger", Text: "Python" },
  ]);

  return (
    <EcommerceContext.Provider
      value={{
        hook,
        skills,
        updateheight,
        updatewidth,
        height,
        width,
        useheight,
        usewidth,
        language,
        toggleLanguage,
        setLanguage,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
