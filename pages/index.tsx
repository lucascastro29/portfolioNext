import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { lazy, Suspense, useState } from "react";
import style from "../styles/styles.module.css";

import { useEffect } from 'react';
import Icon from '../containers/icon';
import IndexComponent from '../containers/IndexComponent';

const OtherComponent = lazy(() => import("../containers/IndexComponent"));

export default function Home() {

const [height, useheight] = useState(0);
const [width, usewidth] = useState(0);


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
      <Suspense
        fallback={
          <div
            className="col-12 d-flex justify-content-center align-items-center"
            style={{ height: `${height}px` }}
          >
            <Icon />
          </div>
        }
      >
        <Head>
          <title>Portfolio</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={style.App}>
          <IndexComponent width={width} />
        </div>
      </Suspense>
    </div>
  );
}
