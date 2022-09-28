import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { lazy, Suspense, useState,useContext } from "react";
import style from "../styles/styles.module.css";

import { useEffect } from 'react';
import Icon from '../containers/Icon';
import IndexComponent from '../containers/IndexComponent';
import { EcommerceContext } from '../components/context/PortfolioContext';


export default function Home() {

  
const { height,  updateheight  } =
  useContext(EcommerceContext);
  
useEffect(() => {
  updateheight();

  window.addEventListener("resize", updateheight);
}, []);

const OtherComponent = lazy(() => import("../containers/IndexComponent"));
const renderLoader = () => 
    <div
      className="col-12 d-flex justify-content-center align-items-center"
      style={{ height: `${height}px` }}
    >
      <Icon />
    </div>;




  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Suspense  fallback={renderLoader()}>
        <div className="App col-12"  >
          <IndexComponent width={0} />
        </div>
      </Suspense>
    </>
  );
}
