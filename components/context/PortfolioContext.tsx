import React, { createContext, useState, ReactNode } from "react";

export type Lang = "es" | "en";

interface PortfolioContextValue {
  updateheight: () => void;
  height: number | undefined;
  useheight: React.Dispatch<React.SetStateAction<number | undefined>>;
  language: Lang;
  toggleLanguage: () => void;
  setLanguage: React.Dispatch<React.SetStateAction<Lang>>;
}

export const PortfolioContext = createContext<PortfolioContextValue>(
  {} as PortfolioContextValue
);

/** @deprecated Use PortfolioContext */
export const EcommerceContext = PortfolioContext;

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [height, useheight] = useState<number | undefined>(undefined);
  const [language, setLanguage] = useState<Lang>("es");

  function updateheight() {
    useheight(window.innerHeight);
  }

  function toggleLanguage() {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  }

  return (
    <PortfolioContext.Provider
      value={{
        updateheight,
        height,
        useheight,
        language,
        toggleLanguage,
        setLanguage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

/** @deprecated Use PortfolioProvider */
export const EcommerceProvider = PortfolioProvider;
