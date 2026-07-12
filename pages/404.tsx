"use client";

import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { PortfolioContext } from "../components/context/PortfolioContext";
import translations from "../content/translations.json";

export default function Custom404() {
  const ctx = useContext(PortfolioContext);
  const language = (ctx?.language ?? "es") as "es" | "en";
  const t = translations[language];

  return (
    <>
      <Head>
        <title>{`404 — ${t.notFoundTitle} · Lucas Castro`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-color, #242424)",
          color: "white",
          fontFamily: "Source Code Pro, monospace",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "120px", margin: 0, color: "var(--accent-color, #2ecc71)" }}>
          404
        </h1>
        <h2 style={{ fontSize: "32px", marginTop: "10px" }}>
          {t.notFoundTitle}
        </h2>
        <p style={{ fontSize: "18px", maxWidth: "500px", marginTop: "20px" }}>
          {t.notFoundDesc}
        </p>
        <Link
          href="/"
          style={{
            marginTop: "30px",
            padding: "12px 28px",
            backgroundColor: "var(--accent-color, #2ecc71)",
            color: "white",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← {t.backHome}
        </Link>
      </main>
    </>
  );
}
