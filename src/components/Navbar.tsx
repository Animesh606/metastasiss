'use client'
import React from "react";
import "./Navbar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react"
import Image from "next/image"
export const Navbar=()=>{
    const [hover,setHover]=useState(false);
    console.log(hover);
    return(
        <>
        <div className="heade">
             <div className="logo">
            <div className="img">
             <Image className="Image" src="/Metastasis.png" alt={""} width={100} height={100}></Image>
             </div>
             </div>
             <div className="links">
              <ul className={` ${hover ? 'navactive' : 'nav'}`}>
                <li><a href="/home">Home</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login" className="loggins">Login</a></li>
    
              </ul>
            </div>
            <div className=" mobile"  onClick={()=>{setHover(!hover)}}> <FontAwesomeIcon icon={faBars} className="icons"/></div>
        </div>
 
        </>
    )
}