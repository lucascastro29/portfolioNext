import Head from "next/head";
import { lazy, Suspense, useContext, useEffect } from "react";
import Icon from "../containers/Icon";
import { EcommerceContext } from "../components/context/PortfolioContext";

const IndexComponent = lazy(() => import("../containers/IndexComponent"));

const SITE_URL = "https://portfolio-next-three-mu.vercel.app";
const SITE_TITLE = "Lucas Castro — Web Developer Portfolio";
const SITE_DESCRIPTION =
  "Portfolio de Lucas Castro: desarrollador web Front End con foco en Next.js, React, TypeScript. Proyectos, experiencia y contacto.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function Home() {
  const ctx = useContext(EcommerceContext);
  const height = ctx?.height;
  const updateheight = ctx?.updateheight;

  useEffect(() => {
    if (!updateheight) return;
    updateheight();
    window.addEventListener("resize", updateheight);
    return () => window.removeEventListener("resize", updateheight);
  }, [updateheight]);

  const renderLoader = () => (
    <div
      className="col-12 d-flex justify-content-center align-items-center"
      style={{ height: `${height}px` }}
    >
      <Icon />
    </div>
  );

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          name="keywords"
          content="Lucas Castro, web developer, Next.js, React, TypeScript, portfolio, Uruguay, frontend developer"
        />
        <meta name="author" content="Lucas Castro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#242424" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="es_UY" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={renderLoader()}>
        <div className="App col-12" style={{ lineHeight: "1.625" }}>
          <IndexComponent width={0} />
        </div>
      </Suspense>
    </>
  );
}
