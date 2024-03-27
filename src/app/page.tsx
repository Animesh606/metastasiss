"use client";
import React, {  useEffect, useRef, useState } from "react";
import TrackVisibility from 'react-on-screen';
import Image from "next/image";
import "./page.css"
import { Footer } from "@/components/Footer"
import Loader from "@/components/Loader";
import  { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
declare namespace JSX {
  interface IntrinsicElements {
      marquee:   React.MutableRefObject<any>;
  }
}
export default function Home() {
 const marqueeRef = useRef<any>(null);

    const handleMouseEnter = () => {
        if (marqueeRef.current) {
            (marqueeRef.current ).stop();
        }
    };

    const handleMouseLeave = () => {
        if (marqueeRef.current) {
            (marqueeRef.current).start();
        }
    };
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
            <h1>Notice</h1>
            {/* <h1 className="font-bold"> Rewards</h1> */}
            <span className="devider"></span>
          </div>
           <div className="not" >

           <div className="notice-board"   onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            
            <marquee
              ref={marqueeRef}
              //@ts-ignore
           
           direction="up" scrollamount="2" behavior="scroll">
                <div className= 'notice blink' >
                <a href="Brochure.pdf" download>
                <span> Notice 1: </span>Check out our event brochure for all the exciting details and program schedule
                   </a>
                </div>
                <div className= 'notice blink'>
                  <p> Notice 2: **** Registration for teams has started ****</p>
                </div>
                <div className= 'notice blink'>
                <a href="brochure.pdf" download>
                  <span> Notice 3:</span> Gameysio event banner has released for 2024 !
                  </a>
                </div>
                <div className= 'notice blink'>
                 <a href="https://drive.google.com/drive/folders/1g1Jc0Nh8vgTmfIqXo6KjLYnpcFxSY1l7">
                    Notice 4: Sample videos of games
                    </a>
                </div>
                {/* Add more notices as needed */}
            </marquee>
          </div>
           </div>
         
          <Footer />
        </div>
      )}
    </>
  )
}
