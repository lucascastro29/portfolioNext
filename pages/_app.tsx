import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { EcommerceProvider } from "../components/context/PortfolioContext";
import MouseFog from "../components/MouseFog";
import Navbar from "../components/Navbar";
import ParallaxController from "../components/ParallaxController";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EcommerceProvider>
      <MouseFog />
      <ParallaxController />
      <Navbar />
      <Component {...pageProps} />
      <Analytics />
    </EcommerceProvider>
  );
}

export default MyApp;
