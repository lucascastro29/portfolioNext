import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { lazy, Suspense, useState } from "react";
import style from "../styles/styles.module.css";

import { useEffect } from 'react';
import Icon from '../containers/Icon';
import IndexComponent from '../containers/IndexComponent';


const OtherComponent = lazy(() => import("../containers/IndexComponent"));

export default function Home() {

const [height, useheight] = useState(0);

const [realwidth, userealwidth] =useState(0);


useEffect(() => {
  
    window.addEventListener("resize", updatewidth);
    window.addEventListener("resize", updateheight);

function updateheight() {
  useheight(window.innerHeight);
}

function updatewidth() { 
   if(window.innerWidth<955){     userealwidth(window.innerWidth);
}else{
userealwidth(window.innerWidth - 20);
   }
   
}
  updateheight();

    updatewidth();


}, [])

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
          <link rel="icon" href="../public/favicon.ico" />
        </Head>
        <div
          className="col-12"
          style={{
            zIndex: "1",
            width: `${realwidth}px`,
            fontFamily: "Source Code Pro,monospace",
            textAlign: "center",
            backgroundColor: "#242424",
          }}
        >
          <OtherComponent />
        </div>
      </Suspense>
    </div>
  );
}
