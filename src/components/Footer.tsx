"use client"
import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';
import Image from "next/image";
export const Footer=()=>{
    return(
        <>
    <footer className="footer">
                <div className="row">
                    <div className="first">
                        <div className="widget1">
                            
                            <div className="logos">
                               <h1>Meta-stasiss</h1>
                            </div>
                            <div className="para">
                            <p>
                            As a startup program under the supervision of AIIMS Guwahati, we have ambitious plans for the future. In addition to expanding our presence within India, we aim to establish partnerships and collaborations on a global scale.
                            <span>By seeking validation from experts in the field and continually refining our offerings, we aspire to set new standards for Medical education worldwide.</span> 
                            </p>
                            </div>
                            <div className="socialLinks">
                                <ul>
                                    {/* <li>
                                        <a href="#">
                                           <div className="face">

                                           <FontAwesomeIcon icon={faFacebook} className="icon" style={{ color:'blueviolet' , fontSize:"40px"}}/>
                                           </div>
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a href="#">
                                        <div className="face">
                                        <FontAwesomeIcon icon={faTwitter} className="icon" style={{ fontSize:"40px"}}/>
                                           </div>
                                        </a>
                                    </li> */}
                                    <li>
                                        <a href="https://www.instagram.com/meta_stasiss.aiims/">
                                        <div className="face">
                                        <FontAwesomeIcon icon={faInstagram} className="icon" style={{color:'pink', fontSize:"40px"}}/>
                                           </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/@Metastasiss.edtech">
                                        <div className="face">
                                        <FontAwesomeIcon icon={faYoutube} className="icon" style={{  color:'red', fontSize:"40px"}}/>
                                           </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="second">
                        <div className="widget2">
                            <h5>
                                Latest Events
                            </h5>
                            <div className="media">
                            <Image className="img-fluid"  src="/vrfooter.png" alt={""} width={150} height={150}></Image>
                                <div className="media-body d-flex align-self-center">
                                    <div className="content">
                                        <a href="#">
                                            <p>
                                            Step into the future of healthcare with immersive VR simulation
                                            </p>
                                        </a>
                                        <span>
                                           April, 2024
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="media">
                            <Image className="img-fluid"  src="/quize.jpeg" alt={""} width={150} height={150}></Image>
                               
                                <div className ="media-body d-flex align-self-center">
                                    <div className="content">
                                        <a href="#">
                                            <p>
                                            Join us in the ultimate quest for wisdom and glory.
                                            </p>
                                        </a>
                                        <span>
                                        April, 2024
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="third">
                        <div className="widget3">
                            <h5>
                                Quick Links
                            </h5>
                            <ul>
                                <li>
                                <Link href="/home"> Home </Link>
                                </li>
                                <li> 
                                <Link href="/about">  About </Link>
                                </li>
                                <li>
                                <Link href="/login">  Register </Link>
                                </li>
                                <li>
                                <Link href="/events"> Events </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="fourth">
                        <div className="widget2">
                            <h5>
                                Address
                            </h5>
                            <p>Silbharal, Changsari,
                              Guwahati,Assam 781101.</p>
                        </div>
                    </div>
                </div>
            <div className="copyRightArea">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p> Copyright &copy; 2024 AIIMS Guwahati . All rights reserved 2023.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  </>
    )
}