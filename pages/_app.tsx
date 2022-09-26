import '../styles/globals.css'
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {EcommerceProvider} from '../components/context/PortfolioContext';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {

<Head>
  <title> Hola soy la page</title>
</Head>;
  
  return (
      <EcommerceProvider>
      <Component {...pageProps} />
      </EcommerceProvider>
  );
}

export default MyApp
