

"use client"
import React from "react";
import { useState, useEffect } from "react";
import TrackVisibility from 'react-on-screen';
import Image from "next/image";
import "./page.css"
import { Footer } from "@/components/Footer"
import Loader from "@/components/Loader";
export default function home() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Metastasiss"];
  const period = 2000;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <section className="banner" id="home" style={{backgroundImage: `url('/background.jpg')`}}>
            <div>
              <div className="aligh-items-center">
                <div className="firsti">
                  
                     
                        <h1><span className="txt-rotate"  ><span className="wrap">Metastatiss</span></span></h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <button onClick={() => console.log('connect')}><span>Let's connect</span> </button>
                
                </div>
                <div className="secondi" >
                  <Image className="Image" src="/vr.png" alt={""} width={150} height={150}></Image>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  )
}