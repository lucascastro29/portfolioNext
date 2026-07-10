import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PortfolioProvider } from "../components/context/PortfolioContext";
import MouseFog from "../components/MouseFog";
import Navbar from "../components/Navbar";
import ParallaxController from "../components/ParallaxController";
import ScrollProgress from "../components/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PortfolioProvider>
      <ScrollProgress />
      <MouseFog />
      <ParallaxController />
      <Navbar />
      <Component {...pageProps} />
      <Analytics />
    </PortfolioProvider>
  );
}

export default MyApp;
