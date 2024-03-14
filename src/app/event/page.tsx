"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import "./page.css"
import Aos from "aos";
import  { useRouter } from "next/navigation";
export default function event(){
    useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
    
      const router = useRouter();
    
      // Function to handle card click
      const handleCardClick = (name: string) => {
        // Navigate to /{name}/register
        router.push(`/${name}/register`);
      };
return(
    <>
    <div className="event">
    <div className="eventCards">
        <div onClick={() => handleCardClick('game_showcasing')} data-aos="zoom-in-right" className="card">  <Image className="cardImage" src="/game showcasing.png" alt={""} width={150} height={150}></Image>
        </div>
        <div   onClick={() => handleCardClick('Gaming_competition')} data-aos="zoom-in-left" className="card">  <Image className="cardImage" src="/Gaming competition.png" alt={""} width={150} height={150}></Image>
        </div>
        <div  onClick={() => handleCardClick('Meme_competition')} data-aos="zoom-in-right" className="card">  <Image className="cardImage" src="/Meme competition.png" alt={""} width={150} height={150}></Image>
        </div>
        <div  onClick={() => handleCardClick('Quiz_Competition')} data-aos="zoom-in-left" className="card">  <Image className="cardImage" src="/Quiz Competition.png" alt={""} width={150} height={150}></Image>
        </div>
    </div>
    </div>
    </>
)
}