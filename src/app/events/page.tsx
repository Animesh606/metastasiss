
"use client"
import React from "react";
import { useState, useEffect } from "react";
import TrackVisibility from 'react-on-screen';
import Image from "next/image";
import "./page.css"
import {Footer} from "@/components/Footer"
export default function home() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Metastasiss"  ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <>
    <section className="banner" id="home">
      <div>
        <div className="aligh-items-center">
          <div className="firsti">
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>{} <span className="txt-rotate"  ><span className="wrap">{text}{isDeleting ? ' ' : null}</span></span></h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <button onClick={() => console.log('connect')}><span>Let's connect</span> </button>
              </div>}
            </TrackVisibility>
          </div>
          <div className="secondi" >
                   <Image className="Image" src="/vr.png" alt={""} width={150} height={150}></Image>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}