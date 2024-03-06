

"use client"
import React from "react";
import { useState, useEffect } from "react";
import TrackVisibility from 'react-on-screen';
import Image from "next/image";
import "./page.css"
import { Footer } from "@/components/Footer"
import Loader from "@/components/Loader";
export default function Home() {
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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div  className="mains" style={{backgroundImage: `url('/background.jpg')`}}>
          <section className="banner" id="home" >
            <div>
              <div className="aligh-items-center">
                <div  className="firsti">
                  
                     
                        <h1 data-aos="zoom-in"><span className="txt-rotate"  ><span  className="wrap">Meta-stasiss</span></span></h1>
                        <p>Revolutionize the way Medical Science is taught and learned. We are dedicated to leveraging innovative technologies and gamification strategies to simplify complex physiological concepts, making them more accessible and engaging to learners of all backgrounds.</p>
                        <button onClick={() => console.log('connect')}><span>Let&apos;s connect</span> </button>
                
                </div>

                <div  className="secondi" >
                  <Image className="Image" src="/vr2.png" alt={""} width={150} height={150}></Image>
                </div>
              </div>
            </div>
          </section>
          <div className="Aboutus">
            <div className="head">
              <h1>About Us</h1>
            </div>
            <div className="about">
              <p>Our purpose is to make Medical education more effective, efficient, and enjoyable. Through the use of cutting-edge tools and methodologies, we aim to bridge the gap between theory and practice, empowering students to grasp intricate physiological processes with ease and confidence.
              We believe in pushing the boundaries of educational technology to enhance the learning experience. One of our flagship initiatives involves the integration of virtual reality (VR) technology into physiology concepts. By immersing students in lifelike simulations and interactive experiences, we transform abstract concepts into tangible, memorable lessons.
              What sets METASTASISS apart is our commitment to innovation and our relentless pursuit of excellence in education. While traditional approaches to physiology education often rely on static images or passive learning methods, we embrace technology-driven solutions that bring concepts to life in ways never before possible.
              While our primary audience consists of students and professionals in the medical and healthcare fields, our educational resources are designed to benefit anyone with an interest in physiology. Whether you&apos;re a high school student, a medical student, or a lifelong learner, METASTASISS is here to support your educational journey.
              </p>
            </div>
          </div>
          <div className="rewards">
            <span className="circle">
            </span>
            <h1 className="font-bold"> Rewards</h1>
            <span className="devider"></span>
          </div>
          <div  className="prizes">
          <div data-aos="flip-right">
            <div className="prize">
            <Image className="Image" src="/snacks.png" alt={""} width={150} height={150}></Image>
            </div>
            <h4>Refreshment at event</h4>
            </div>
            <div data-aos="zoom-in">
            <div className="prize">
            <Image className="Image" src="/prizes.png" alt={""} width={150} height={150}></Image>
            </div>
            <h4>Amazing prizes for winners</h4>
            </div>
           
            <div data-aos="flip-left">
            <div className="prize">
            <Image className="Image" src="/certificate.png" alt={""} width={150} height={150}></Image>
            </div>
            <h4>Verified certificates</h4>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}