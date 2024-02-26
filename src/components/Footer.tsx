"use client"
import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';
export const Footer=()=>{
    return(
        <>
    <footer className="footer">
                <div className="row">
                    <div className="first">
                        <div className="widget1">
                            
                            <div className="logo">
                                <img src="https://i.ibb.co/vLDyPtM/ak-logo-yellow.png" className="img-fluid" alt=""/>
                            </div>
                            <div className="para">
                            <p>
                                In eu libero ligula. Fusce eget metus lorem, ac viverra
                                leo. Nullam convallis, arcu vel pellentesque sodales,
                                nisi est varius diam, ac ultrices sem ante quis sem.
                                Proin ultricies volutpat sapien.
                            </p>
                            </div>
                            <div className="socialLinks">
                                <ul>
                                    <li>
                                        <a href="#">
                                           <div className="face">

                                           <FontAwesomeIcon icon={faFacebook} className="icon" style={{ color:'blueviolet' , fontSize:"40px"}}/>
                                           </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                        <div className="face">
                                        <FontAwesomeIcon icon={faTwitter} className="icon" style={{ fontSize:"40px"}}/>
                                           </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                        <div className="face">
                                        <FontAwesomeIcon icon={faInstagram} className="icon" style={{color:'pink', fontSize:"40px"}}/>
                                           </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
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
                                <img className="img-fluid" src="https://i.ibb.co/CKNmhMX/blog1.jpg" alt=""/>
                                <div className="media-body d-flex align-self-center">
                                    <div className="content">
                                        <a href="#">
                                            <p>
                                                    Did son unreserved themselves indulgence its
                                            </p>
                                        </a>
                                        <span>
                                            Dec 20, 2023
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="media">
                                <img className="img-fluid" src="https://i.ibb.co/m5yGbdR/blog2.jpg" alt=""/>
                                <div className ="media-body d-flex align-self-center">
                                    <div className="content">
                                        <a href="#">
                                            <p>
                                                    Rapturous am eagerness it as resolving household
                                            </p>
                                        </a>
                                        <span>
                                        Dec 10, 2023
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
                                    <Link href="/"> Home</Link>
                                </li>
                                <li>
                                <Link href="/about"> About</Link>
                                </li>
                                <li>
                                <Link href="/login"> Register</Link>
                                </li>
                                <li>
                                <Link href="/career"> Events</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="fourth">
                        <div className="widget2">
                            <h5>
                                Address
                            </h5>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, sunt? Placeat mollitia harum maxime cupiditate nostrum voluptatum perspiciatis molestiae, quisquam magni esse, similique quasi soluta facere! Itaque quas libero corporis.</p>
                        </div>
                    </div>
                </div>
            <div className="copyRightArea">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>&copy; Copyright All rights reserved 2023.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  </>
    )
}