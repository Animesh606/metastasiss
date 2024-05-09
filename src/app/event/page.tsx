"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./page.css";
import Aos from "aos";
import { useRouter } from "next/navigation";

export default function Event() {
  const [isCardOpenfirst, setisCardOpenfirst] = useState<boolean>(false);
  const [isCardOpensecond, setisCardOpensecond] = useState<boolean>(false);
  const [isCardOpenthird, setisCardOpenthird] = useState<boolean>(false);
  const [isCardOpenfourth, setisCardOpenfourth] = useState<boolean>(false);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const router = useRouter();

  // Function to handle card hover for laptop/desktop
  const handleCardHover = (name: string, isHovering: boolean) => {
    if (!isMobile()) {
      switch (name) {
        case "game_showcasing":
          setisCardOpenfirst(isHovering);
          break;
        case "Gaming_competition":
          setisCardOpensecond(isHovering);
          break;
        case "Meme_competition":
          setisCardOpenthird(isHovering);
          break;
        case "Quiz_Competition":
          setisCardOpenfourth(isHovering);
          break;
        default:
          break;
      }
    }
  };

  // Function to handle card click for mobile
  const handleCardClick = (name: string) => {
    if (isMobile()) {
      switch (name) {
        case "game_showcasing":
          setisCardOpenfirst(!isCardOpenfirst);
          break;
        case "Gaming_competition":
          setisCardOpensecond(!isCardOpensecond);
          break;
        case "Meme_competition":
          setisCardOpenthird(!isCardOpenthird);
          break;
        case "Quiz_Competition":
          setisCardOpenfourth(!isCardOpenfourth);
          break;
        default:
          break;
      }
    }
  };

  const register = (name: string) => {

    router.push(`/${name}/register`);
  };
  const submit = (name: string) => {
    console.log("submit")
    router.push(`/${name}/submit`);
  };
  // Function to check if the device is mobile
  const isMobile = () => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    return /Mobi|Android/i.test(userAgent);
  };

  return (
    <>
      <div className="event">
        <div className="eventCards">
          <div
            onMouseEnter={() => handleCardHover("game_showcasing", true)}
            onMouseLeave={() => handleCardHover("game_showcasing", false)}
            onClick={() => handleCardClick("game_showcasing")}
            data-aos="zoom-in-right"
            className="card"
          >
            <Image
              className="cardImage"
              src="/game showcasing-min.png"
              alt=""
              width={150}
              height={150}
            />
            <div className={`cardOverlay ${isCardOpenfirst ? "open" : ""}`}>
              {/* <button
                onClick={() => register("game_showcasing")}
                className="registerButton button-19"
              >
                Register
              </button> */}
              <button   onClick={() => submit("game_showcasing")} className="submitButton button-19">Submit</button>
            </div>
          </div>
          <div
            onMouseEnter={() => handleCardHover('Gaming_competition', true)}
            onMouseLeave={() => handleCardHover('Gaming_competition', false)}
            onClick={() => handleCardClick("Gaming_competition")}
            data-aos="zoom-in-left"
            className="card"
          >
            <Image
              className="cardImage"
              src="/Gaming competition-min.png"
              alt=""
              width={150}
              height={150}
            />
            <div className={`cardOverlay ${isCardOpensecond ? "open" : ""}`}>
              {/* <button
                onClick={() => register('Gaming_competition')}
                className="registerButton button-19"
              >
                Register
              </button> */}
              <button  onClick={() => submit('Gaming_competition')} className="submitButton button-19">Submit</button>
            </div>
          </div>
          <div
            onMouseEnter={() => handleCardHover('Meme_competition', true)}
            onMouseLeave={() => handleCardHover('Meme_competition', false)}
            onClick={() => handleCardClick("Meme_competition")}
            data-aos="zoom-in-right"
            className="card"
          >
            <Image
              className="cardImage"
              src="/Meme competition-min.png"
              alt=""
              width={150}
              height={150}
            />
            <div className={`cardOverlay ${isCardOpenthird ? "open" : ""}`}>
              {/* <button
                onClick={() => register('Meme_competition')}
                className="registerButton button-19"
              >
                Register
              </button> */}
              <button onClick={() => submit('Meme_competition')} className="submitButton button-19">Submit</button>
            </div>
          </div>
          <div
            onMouseEnter={() => handleCardHover('Quiz_Competition', true)}
            onMouseLeave={() => handleCardHover('Quiz_Competition', false)}
            onClick={() => handleCardClick("Quiz_Competition")}
            data-aos="zoom-in-left"
            className="card"
          >
            <Image
              className="cardImage"
              src="/Quiz Competition-min.png"
              alt=""
              width={150}
              height={150}
            />
            <div className={`cardOverlay ${isCardOpenfourth ? "open" : ""}`}>
              {/* <button
                onClick={() => register('Quiz_Competition')}
                className="registerButton button-19"
              >
                Register
              </button> */}
              <button  onClick={() => submit('Quiz_Competition')} className="submitButton button-19" disabled>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
