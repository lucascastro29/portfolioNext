import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Página no encontrada · Lucas Castro</title>
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
          Página no encontrada
        </h2>
        <p style={{ fontSize: "18px", maxWidth: "500px", marginTop: "20px" }}>
          La página que buscás no existe o fue movida. Volvé al inicio del portfolio.
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
          ← Volver al inicio
        </Link>
      </main>
    </>
  );
}
