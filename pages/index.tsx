import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { lazy, Suspense, useState,useContext } from "react";
import style from "../styles/styles.module.css";

import { useEffect } from 'react';
import Icon from '../containers/Icon';
import IndexComponent from '../containers/IndexComponent';
import { EcommerceContext } from '../components/context/PortfolioContext';


export default function Home() {

  
const { height, width, updateheight, updatewidth } =
  useContext(EcommerceContext);
  
useEffect(() => {
  updateheight();
  updatewidth();

  window.addEventListener("resize", updateheight);
  window.addEventListener("resize", updatewidth);
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
          <IndexComponent width={width} />
        </div>
      </Suspense>
    </>
  );
}
