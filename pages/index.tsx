import Head from "next/head";
import { lazy, Suspense, useContext, useEffect } from "react";
import Icon from "../containers/Icon";
import { PortfolioContext } from "../components/context/PortfolioContext";

const IndexComponent = lazy(() => import("../containers/IndexComponent"));

const SITE_URL = "https://portfolio-next-three-mu.vercel.app";
const SITE_TITLE = "Lucas Castro — IT Analyst & Software Developer";
const SITE_DESCRIPTION =
  "Portfolio de Lucas Castro: Analista IT especializado en Machine Learning, Computer Vision y desarrollo web con Next.js, Python y TensorFlow.";
const OG_IMAGE = `${SITE_URL}/images/foto.jpg`;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Castro",
  jobTitle: "IT Analyst & Software Developer",
  url: SITE_URL,
  email: "lucascastro2929@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/lucas-castro-7b4003219/",
    "https://github.com/lucascastro29",
  ],
  knowsAbout: [
    "Python",
    "Machine Learning",
    "Computer Vision",
    "OpenCV",
    "YOLO",
    "TensorFlow",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
};

export default function Home() {
  const ctx = useContext(PortfolioContext);
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
      className="flex items-center justify-center w-full"
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
          content="Lucas Castro, IT Analyst, Software Developer, Machine Learning, Computer Vision, OpenCV, YOLO, TensorFlow, Next.js, Python, portfolio, Uruguay"
        />
        <meta name="author" content="Lucas Castro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050a12" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="1000" />
        <meta property="og:locale" content="es_UY" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </Head>

      <Suspense fallback={renderLoader()}>
        <div className="w-full" style={{ lineHeight: "1.625" }}>
          <IndexComponent width={0} />
        </div>
      </Suspense>
    </>
  );
}
