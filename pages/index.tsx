import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { lazy, Suspense, useState } from "react";
import style from "../styles/styles.module.css";

import { useEffect } from 'react';
import Icon from '../containers/Icon';
import IndexComponent from '../containers/IndexComponent';


export default function Home() {

  
const [height, useheight] = useState(0);
const [width, usewidth] = useState(0);

const OtherComponent = lazy(() => import("../containers/IndexComponent"));
const renderLoader = () => 
    <div
      className="col-12 d-flex justify-content-center align-items-center"
      style={{ height: `${height}px` }}
    >
      <Icon />
    </div>;

function updateheight(){

    useheight(window.innerHeight);
    console.log(height);
}


function updatewidth() {
  usewidth(window.innerWidth);
  console.log(width);
}

useEffect(() => {
  updateheight();
    updatewidth();

  window.addEventListener("resize",updateheight)
    window.addEventListener("resize", updatewidth);

}, []);


  return (
    <div className="col-12" style={{ height: "100%" }}>
      <Head>
        <title style={{ height: "0px" }}>Portfolio</title>
      </Head>
      <Suspense fallback={renderLoader()}>
        <div className={style.App}>
          <IndexComponent width={width} />
        </div>
      </Suspense>
    </div>
  );
}
