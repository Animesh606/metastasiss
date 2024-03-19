"use client"
import React from "react";
import { useState, useEffect } from "react";
import TrackVisibility from 'react-on-screen';
import Image from "next/image";
import "./page.css"
import { Footer } from "@/components/Footer"
import Loader from "@/components/Loader";
import  { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  const {status}=useSession();
  const router=useRouter();
  const toRotate = ["Metastasiss"];
  const period = 2000;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div  className="mains" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/bg-min.jpg')`
      }}>
          <section className="banner" id="home" >
            <div>
              <div className="aligh-items-center">
                <div  className="firsti">
                        <h1 data-aos="zoom-in"><span className="txt-rotate"  ><span  className="wrap">Meta-Stasiss</span></span></h1>
                        <p><strong> Revolutionize the way Medical Science is taught and learned. We are dedicated to leveraging innovative technologies and gamification strategies to simplify complex physiological concepts, making them more accessible and engaging to learners of all backgrounds.</strong></p>
                        <button onClick={() =>router.push(status==="authenticated"?"/even":"/login")}><span>Let&apos;s connect</span> </button>
                </div>
                <div  className="secondi" >
                  <Image className="Image" src="/vr2.png" alt={""} width={150} height={150}></Image>
                </div>
              </div>
            </div>
          </section>
          <div className="Aboutus">
            <div className="headdd">
              <h1>Gameysio-2024</h1>
            </div>
            <div className="about">
              <p>Welcome to Gameysio-2024, the ultimate gamification of physiology event at AIIMS Guwahati! Get ready for a unique blend of knowledge and entertainment as we transform the study of human
                 physiology into an exhilarating and competitive experience. Join us for interactive quizzes, simulated scenarios, and a dynamic atmosphere that promises not just learning but an unforgettable journey into the intricate world of physiology.
                 Embrace the thrill, challenge your peers, and discover the joy of unraveling the mysteries of the human body at Gameysio-2024! See you there for an experience like never before.</p>
            </div>
          </div>
          <div className="rewards">
            <span className="circle">
            </span>
            {/* <h1 className="font-bold"> Rewards</h1> */}
            <span className="devider"></span>
          </div>
          {/* <div  className="prizes">
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
          </div> */}
          <Footer />
        </div>
      )}
    </>
  )
}