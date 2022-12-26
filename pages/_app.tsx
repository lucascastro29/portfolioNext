import '../styles/globals.css'
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {EcommerceProvider} from '../components/context/PortfolioContext';
import Head from 'next/head';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from "../firebase-config"
function MyApp({ Component, pageProps }) {

  
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <EcommerceProvider>
        <Component {...pageProps} />
      </EcommerceProvider>
    </FirebaseAppProvider>
  );
}

export default MyApp
